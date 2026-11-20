<script setup>
import { ref, reactive, computed, watch, nextTick, onMounted, onUpdated, onBeforeUnmount } from 'vue'
import {
  layoutGraph, subLayout, levelCounts, levelAtZoom, zoomForLevel, rankItems, placeOnScreen, slots, labelSize, boxAt,
  edgePath, ghostPath, kicker, labelVenue, TITLE_LINE, YEAR_LINE,
} from './graph.mjs'
import { restPoints, fanPoints } from './orbits.mjs'
import { markFor } from './types.mjs'
import { frameCamera } from './camera.mjs'

/* The graph fills the space it is given — never more than the window — and
   you move around it like a map: scroll or pinch to zoom, drag to pan.
   Type stays one size at every zoom; labels that would collide are left out
   until zooming in makes room for them. Zoom is also the detail control:
   zoomed out shows the main works, the fitted view adds the talks and
   posters that presented them, zoomed in shows everything. Everything is
   laid out once, so zooming reveals and hides and never reshuffles.
   See DESIGN.md, "Zoom". */

const props = defineProps({
  /* What to lay out: the whole (filtered) collection of works. How much of
     it is on show follows the zoom. */
  items: { type: Array, required: true },
  selectedId: { type: String, default: null },
  /* Similarity edges from <collection>.similarity.json; null → shared tags. */
  pairs: { type: Array, default: null },
  /* parent id → the talks and posters that orbit it (orbits.mjs). They are
     drawn round the parent's dot, never laid out on their own. */
  satellites: { type: Map, default: () => new Map() },
  /* An item being previewed from search: shown like a hover. */
  peekId: { type: String, default: null },
})

const emit = defineEmits(['select', 'hover', 'links'])

const stage = ref(null)
const size = reactive({ w: 0, h: 0 })
const hoveredId = ref(null)
/* The node that has keyboard focus, if any: kept on show like a hover. */
const focusedId = ref(null)
const generation = ref(0)
/* The whole collection, laid out once; `layout` is the part on show. */
const full = ref({ nodes: [], edges: [], adjacency: new Map(), width: 1200, height: 700, centre: { x: 600, y: 350 } })

/* ── layout ───────────────────────────────────────────────────────────── */

/* The layout is shaped to the stage, but only re-run when that shape changes
   by a visible amount — not on every pixel of a window drag. */
const aspect = computed(() => {
  if (!size.w || !size.h) return null
  return Math.min(2.5, Math.max(1, Math.round((size.w / size.h) * 4) / 4))
})

/* The pin the last layout already framed, so its own watcher doesn't fly in. */
let framedWithLayout = null

watch(() => [props.items, props.pairs, aspect.value], ([items, pairs, a]) => {
  if (!a) return
  full.value = layoutGraph(items, pairs, { aspect: a })
  generation.value += 1
  setHover(null)
  fitView(false)
  /* A pin that arrives with the drawing (a link, a search) opens framed,
     without a fly-in. */
  if (props.selectedId) { frameItem(props.selectedId, { animate: false }); framedWithLayout = props.selectedId }
  nextTick(measureControls)
}, { immediate: true })

/* Most important first: the order zooming in reveals things, and labels them. */
const fullRank = computed(() => rankItems(props.items, props.pairs))
const counts = computed(() => levelCounts(props.items.length))

/* ── camera ───────────────────────────────────────────────────────────── */

/* screen = world × k + (x, y) */
const cam = reactive({ k: 1, x: 0, y: 0 })
const MARGIN = 28
const CONTROLS = 20   // room kept clear along the bottom edge for the control strip
let fitK = 1
/* fitK as the page sees it, so the detail step can follow the zoom. */
const fitScale = ref(1)

const minK = () => fitK * 0.6
const maxK = () => Math.max(1.6, fitK * 3)

function fitted() {
  const { width: W, height: H } = full.value
  const k = Math.min((size.w - MARGIN * 2) / W, (size.h - MARGIN * 2 - CONTROLS) / H, 1.25)
  return { k, x: (size.w - W * k) / 2, y: (size.h - CONTROLS - H * k) / 2 }
}

/* Never lose the drawing: some of it always stays in view. */
function clampPan(c) {
  const { width: W, height: H } = full.value
  const keepX = Math.min(size.w * 0.3, W * c.k), keepY = Math.min(size.h * 0.3, H * c.k)
  c.x = Math.min(size.w - keepX, Math.max(keepX - W * c.k, c.x))
  c.y = Math.min(size.h - keepY, Math.max(keepY - H * c.k, c.y))
  return c
}

const reduceMotion = typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
let tween = 0
function moveTo(target, animate = true) {
  cancelAnimationFrame(tween)
  if (!animate || reduceMotion) { Object.assign(cam, target); return }
  const from = { ...cam }
  const t0 = performance.now()
  const step = now => {
    const u = Math.min(1, (now - t0) / 260)
    const e = 1 - (1 - u) ** 3
    cam.k = from.k + (target.k - from.k) * e
    cam.x = from.x + (target.x - from.x) * e
    cam.y = from.y + (target.y - from.y) * e
    if (u < 1) tween = requestAnimationFrame(step)
  }
  tween = requestAnimationFrame(step)
}

function fitView(animate = true) {
  if (!size.w) return
  const f = fitted()
  fitK = f.k
  fitScale.value = f.k
  moveTo(f, animate)
}

function zoomAt(px, py, factor, animate = false) {
  const k = Math.min(maxK(), Math.max(minK(), cam.k * factor))
  const r = k / cam.k
  moveTo(clampPan({ k, x: px - (px - cam.x) * r, y: py - (py - cam.y) * r }), animate)
}
const zoomBy = factor => zoomAt(size.w / 2, (size.h - CONTROLS) / 2, factor, true)

/* ── what is on show ──────────────────────────────────────────────────── */

const level = computed(() => levelAtZoom(cam.k / fitScale.value, counts.value.length))
/* The top of the ranking for this zoom, plus whatever is pinned, previewed,
   hovered or focused, and everything the pin links to: those stay on show
   however far you zoom out. Zooming out from under the pointer or the
   keyboard focus would otherwise remove the node with no mouseleave or
   blur, leaving the graph dimmed round nothing and focus on <body>. */
const visibleIds = computed(previous => {
  const ids = new Set(fullRank.value.slice(0, counts.value[level.value]))
  for (const id of [props.selectedId, props.peekId, hoveredId.value, focusedId.value]) {
    if (!id) continue
    const f = parentOfAll.value.get(id) || id
    if (!full.value.adjacency.has(f)) continue
    ids.add(f)
    if (id === props.selectedId) for (const n of full.value.adjacency.get(f)) ids.add(n)
  }
  /* Hovering what is already on show changes nothing: hand back the same
     set, so the layout isn't rebuilt on every mouseenter. */
  if (previous && previous.size === ids.size && [...ids].every(id => previous.has(id))) return previous
  return ids
})
const layout = computed(() =>
  subLayout(full.value, props.items.filter(i => visibleIds.value.has(i.id)), props.pairs))
const rank = computed(() => fullRank.value.filter(id => visibleIds.value.has(id)))
/* The lines actually drawn, and why: the page says "linked by …" only for
   these, not for every candidate pair in the similarity file. */
watch(() => layout.value.edges, edges => {
  emit('links', edges.map(e => ({ source: e.source.id, target: e.target.id, reasons: e.reasons || [] })))
}, { immediate: true })

/* The step dots between − and +: each zooms to the view that shows it. */
function showLevel(lv) {
  if (lv === level.value) return
  if (counts.value.length === 3 && lv === 1) { fitView(); return }
  const target = zoomForLevel(lv, counts.value.length) * fitScale.value
  zoomBy(target / cam.k)
}
const LEVEL_WORDS = ['the main pieces of work', 'with the talks and posters that presented them', 'everything']
const levelTitle = i => (i === counts.value.length - 1
  ? `Zoom in to show all ${counts.value[i]}`
  : `${i < level.value ? 'Zoom out' : 'Zoom'} to show ${counts.value[i]}, ${LEVEL_WORDS[i]}`)

/* Pinning zooms just enough to frame the item and its neighbours — or not
   at all, if they are already in view at about the right zoom. A satellite
   frames its paper's neighbourhood. Unpinning never moves the camera. */
function frameItem(id, { animate = true } = {}) {
  if (!size.w || !id) return
  const f = famId(id)
  const byId = new Map(layout.value.nodes.map(n => [n.id, n]))
  const n = byId.get(f)
  if (!n) return
  const members = [n, ...[...(layout.value.adjacency.get(f) || [])].map(x => byId.get(x)).filter(Boolean)]
  const box = {
    x0: Math.min(...members.map(m => m.x)), y0: Math.min(...members.map(m => m.y)),
    x1: Math.max(...members.map(m => m.x)), y1: Math.max(...members.map(m => m.y)),
  }
  const target = frameCamera({ box, cam: { ...cam }, size: { w: size.w, h: size.h }, fitK, maxK: maxK(), controls: CONTROLS })
  if (target) moveTo(clampPan(target), animate)
}
watch(() => props.selectedId, id => {
  const already = framedWithLayout === id
  framedWithLayout = null
  if (id && !already) frameItem(id)
}, { flush: 'post' })

const canZoomIn = computed(() => cam.k < maxK() - 1e-3)
const canZoomOut = computed(() => cam.k > minK() + 1e-3)

/* Scroll or pinch zooms about the pointer. A pinch arrives as a wheel event
   with ctrlKey and small deltas; a mouse wheel in lines. */
function onWheel(e) {
  e.preventDefault()
  const rect = stage.value.getBoundingClientRect()
  const rate = e.ctrlKey ? 0.01 : e.deltaMode === 1 ? 0.05 : 0.0015
  zoomAt(e.clientX - rect.left, e.clientY - rect.top, Math.exp(-e.deltaY * rate))
}

/* Drag anywhere to pan. A press only becomes a drag once it has moved, so a
   click on a node is still a click; the click that ends a drag is swallowed. */
let press = null
let swallowClick = false
const dragging = ref(false)
function onPointerDown(e) {
  if (e.button !== 0 || e.target.closest('.controls')) return
  press = { id: e.pointerId, sx: e.clientX, sy: e.clientY, x: cam.x, y: cam.y, dragging: false }
}
function onPointerMove(e) {
  if (!press || e.pointerId !== press.id) return
  const dx = e.clientX - press.sx, dy = e.clientY - press.sy
  if (!press.dragging && Math.hypot(dx, dy) < 4) return
  if (!press.dragging) {
    press.dragging = true
    dragging.value = true
    cancelAnimationFrame(tween)
    stage.value.setPointerCapture(e.pointerId)
  }
  Object.assign(cam, clampPan({ k: cam.k, x: press.x + dx, y: press.y + dy }))
}
function onPointerUp() {
  if (press?.dragging) {
    swallowClick = true
    setTimeout(() => { swallowClick = false }, 0)
  }
  press = null
  dragging.value = false
}

function onDblClick(e) {
  if (!e.target.classList.contains('backdrop')) return
  const rect = stage.value.getBoundingClientRect()
  zoomAt(e.clientX - rect.left, e.clientY - rect.top, e.shiftKey ? 1 / 1.8 : 1.8, true)
}

function onKey(e) {
  if (e.metaKey || e.ctrlKey || e.altKey) return
  const pan = { ArrowLeft: [60, 0], ArrowRight: [-60, 0], ArrowUp: [0, 60], ArrowDown: [0, -60] }[e.key]
  if (e.key === '+' || e.key === '=') zoomBy(1.4)
  else if (e.key === '-' || e.key === '_') zoomBy(1 / 1.4)
  else if (e.key === '0') fitView()
  else if (pan && e.target === stage.value) moveTo(clampPan({ k: cam.k, x: cam.x + pan[0], y: cam.y + pan[1] }))
  else return
  e.preventDefault()
}

/* ── projection ───────────────────────────────────────────────────────── */

const toScreen = n => ({ x: n.x * cam.k + cam.x, y: n.y * cam.k + cam.y })

const points = computed(() => new Map(layout.value.nodes.map(n => {
  const p = toScreen(n)
  return [n.id, { id: n.id, x: p.x, y: p.y, r: n.r }]
})))

/* A satellite stands for its parent in focus and framing. */
const parentOf = computed(() => {
  const m = new Map()
  for (const [parent, list] of props.satellites) for (const i of list) m.set(i.id, parent)
  return m
})
const famId = id => parentOf.value.get(id) || id
/* The same, before visibility: a pinned talk keeps its paper on show. */
const parentOfAll = parentOf

/* The families whose copies are fanned out and labelled: the pinned one,
   and the one hovered or previewed, so pointing at something else never
   takes the pinned paper's labels away. A family folds back a moment after
   it stops being wanted, so the pointer can travel from the paper's dot to
   a copy without the copy running away. */
const wantedFamilies = computed(() => {
  const out = []
  for (const id of [hoveredId.value || peek.value, props.selectedId]) {
    const f = id ? famId(id) : null
    if (f && !out.includes(f) && props.satellites.get(f)?.length && points.value.has(f)) out.push(f)
  }
  return out.join(' ')   // a string, so an unchanged set triggers nothing
})
const satFamilies = ref(new Set())
let foldTimer = 0

/* A showing is a paler copy of its paper's dot (orbits.mjs): half behind it
   at rest, fanned out beside it when its family is focused. Copies keep a
   constant screen size and distance, so they are placed after projection.
   dx/dy are offsets from the paper's dot; x/y where the copy is now. */
const satPoints = computed(() => {
  const out = new Map()   // parent id → [{ id, item, x, y, dx, dy, r, colour, year, venue, kicker }]
  const nodeById = new Map(layout.value.nodes.map(n => [n.id, n]))
  for (const [parent, list] of props.satellites) {
    const p = points.value.get(parent)
    if (!p) continue
    const out0 = satFamilies.value.has(parent)
    const at = out0 ? fanPoints(p, list.length) : restPoints(p, list.map(i => i.id))
    out.set(parent, at.map((o, i) => ({
      id: list[i].id,
      item: list[i],
      x: o.x,
      y: o.y,
      dx: o.x - p.x,
      dy: o.y - p.y,
      r: p.r,
      colour: nodeById.get(parent)?.colour || markFor(list[i]).colour,
      year: list[i].year,
      venue: labelVenue(list[i]),
      kicker: kicker(list[i]),
    })))
  }
  return out
})
const satsOf = id => satPoints.value.get(id) || []

/* Edges are redrawn in screen space, so a stroke keeps its weight at every
   zoom and only its course scales. */
const screenEdges = computed(() => {
  const P = points.value
  const nodes = layout.value.nodes
  if (!nodes.length) return []
  const c = toScreen({
    x: nodes.reduce((a, n) => a + n.x, 0) / nodes.length,
    y: nodes.reduce((a, n) => a + n.y, 0) / nodes.length,
  })
  return layout.value.edges.map((e, i) => {
    const edge = { source: P.get(e.source.id), target: P.get(e.target.id), weight: e.weight }
    return {
      key: `${e.source.id}|${e.target.id}`,
      source: e.source.id,
      target: e.target.id,
      explicit: e.explicit,
      weak: e.weak,
      i,
      d: edgePath(edge, i, c),
      ghost: ghostPath(edge, c),
    }
  })
})

/* ── labels ───────────────────────────────────────────────────────────── */

/* Real widths from the real fonts, once they have loaded; until then the
   layout's estimates. */
const fontsReady = ref(0)
let ctx = null
function measured(n, lines) {
  const est = labelSize(n, lines)
  if (typeof document === 'undefined') return est
  ctx ||= document.createElement('canvas').getContext('2d')
  if (!ctx) return est
  const root = getComputedStyle(document.documentElement)
  const serif = root.getPropertyValue('--page-serif') || 'Georgia, serif'
  const sans = root.getPropertyValue('--page-sans') || 'sans-serif'
  ctx.font = `14.5px ${serif}`
  const titleW = Math.max(0, ...lines.map(l => ctx.measureText(l).width))
  let kickerW = 0
  if (n.kicker) {
    const year = String(n.year || '')
    const venue = n.venue ? `${year ? ' · ' : ''}${n.venue}` : ''
    ctx.font = `600 12px ${sans}`
    kickerW += ctx.measureText(year).width
    ctx.font = `400 12px ${sans}`
    kickerW += ctx.measureText(venue).width + (year + venue).length * 0.24
  }
  return { w: Math.ceil(Math.max(titleW, kickerW)) + 2, h: est.h }
}
const sizes = computed(() => {
  void fontsReady.value
  return new Map(layout.value.nodes.map(n => {
    const full = measured(n, n.lines)
    const same = n.short.join(' ') === n.lines.join(' ')
    return [n.id, { full, short: same ? full : measured(n, n.short) }]
  }))
})

/* Who gets a label first: the pinned item, then what it links to, strongest
   link first, then everything else by how much it anchors the collection.
   A focused work's satellites are labelled right after it. */
const labelOrder = computed(() => {
  const first = []
  const s = props.selectedId ? famId(props.selectedId) : null
  const family = id => (satFamilies.value.has(id) ? satsOf(id).map(x => x.id) : [])
  if (s && layout.value.adjacency.has(s)) {
    first.push(s, ...family(s))
    const linked = layout.value.edges
      .filter(e => e.source.id === s || e.target.id === s)
      .sort((a, b) => (b.score ?? b.weight) - (a.score ?? a.weight))
      .map(e => (e.source.id === s ? e.target.id : e.source.id))
    first.push(...linked)
  }
  for (const F of satFamilies.value) if (F !== s) first.push(F, ...family(F))
  const seen = new Set(first)
  return [...first, ...rank.value.filter(id => !seen.has(id))]
})

/* Finished works (tier 1) may set their label further off rather than go unnamed. */
const tierOne = computed(() => layout.value.nodes.filter(n => markFor(n).tier === 1).map(n => n.id))

const controlsBox = ref(null)
const satBox = x => ({ x0: x.x - x.r - 2, y0: x.y - x.r - 2, x1: x.x + x.r + 2, y1: x.y + x.r + 2 })
const placed = computed(() => {
  void fontsReady.value
  const S = sizes.value
  const pts = layout.value.nodes.map(n => ({ ...points.value.get(n.id), sizes: S.get(n.id), slot: n.slot }))
  /* Every satellite dot is something labels avoid; the fanned families'
     satellites take part as points, labelled with their kickers. */
  const famSats = [...satFamilies.value].flatMap(satsOf)
  for (const x of famSats) {
    const z = measured({ kicker: x.kicker, year: x.year, venue: x.venue }, [])
    pts.push({ id: x.id, x: x.x, y: x.y, r: x.r, sizes: { full: z, short: z }, slot: 0 })
  }
  const others = [...satPoints.value].filter(([parent]) => !satFamilies.value.has(parent)).flatMap(([, list]) => list)
  const avoid = [...others.map(satBox), ...(controlsBox.value ? [controlsBox.value] : [])]
  const s = props.selectedId ? famId(props.selectedId) : null
  return placeOnScreen(pts, labelOrder.value, { x0: 6, y0: 6, x1: size.w - 6, y1: size.h - 6 },
    { avoid, always: s ? [s] : [], reach: tierOne.value, protect: famSats.map(x => x.id) })
})

/* A hovered item whose label is left out or cut short shows it whole, on top. */
function forcedLabel(id, slot) {
  const p = points.value.get(id)
  const size = sizes.value.get(id)?.full
  if (!p || !size) return null
  /* A label standing off on a leader line has no slot (-1); show the whole
     title in the node's first slot instead. */
  const options = slots({ ...p }, size, true)
  const o = options.find(x => x.slot === slot) ?? options[0]
  return { lx: o.lx, ly: o.ly, anchor: o.anchor, box: boxAt(o.lx, o.ly, o.anchor, size), full: true }
}

const labels = computed(() => {
  const out = []
  const nodeById = new Map(layout.value.nodes.map(n => [n.id, n]))
  const h = hoveredId.value || (peek.value && famId(peek.value))
  for (const [id, at] of placed.value) {
    if (parentOf.value.has(id)) continue
    if (id === h && !at.full) continue
    out.push({ node: nodeById.get(id), ...at, forced: false })
  }
  if (h && !(placed.value.get(h)?.full)) {
    const at = forcedLabel(h, placed.value.get(h)?.slot ?? nodeById.get(h)?.slot)
    if (at) out.push({ node: nodeById.get(h), ...at, forced: true })
  }
  return out
})
const labelFor = computed(() => new Map(labels.value.map(l => [l.node.id, l])))
/* The fanned families' satellites, each labelled with its kicker only: the
   title is already on the paper's label. */
const satLabels = computed(() => [...satFamilies.value].flatMap(satsOf)
  .filter(x => placed.value.has(x.id)).map(x => ({ sat: x, ...placed.value.get(x.id) })))

/* ── focus ────────────────────────────────────────────────────────────── */

function setHover(id) {
  hoveredId.value = id
  emit('hover', id)
}

/* A search preview counts only if the item is drawn; a hidden one would
   dim everything and light nothing. */
const peek = computed(() => {
  const id = props.peekId
  return id && layout.value.adjacency.has(famId(id)) ? id : null
})
const focusId = computed(() => hoveredId.value || peek.value || props.selectedId)
/* Registered here, once focusId exists: it reads it straight away. */
watch(wantedFamilies, key => {
  clearTimeout(foldTimer)
  const want = key ? key.split(' ') : []
  const now = satFamilies.value
  /* Fan out at once; fold back after a moment. */
  if (want.some(f => !now.has(f))) satFamilies.value = new Set([...now, ...want])
  if ([...satFamilies.value].some(f => !want.includes(f))) {
    foldTimer = setTimeout(() => {
      const still = wantedFamilies.value ? wantedFamilies.value.split(' ') : []
      satFamilies.value = new Set([...satFamilies.value].filter(f => still.includes(f)))
    }, 320)
  }
}, { immediate: true })

/* Focus on a satellite is focus on its parent's family. */
function isNear(id) {
  if (!focusId.value) return true
  const f = famId(focusId.value)
  const g = famId(id)
  return g === f || layout.value.adjacency.get(f)?.has(g)
}

function edgeState(edge) {
  const f = focusId.value && famId(focusId.value)
  const rest = edge.explicit ? 'explicit' : edge.weak ? 'weak' : 'rest'
  if (!f) return rest
  return edge.source === f || edge.target === f ? 'lit' : 'far'
}

function pick(id) {
  if (swallowClick) return
  emit('select', props.selectedId === id ? null : id)
}

function clearPick() {
  if (swallowClick) return
  emit('select', null)
}

/* Tabbing to an item off screen brings it into view. */
function onNodeFocus(id) {
  focusedId.value = id
  setHover(id)
  const p = points.value.get(famId(id))
  if (!p) return
  if (p.x < 60 || p.x > size.w - 60 || p.y < 60 || p.y > size.h - CONTROLS - 60) {
    moveTo(clampPan({ k: cam.k, x: cam.x + size.w / 2 - p.x, y: cam.y + (size.h - CONTROLS) / 2 - p.y }))
  }
}

function onNodeBlur() {
  focusedId.value = null
  setHover(null)
}

/* Whatever still removes a node from under the pointer or the focus (a new
   layout, a satellite folding away) must not leave things stuck: a hover on
   something no longer drawn is dropped, and focus lost with its node goes to
   the graph itself, where + − 0 and the arrows still work. */
const drawnIds = computed(() => {
  const ids = new Set(layout.value.nodes.map(n => n.id))
  for (const list of satPoints.value.values()) for (const x of list) ids.add(x.id)
  return ids
})
watch(drawnIds, ids => {
  if (hoveredId.value && !ids.has(hoveredId.value)) setHover(null)
  if (focusedId.value && !ids.has(focusedId.value)) focusedId.value = null
})
/* The element inside the graph that last took focus. A node removed while
   focused (a new layout re-renders them all) takes focus with it to
   <body>: Chrome fires a blur as it goes, other browsers may not. Either
   way, once any focus move in progress has landed (Tab can remove the node
   it leaves), look: if that element is gone and nothing else has focus,
   focus the graph. A node that is still there lost focus on purpose. */
let focusedEl = null
let rescueTimer = 0
function checkFocus() {
  clearTimeout(rescueTimer)
  rescueTimer = setTimeout(() => {
    if (!focusedEl) return
    const el = document.activeElement
    if (focusedEl.isConnected) {
      if (el !== focusedEl) focusedEl = null
      return
    }
    focusedEl = null
    if (stage.value && (!el || el === document.body)) stage.value.focus({ preventScroll: true })
  }, 0)
}
function onFocusIn(e) { focusedEl = e.target === stage.value ? null : e.target }
function onFocusOut(e) { if (!stage.value?.contains(e.relatedTarget)) checkFocus() }
onUpdated(() => { if (focusedEl) checkFocus() })

/* The first title line drops below the kicker when there is one. */
function lineDy(node, i) {
  if (i > 0) return TITLE_LINE
  return node.kicker ? YEAR_LINE : 0
}

/* A faint ruled ground that moves with the drawing. */
const grid = computed(() => {
  let step = 100 * cam.k
  while (step < 36) step *= 2
  const xs = [], ys = []
  for (let x = ((cam.x % step) + step) % step; x < size.w; x += step) xs.push(x)
  for (let y = ((cam.y % step) + step) % step; y < size.h; y += step) ys.push(y)
  return { xs, ys }
})

/* ── wiring ───────────────────────────────────────────────────────────── */

/* Where the control strip sits, so labels keep out from under it. */
const controls = ref(null)
function measureControls() {
  if (!controls.value || !stage.value) return
  const s = stage.value.getBoundingClientRect()
  const c = controls.value.getBoundingClientRect()
  controlsBox.value = { x0: c.left - s.left - 6, y0: c.top - s.top - 4, x1: c.right - s.left, y1: c.bottom - s.top }
}

let ro = null
onMounted(() => {
  ro = new ResizeObserver(([entry]) => {
    const { width, height } = entry.contentRect
    const changed = Math.abs(width - size.w) > 1 || Math.abs(height - size.h) > 1
    size.w = width
    size.h = height
    if (changed) {
      fitView(false)
      /* A pinned item stays framed as the window changes. */
      if (props.selectedId) frameItem(props.selectedId, { animate: false })
      measureControls()
    }
  })
  ro.observe(stage.value)
  measureControls()
  stage.value.addEventListener('wheel', onWheel, { passive: false })
  document.fonts?.ready.then(() => { fontsReady.value += 1 })
})
onBeforeUnmount(() => {
  ro?.disconnect()
  stage.value?.removeEventListener('wheel', onWheel)
  cancelAnimationFrame(tween)
  clearTimeout(foldTimer)
  clearTimeout(rescueTimer)
})

defineExpose({ fitView })
</script>

<template>
  <div
    ref="stage"
    class="stage"
    :class="{ dragging }"
    tabindex="0"
    aria-label="Graph of the collection. Scroll or pinch to zoom, drag to move, 0 to fit."
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @dblclick="onDblClick"
    @keydown="onKey"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
  >
    <svg v-if="size.w" :width="size.w" :height="size.h" :viewBox="`0 0 ${size.w} ${size.h}`" role="group"
         aria-label="Each point is one item; lines join the most similar.">

      <!-- empty ground clears the pin — the way out of a focused view. -->
      <rect class="backdrop" x="0" y="0" :width="size.w" :height="size.h" fill="transparent" @click="clearPick" />

      <g class="rule" aria-hidden="true">
        <line v-for="x in grid.xs" :key="`v${x}`" :x1="x" y1="0" :x2="x" :y2="size.h" />
        <line v-for="y in grid.ys" :key="`h${y}`" x1="0" :y1="y" :x2="size.w" :y2="y" />
      </g>

      <g :key="`e${generation}`" class="edges" aria-hidden="true">
        <template v-for="edge in screenEdges" :key="`g-${edge.key}`">
          <path
            v-if="edge.ghost"
            class="ghost"
            :class="edgeState(edge)"
            :style="{ animationDelay: `${(edge.i % 7) * 70 + 200}ms` }"
            :d="edge.ghost"
          />
        </template>
        <path
          v-for="edge in screenEdges"
          :key="edge.key"
          class="edge"
          :class="edgeState(edge)"
          :style="{ animationDelay: `${(edge.i % 7) * 70}ms` }"
          :d="edge.d"
        />
      </g>

      <g :key="`n${generation}`" class="nodes">
        <template v-for="node in layout.nodes" :key="node.id">
        <g
          class="node"
          :class="{ dim: !isNear(node.id), on: node.id === selectedId }"
          role="button"
          tabindex="0"
          :aria-label="`${node.title}${node.year ? `, ${node.year}` : ''}${node.venue ? `, ${node.venue}` : ''}`"
          :aria-pressed="node.id === selectedId"
          @click="pick(node.id)"
          @keydown.enter.prevent="pick(node.id)"
          @keydown.space.prevent="pick(node.id)"
          @mouseenter="setHover(node.id)"
          @mouseleave="setHover(null)"
          @focus="onNodeFocus(node.id)"
          @blur="onNodeBlur"
        >
          <circle class="hit" :cx="points.get(node.id).x" :cy="points.get(node.id).y" :r="node.r + 12" />
          <rect
            v-if="labelFor.get(node.id)"
            class="hit"
            :x="labelFor.get(node.id).box.x0 - 4" :y="labelFor.get(node.id).box.y0 - 3"
            :width="labelFor.get(node.id).box.x1 - labelFor.get(node.id).box.x0 + 8"
            :height="labelFor.get(node.id).box.y1 - labelFor.get(node.id).box.y0 + 6"
          />
          <!-- Its showings: paler copies, behind the dot at rest, fanned out
               beside it on focus. Only the offset moves, so they glide out
               without trailing the camera. -->
          <g
            v-if="satsOf(node.id).length"
            class="copies"
            :style="{ transform: `translate(${points.get(node.id).x}px, ${points.get(node.id).y}px)` }"
            aria-hidden="true"
          >
            <g
              v-for="(sat, i) in satsOf(node.id)"
              :key="sat.id"
              class="copy"
              :class="{ out: satFamilies.has(node.id), on: sat.id === selectedId }"
              :style="{ transform: `translate(${sat.dx}px, ${sat.dy}px)`, '--depth': i }"
            >
              <circle :r="sat.r" :style="{ fill: sat.colour }" />
            </g>
          </g>
          <circle class="halo" :cx="points.get(node.id).x" :cy="points.get(node.id).y" :r="node.r + 4" />
          <circle
            class="dot"
            :class="{ ring: node.ring, own: node.realm === 'own' }"
            :style="{ '--dot': node.colour }"
            :cx="points.get(node.id).x" :cy="points.get(node.id).y" :r="node.r"
          />
        </g>
        <!-- A work's satellites follow it, in the drawing and in tab order. -->
        <g
          v-for="sat in satsOf(node.id)"
          :key="sat.id"
          class="node sat"
          :class="{ dim: !isNear(sat.id), on: sat.id === selectedId, live: satFamilies.has(node.id) }"
          role="button"
          tabindex="0"
          :aria-label="`${sat.item.title}${sat.year ? `, ${sat.year}` : ''}${sat.venue ? `, ${sat.venue}` : ''}`"
          :aria-pressed="sat.id === selectedId"
          @click="pick(sat.id)"
          @keydown.enter.prevent="pick(sat.id)"
          @keydown.space.prevent="pick(sat.id)"
          @mouseenter="setHover(sat.id)"
          @mouseleave="setHover(null)"
          @focus="onNodeFocus(sat.id)"
          @blur="onNodeBlur"
        >
          <!-- The copy itself is drawn behind the paper; this is its target. -->
          <circle class="hit" :cx="sat.x" :cy="sat.y" :r="sat.r + 1.5" />
          <circle class="halo" :cx="sat.x" :cy="sat.y" :r="sat.r + 4" />
        </g>
        </template>
      </g>


      <!-- Labels sit above every dot and stroke; a hovered one above them all. -->
      <g :key="`l${generation}`" class="labels" aria-hidden="true">
        <template v-for="l in labels" :key="`lead-${l.node.id}`">
          <line
            v-if="l.leader"
            class="leader"
            :class="{ dim: !isNear(l.node.id), on: l.node.id === selectedId }"
            :x1="l.leader.x1" :y1="l.leader.y1" :x2="l.leader.x2" :y2="l.leader.y2"
          />
        </template>
        <text
          v-for="l in labels"
          :key="l.node.id + (l.forced ? '-forced' : '')"
          class="label"
          :class="{ dim: !isNear(l.node.id), on: l.node.id === selectedId, forced: l.forced || l.crowded, hot: l.node.id === hoveredId }"
          :x="l.lx" :y="l.ly" :text-anchor="l.anchor"
        >
          <tspan v-if="l.node.kicker" class="kicker" :x="l.lx"><tspan
            v-if="l.node.year" class="year">{{ l.node.year }}</tspan><tspan
            v-if="l.node.venue" class="venue">{{ l.node.year ? ' · ' : '' }}{{ l.node.venue }}</tspan></tspan>
          <tspan
            v-for="(line, i) in (l.full ? l.node.lines : l.node.short)"
            :key="i"
            class="title"
            :x="l.lx"
            :dy="lineDy(l.node, i)"
          >{{ line }}</tspan>
        </text>
        <text
          v-for="l in satLabels"
          :key="`sat-${l.sat.id}`"
          class="label sat-label"
          :class="{ dim: !isNear(l.sat.id), on: l.sat.id === selectedId, hot: l.sat.id === hoveredId }"
          :x="l.lx" :y="l.ly" :text-anchor="l.anchor"
        ><tspan class="kicker"><tspan
          v-if="l.sat.year" class="year">{{ l.sat.year }}</tspan><tspan
          v-if="l.sat.venue" class="venue">{{ l.sat.year ? ' · ' : '' }}{{ l.sat.venue }}</tspan></tspan></text>
      </g>
    </svg>

    <div ref="controls" class="controls" @dblclick.stop>
      <slot name="controls" />
      <span class="zoom" role="group" aria-label="Zoom and detail">
        <button type="button" :disabled="!canZoomOut" aria-label="Zoom out" title="Zoom out (−)" @click="zoomBy(1 / 1.4)">−</button>
        <span v-if="counts.length > 1" class="steps">
          <button
            v-for="(n, i) in counts"
            :key="i"
            type="button"
            class="step"
            :class="{ on: i <= level }"
            :aria-pressed="i === level"
            :aria-label="levelTitle(i)"
            :title="levelTitle(i)"
            @click="showLevel(i)"
          ><i /></button>
        </span>
        <button type="button" :disabled="!canZoomIn" aria-label="Zoom in" title="Zoom in (+)" @click="zoomBy(1.4)">+</button>
        <button type="button" class="fit" aria-label="Fit to window" title="Fit to window (0)" @click="fitView()">fit</button>
      </span>
    </div>

    <p v-if="!items.length" class="empty">nothing here yet</p>
  </div>
</template>

<style scoped>
.stage {
  position: relative;
  height: 100%;
  min-width: 0;
  overflow: hidden;
  cursor: grab;
  touch-action: none;
  user-select: none;
}
.stage.dragging { cursor: grabbing; }
.stage:focus { outline: none; }
.stage:focus-visible { box-shadow: inset 0 0 0 1px var(--cool-hairline); }
.stage svg { display: block; }

.rule line { stroke: var(--page-ink); stroke-width: 0.5; opacity: 0.035; }

/* Edges are filled slivers — brushstrokes that taper into each node. */
.edge {
  fill: var(--page-ink);
  stroke: none;
  opacity: 0.2;
  transition: opacity 0.2s, fill 0.2s;
}
/* An explicit `connects` is a little darker at rest; colour is kept for touch. */
.edge.explicit { opacity: 0.34; }
/* A weak pair only stands in where an item has nothing stronger on show. */
.edge.weak { opacity: 0.1; }
.edge.lit { fill: var(--accent-blue); opacity: 0.8; }
.edge.far { opacity: 0.045; }

/* The hairline retrace some edges carry. */
.ghost {
  fill: none;
  stroke: var(--page-ink);
  stroke-width: 0.6;
  opacity: 0.13;
  transition: opacity 0.2s, stroke 0.2s;
}
.ghost.weak { opacity: 0.06; }
.ghost.lit { stroke: var(--accent-blue); opacity: 0.4; }
.ghost.far { opacity: 0.02; }

.node { cursor: pointer; transition: opacity 0.18s; }
.node.dim { opacity: 0.18; }
.node:focus { outline: none; }
.hit { fill: transparent; }

/* Colour is realm (own work in ink, loved things in their form's hue), size
   and fill are tier. A thin ink edge keeps pale hues reading as dots. */
.dot {
  fill: var(--dot);
  stroke: var(--page-ink);
  stroke-opacity: 0.35;
  stroke-width: 0.75;
}
/* A single appearance (a talk, poster or service of its own): a small solid
   dot, a shade lighter than a paper. No hollow rings (Sara, 2026-11-16). */
.dot.ring {
  fill-opacity: 0.5;
  stroke: none;
}

/* A talk or poster of a paper: a paler copy of the paper's dot. At rest the
   copies hide half behind it, each paler than the last; focused, they fan
   out beside it. Their targets only answer while they are out. */
.copy {
  opacity: calc(0.3 - var(--depth) * 0.1);
  transition: transform 0.28s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.2s;
}
.copy circle { stroke: none; }
.copy.out { opacity: 0.42; }
.copy.out.on { opacity: 0.75; }
.sat:not(.live) { pointer-events: none; }
.sat:not(.live) .halo { opacity: 0 !important; }
@media (prefers-reduced-motion: reduce) { .copy { transition: none; } }

/* Blue means what you touch: a halo round the pinned dot, ink for hover. */
.halo {
  pointer-events: none;
  fill: none;
  stroke: var(--page-ink);
  stroke-width: 2;
  opacity: 0;
  transition: opacity 0.16s, stroke 0.16s;
}
.node:hover .halo,
.node:focus-visible .halo { opacity: 0.5; }
.node.on .halo { stroke: var(--accent-blue); opacity: 1; }


.label {
  pointer-events: none;
  /* A halo in the ground colour keeps text legible where an edge passes behind. */
  paint-order: stroke fill;
  stroke: var(--page-bg);
  stroke-width: 5px;
  stroke-linejoin: round;
  transition: opacity 0.18s;
}
.label.dim { opacity: 0.18; }
/* The hairline from a dot to a label set a little way off. */
.leader { stroke: var(--page-ink); stroke-width: 0.75; opacity: 0.4; transition: opacity 0.18s; }
.leader.dim { opacity: 0.08; }
.leader.on { stroke: var(--accent-blue); opacity: 0.8; }
/* A label shown only because it is hovered gets a wider halo: it may sit over others. */
.label.forced { stroke-width: 9px; }
.label .kicker {
  font-family: var(--page-sans);
  font-size: 12px;
  letter-spacing: 0.02em;
  font-variant-numeric: tabular-nums;
}
.label .year { font-weight: 600; fill: var(--page-ink); }
.label .venue { font-weight: 400; fill: var(--page-dim); }
.label .title {
  font-family: var(--page-serif);
  font-size: 14.5px;
  fill: var(--page-ink);
  opacity: 0.86;
}
.label.hot .title,
.label.on .title { opacity: 1; }
.label.on .year { fill: var(--accent-blue); }

/* One quiet strip in the corner: find, then zoom with its detail steps. */
.controls {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 6px 0 4px 12px;
  background: var(--page-bg);
  font-family: var(--page-sans);
  font-size: 13px;
  cursor: default;
}
.zoom { display: inline-flex; align-items: center; gap: 2px; }
.zoom button {
  min-width: 24px;
  height: 24px;
  padding: 0 4px;
  background: none;
  border: none;
  font: inherit;
  font-size: 15px;
  line-height: 1;
  color: var(--page-dim);
  cursor: pointer;
  transition: color 0.15s;
}
.zoom button.fit { font-size: 13px; padding-left: 8px; }
/* How much is on show, filling left to right as you zoom in. */
.steps { display: inline-flex; align-items: center; }
.zoom button.step { min-width: 0; width: 11px; padding: 0; display: inline-flex; align-items: center; justify-content: center; }
.step i {
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--cool-hairline);
  transition: background 0.2s;
}
.step.on i { background: var(--page-dim); }
.step[aria-pressed="true"] i { background: var(--page-ink); }
.zoom button.step:hover i { background: var(--page-ink); }
.zoom button:hover:not(:disabled) { color: var(--page-ink); }
.zoom button:disabled { opacity: 0.35; cursor: default; }
.zoom button:focus-visible { outline: 1px solid var(--accent-blue); outline-offset: 1px; }

.empty {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  font-family: var(--page-sans);
  font-size: 14px;
  color: var(--page-dim);
  pointer-events: none;
}

/* The drawing arrives as a drawing being made — once, then still. A label
   that zooming makes room for fades in. */
@media (prefers-reduced-motion: no-preference) {
  .edges .edge, .edges .ghost { animation: settle 0.9s ease-out backwards; }
  .nodes { animation: settle 0.5s 0.2s ease-out backwards; }
  .labels .label { animation: settle 0.25s ease-out backwards; }
  @keyframes settle { from { opacity: 0; } }
}
</style>
