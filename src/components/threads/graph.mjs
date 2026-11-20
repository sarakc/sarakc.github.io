/* Layout maths for the /threads graph. Kept out of the component so it can be
   exercised directly — see scripts/check-graph.mjs. */
import { forceSimulation, forceLink, forceManyBody, forceCollide, forceX, forceY } from 'd3-force'
import { typeInfo, markFor } from './types.mjs'
import { splitWorks } from './orbits.mjs'

/* The layout is a "world" with no fixed size: as wide and tall as the
   settled drawing needs, shaped to the window it will be shown in (`aspect`).
   The page fits that world to the window and zooms; nothing scrolls. W and H
   are only the shape assumed when no window has been measured. */
export const W = 1200
export const H = 700
export const PAD = 48
const TICKS = 340

/* Label metrics, in viewBox units. A label is a block: a kicker line in the
   sans — the year, and the venue if there is one — then the full title
   wrapped in the serif. Widths are
   estimates — the SVG is never measured — so they err generous. */
export const TITLE_LINE = 19     // serif title line height (14.5px type, ~1.3)
export const YEAR_LINE = 18      // kicker baseline to first title baseline
const TITLE_CHAR_W = 7
const YEAR_CHAR_W = 7.8
const ASCENT = 12                // first baseline sits this far below the block top
const WRAP = 30                  // characters per title line
const MAX_LINES = 6
const GAP = 8

/* An edge for every pair sharing a tag, plus the explicit `connects` links. */
export function buildEdges(items) {
  const tagSets = items.map(i => new Set(i.tags || []))
  const edges = []
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const shared = [...tagSets[i]].filter(t => tagSets[j].has(t)).length
      const explicit =
        (items[i].connects || []).includes(items[j].id) ||
        (items[j].connects || []).includes(items[i].id)
      if (shared > 0 || explicit) {
        edges.push({
          source: items[i].id,
          target: items[j].id,
          weight: shared + (explicit ? 3 : 0),
          explicit,
        })
      }
    }
  }
  return edges
}

/* Edges from the similarity file for whichever items are on show. The file
   holds each item's strongest few candidates; here every visible item keeps
   its best `k` among the visible ones — the same graph the build would draw
   for the whole collection, and a sensible one for any part of it. An item
   with no strong pair keeps its best weak one. Score (0–1) becomes the weight
   the layout and the stroke swell read. */
export function similarityEdges(items, pairs, k = 3) {
  const ids = new Set(items.map(i => i.id))
  const live = pairs.filter(p => ids.has(p.source) && ids.has(p.target))
  const byNode = new Map([...ids].map(id => [id, []]))
  for (const p of live) { byNode.get(p.source).push(p); byNode.get(p.target).push(p) }
  const keep = new Set()
  for (const list of byNode.values()) {
    list.sort((a, b) => b.score - a.score || (a.source + a.target).localeCompare(b.source + b.target))
    const strong = list.filter(p => !p.weak).slice(0, k)
    for (const p of strong.length ? strong : list.slice(0, 1)) keep.add(p)
  }
  return live
    .filter(p => keep.has(p))
    .map(p => ({
      source: p.source,
      target: p.target,
      weight: 1 + p.score * 5,
      score: p.score,
      reasons: p.reasons,
      explicit: (p.reasons || []).some(r => r.signal === 'connects'),
      weak: Boolean(p.weak),
    }))
}

/* A venue long enough to dominate its label is cut; the detail line under
   the graph always gives it whole. */
const VENUE_MAX = 26
export function shortVenue(venue) {
  if (!venue || venue.length <= VENUE_MAX) return venue || ''
  let cut = venue.slice(0, VENUE_MAX)
  cut = cut.slice(0, Math.max(cut.lastIndexOf(' '), 12))
  /* Never end on a dangling "The", "of", "&"… */
  let prev
  do { prev = cut; cut = cut.replace(/[\s,&·@-]+$/, '').replace(/\s+(the|of|and|for|in|at|on)$/i, '') } while (cut !== prev)
  return cut + '…'
}

/* The kicker above a title: "2024 · WMT", "1962 · Anthony Burgess" when
   there's no venue, or just the year. An item's `venueShort` stands in for a
   venue too long to show whole ("OSU" for "Ph.D. dissertation, The Ohio State
   University"); the detail line keeps the full venue. */
export function labelVenue(item) {
  return item.venueShort || shortVenue(item.venue || item.creator)
}
export function kicker(item) {
  return [item.year, labelVenue(item)].filter(Boolean).join(' · ')
}

/* How much an item anchors the collection. Kind comes first — a piece of
   work outranks a showing of it, so a paper outranks the talk that presented
   it — then the strength of its links. Where every item is the same kind,
   links decide alone. The detail toggle shows the top of this list. Each
   type's weight is its `rank` in types.mjs. */
export function rankItems(items, pairs = null) {
  const edges = pairs ? similarityEdges(items, pairs) : buildEdges(items)
  const strength = new Map(items.map(i => [i.id, 0]))
  for (const e of edges) {
    const w = e.score !== undefined ? e.score : Math.min(e.weight, 5) / 5
    strength.set(e.source, strength.get(e.source) + w)
    strength.set(e.target, strength.get(e.target) + w)
  }
  /* Type rank first, links only within a rank: a step of 0.6 in rank (talk
     to service) outweighs the most a thread count can add. */
  const score = i => typeInfo(i.type).rank * 6 + Math.min(strength.get(i.id), 3)
  return [...items]
    .sort((a, b) => score(b) - score(a) || (b.year || 0) - (a.year || 0) || a.id.localeCompare(b.id))
    .map(i => i.id)
}

/* How many items each step of the detail toggle shows: a few, about two
   thirds, all. A small collection has one step. */
export function levelCounts(n) {
  if (n <= 12) return [n]
  const few = Math.max(8, Math.round(n * 0.35))
  const more = Math.max(few + 1, Math.round(n * 0.65))
  return [few, Math.min(more, n - 1), n]
}

/* The smallest detail step that shows an item — for a satellite, its
   paper, or the satellite itself when the paper isn't among `items` — or
   null if the item isn't among them. A link or a search raises the level
   this far and no further. `orbits` is findOrbits of the whole collection. */
export function levelFor(id, items, pairs, orbits) {
  if (!items.some(i => i.id === id)) return null
  const parent = orbits.get(id)
  const target = parent && items.some(i => i.id === parent) ? parent : id
  const { works } = splitWorks(items, orbits)
  const at = rankItems(works, pairs).indexOf(target)
  if (at < 0) return null
  return levelCounts(works.length).findIndex(n => at < n)
}

/* Every edge bows *outward*, away from the middle of the drawing. Bowing
   alternately left and right let edges cut straight through the centre of a
   tightly linked cluster, and a clique of five drew a pentagram. Bowing
   outward turns the same links into loose loops that wrap the cluster.

   Each edge also gets its own hand: how far it bows, where the brush presses
   hardest, whether its tail flicks past a node, whether it was gone over
   twice. All of it comes from a hash of the two ids, so a given pair always
   draws the same way, filtered or not. */
const LIFT = 0.17
const LIFT_RANGE = 0.13

/* FNV-1a folded to [0, 1), salted so one edge gets several independent draws. */
export function hash01(text) {
  let h = 0x811c9dc5
  for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0 }
  return h / 4294967296
}
const hand = (edge, salt) => hash01(`${edge.source.id}|${edge.target.id}|${salt}`)

function geometry(edge, centre) {
  const s = edge.source
  const t = edge.target
  const dx = t.x - s.x
  const dy = t.y - s.y
  const len = Math.hypot(dx, dy) || 1
  const nx = -dy / len
  const ny = dx / len
  const mx = (s.x + t.x) / 2
  const my = (s.y + t.y) / 2
  const side = nx * (mx - centre.x) + ny * (my - centre.y) >= 0 ? 1 : -1
  const lift = (LIFT + hand(edge, 'lift') * LIFT_RANGE) * len * side
  return { s, t, len, nx: nx * side, ny: ny * side, cx: mx + nx * lift, cy: my + ny * lift }
}

/* Points along an edge's curve, so label placement can steer clear of it. */
export function edgeSamples(edge, i, centre, steps = 16) {
  const { s, t, cx, cy } = geometry(edge, centre)
  const pts = []
  for (let k = 1; k < steps; k++) {
    const u = k / steps
    const a = (1 - u) * (1 - u), b = 2 * (1 - u) * u, c = u * u
    pts.push({ x: a * s.x + b * cx + c * t.x, y: a * s.y + b * cy + c * t.y })
  }
  return pts
}

/* How full the stroke gets. Grows with how much the two items share. */
export function edgeSwell(edge) {
  return Math.min(1.6 + edge.weight * 0.5, 3.8)
}

const f = n => n.toFixed(1)

/* An edge is drawn as a brushstroke: a filled sliver between two cubic
   curves that share their ends, so it tapers to a point at each node.
   The two sides press unevenly — one end heavier than the other, one edge
   of the stroke fuller than the other — which is what makes it read as a
   mark rather than a wire. About half the strokes flick a little past one
   of their nodes, the way a fast line overshoots. */
export function edgePath(edge, i, centre) {
  const { s, t, cx, cy, nx, ny } = geometry(edge, centre)
  // the bow as a cubic: control points two-thirds of the way to the quadratic's
  let c1x = s.x + (2 / 3) * (cx - s.x), c1y = s.y + (2 / 3) * (cy - s.y)
  let c2x = t.x + (2 / 3) * (cx - t.x), c2y = t.y + (2 / 3) * (cy - t.y)

  // overshoot: push one tip past its node along the curve's own tangent
  let sx = s.x, sy = s.y, tx = t.x, ty = t.y
  const flick = hand(edge, 'flick')
  if (flick > 0.45) {
    const atStart = flick > 0.72
    const [px, py, qx, qy] = atStart ? [s.x, s.y, c1x, c1y] : [t.x, t.y, c2x, c2y]
    const d = Math.hypot(qx - px, qy - py) || 1
    const by = (atStart ? s.r : t.r) + 5 + hand(edge, 'flick-len') * 12
    if (atStart) { sx = px - ((qx - px) / d) * by; sy = py - ((qy - py) / d) * by }
    else { tx = px - ((qx - px) / d) * by; ty = py - ((qy - py) / d) * by }
  }

  const w = edgeSwell(edge)
  const press1 = w * (0.35 + 1.9 * hand(edge, 'p1'))   // outer side, near the source
  const press2 = w * (0.35 + 1.9 * hand(edge, 'p2'))   // outer side, near the target
  const inner = w * (0.2 + 0.5 * hand(edge, 'p3'))     // the inner side stays lean
  return `M ${f(sx)} ${f(sy)} C ${f(c1x + nx * press1)} ${f(c1y + ny * press1)} ${f(c2x + nx * press2)} ${f(c2y + ny * press2)} ${f(tx)} ${f(ty)} ` +
    `C ${f(c2x - nx * inner)} ${f(c2y - ny * inner)} ${f(c1x - nx * inner)} ${f(c1y - ny * inner)} ${f(sx)} ${f(sy)} Z`
}

/* Some edges were gone over twice: a hairline retrace that bows a little
   wider than the stroke it follows. Returns null for the rest. */
export function ghostPath(edge, centre) {
  if (hand(edge, 'ghost') < 0.5) return null
  const { s, t, cx, cy, nx, ny, len } = geometry(edge, centre)
  const drift = len * (0.03 + 0.04 * hand(edge, 'ghost-drift'))
  return `M ${f(s.x)} ${f(s.y)} Q ${f(cx + nx * drift)} ${f(cy + ny * drift)} ${f(t.x)} ${f(t.y)}`
}

/* Break a title into lines of at most `width` characters, on spaces. The
   whole title is shown; only a pathological one is cut, and the cut is marked. */
export function wrapTitle(title, width = WRAP, maxLines = MAX_LINES) {
  const lines = []
  let line = ''
  for (const word of String(title).split(/\s+/).filter(Boolean)) {
    if (!line) line = word
    /* A subtitle starts its own line: "Analogy in Contact:" / "Modeling…" */
    else if (/[:—]$/.test(line) && line.length >= 12) { lines.push(line); line = word }
    else if ((line + ' ' + word).length <= width) line += ' ' + word
    else { lines.push(line); line = word }
  }
  if (line) lines.push(line)
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines)
    kept[maxLines - 1] = kept[maxLines - 1].replace(/[\s,:;.-]*$/, '') + '…'
    return kept
  }
  return lines
}

/* The short form of a title, for labels seen from a distance: the part
   before the colon when that names the work on its own ("Analogy in
   Contact"), and at most two lines either way. */
export function shortTitle(title) {
  const t = String(title || '').trim()
  const colon = t.indexOf(': ')
  const head = colon > 0 ? t.slice(0, colon) : ''
  if (head && head.split(/\s+/).length >= 2) return wrapTitle(head, WRAP, 2)
  return wrapTitle(t, WRAP, 2)
}

/* Width and height of a node's label block — of `lines` if given, else of
   its full title. */
export function labelSize(n, lines = n.lines) {
  const titleW = Math.max(0, ...lines.map(l => l.length)) * TITLE_CHAR_W
  const kickerW = (n.kicker || '').length * YEAR_CHAR_W
  return {
    w: Math.max(titleW, kickerW),
    h: (n.kicker ? YEAR_LINE : 0) + lines.length * TITLE_LINE,
  }
}

/* The box a label of `size` occupies at (lx, ly) — the first baseline. */
export function boxAt(lx, ly, anchor, { w, h }) {
  const x0 = anchor === 'start' ? lx : anchor === 'end' ? lx - w : lx - w / 2
  const y0 = ly - ASCENT
  return { x0, y0, x1: x0 + w, y1: y0 + h }
}

/* The box a placed label occupies. */
export function labelBox(n) {
  return boxAt(n.lx, n.ly, n.anchor, labelSize(n))
}

function boxesCross(a, b) {
  return a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1
}

function crossArea(a, b) {
  if (!boxesCross(a, b)) return 0
  return (Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0)) * (Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0))
}

/* Candidate slots around a node: beside it on either side — the first line
   level with the node — then above or below. Order is preference: right
   first because it reads naturally. On screen, where space is tighter, four
   more: the label rising from either side of the node, or hanging below it
   from its edge. */
export function slots(n, size = labelSize(n), corners = false) {
  const { h } = size
  const level = n.y + 4
  const out = [
    { slot: 0, lx: n.x + n.r + GAP, ly: level, anchor: 'start' },
    { slot: 1, lx: n.x - n.r - GAP, ly: level, anchor: 'end' },
    { slot: 2, lx: n.x, ly: n.y - n.r - GAP - h + ASCENT, anchor: 'middle' },
    { slot: 3, lx: n.x, ly: n.y + n.r + GAP + ASCENT, anchor: 'middle' },
  ]
  if (corners) {
    const rise = n.y + 6 - h + ASCENT
    const hang = n.y + n.r + GAP / 2 + ASCENT
    out.push(
      { slot: 4, lx: n.x + n.r + GAP, ly: rise, anchor: 'start' },
      { slot: 5, lx: n.x - n.r - GAP, ly: rise, anchor: 'end' },
      { slot: 6, lx: n.x - n.r, ly: hang, anchor: 'start' },
      { slot: 7, lx: n.x + n.r, ly: hang, anchor: 'end' },
    )
  }
  return out
}

/* Place labels one node at a time, most connected first, choosing the slot
   that overlaps least with every node and every label already placed, and
   that the fewest edges run through. Ties fall to the earlier slot, so a
   label only moves when it has to. */
const EDGE_COST = 60
export function placeLabels(nodes, edgePoints = [], w = Infinity, h = Infinity) {
  const nodeBoxes = nodes.map(n => ({ x0: n.x - n.r, y0: n.y - n.r, x1: n.x + n.r, y1: n.y + n.r }))
  const placed = []
  const order = [...nodes].sort((a, b) => b.degree - a.degree || a.id.localeCompare(b.id))
  for (const n of order) {
    let best = null
    let bestCost = Infinity
    for (const slot of slots(n)) {
      const box = labelBox({ ...n, ...slot })
      let cost = 0
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] !== n) cost += crossArea(box, nodeBoxes[i])
      }
      for (const other of placed) cost += crossArea(box, other)
      for (const p of edgePoints) {
        if (p.x > box.x0 && p.x < box.x1 && p.y > box.y0 && p.y < box.y1) cost += EDGE_COST
      }
      /* Off-canvas is worse than any overlap (only when there is a canvas). */
      if (Number.isFinite(w)) {
        const over = Math.max(0, -box.x0) + Math.max(0, box.x1 - w) + Math.max(0, -box.y0) + Math.max(0, box.y1 - h)
        cost += over * 1000
      }
      if (cost < bestCost) { bestCost = cost; best = { slot, box } }
    }
    Object.assign(n, best.slot)
    placed.push(best.box)
  }
}

const centroid = nodes => ({
  x: nodes.reduce((a, n) => a + n.x, 0) / nodes.length,
  y: nodes.reduce((a, n) => a + n.y, 0) / nodes.length,
})

const nodeBox = n => ({ x0: n.x - n.r, y0: n.y - n.r, x1: n.x + n.r, y1: n.y + n.r })
const union = (a, b) => ({ x0: Math.min(a.x0, b.x0), y0: Math.min(a.y0, b.y0), x1: Math.max(a.x1, b.x1), y1: Math.max(a.y1, b.y1) })

/* The simulation spaces nodes as circles, but a label is a wide block off to
   one side, so a crowded collection still collides. This pass treats each
   node and its placed label as one box, pushes apart any two boxes that
   overlap — along whichever axis keeps the drawing nearest the window's
   shape — re-places the labels, and repeats until nothing touches. */
const RELAX_PASSES = 400
const BREATHE = 10
function relax(nodes, edges, aspect) {  // → true once nothing overlaps
  for (let pass = 0; pass < RELAX_PASSES; pass++) {
    const centre = centroid(nodes)
    placeLabels(nodes, edges.flatMap((e, i) => edgeSamples(e, i, centre)))
    const boxes = nodes.map(n => union(labelBox(n), nodeBox(n)))
    const all = boxes.reduce(union)
    /* Too wide for the window: part overlaps up and down. Too tall: sideways. */
    const bias = (all.x1 - all.x0) / Math.max(all.y1 - all.y0, 1) > aspect ? 1.6 : 0.6
    let moved = false
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = boxes[i], b = boxes[j]
        if (!boxesCross(a, b)) continue
        moved = true
        const ox = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0)
        const oy = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0)
        const [p, q] = [nodes[i], nodes[j]]
        if (oy <= ox * bias) {
          const dir = (a.y0 + a.y1) <= (b.y0 + b.y1) ? -1 : 1
          const step = oy / 2 + BREATHE
          p.y += dir * step; q.y -= dir * step
        } else {
          const dir = (a.x0 + a.x1) <= (b.x0 + b.x1) ? -1 : 1
          const step = ox / 2 + BREATHE
          p.x += dir * step; q.x -= dir * step
        }
      }
    }
    if (!moved) return true
  }
  return false
}

/* Settle the simulation to completion up front, then freeze it. A live
   simulation makes the page feel unfinished and never stops costing frames.

   `aspect` is the width/height of the window the drawing will be fitted to;
   the layout is shaped to match, so fitting wastes little room. `seed` maps
   ids to positions from a fuller layout of the same collection: a part of
   the collection then settles from where its items were in the whole, so
   stepping the detail toggle reveals and hides rather than reshuffles.
   Position comes from similarity alone: there is no time axis (dropped
   2026-11-17; a left-to-right year pull put unrelated work side by side). */
export function layoutGraph(items, pairs = null, { aspect = W / H, seed = null } = {}) {
  /* Sorted by id, so the drawing depends on what is in the collection and
     never on the order it arrived in — the page sorts by year, the checks
     read file order, and both must see the same layout. */
  items = [...items].sort((a, b) => a.id.localeCompare(b.id))
  const nodes = items.map(i => {
    const n = {
      id: i.id, type: i.type, title: i.title, year: i.year, venue: labelVenue(i),
      kicker: kicker(i), lines: wrapTitle(i.title), short: shortTitle(i.title),
    }
    /* Size and colour say what kind of thing it is (types.mjs). */
    const { r, ring, realm, colour } = markFor(i)
    Object.assign(n, { r, ring, realm, colour })
    const at = seed && seed.get(i.id)
    if (at) { n.x = at.x; n.y = at.y }
    return n
  })
  /* Scored similarity when the collection has it; shared tags otherwise. */
  const edges = pairs ? similarityEdges(items, pairs) : buildEdges(items)
  const ax = Math.sqrt(aspect)

  if (nodes.length > 1) {
    const sim = forceSimulation(nodes)
      /* Closer for stronger pairs, so distance on the page reads as difference. */
      .force('link', forceLink(edges).id(d => d.id)
        .distance(e => (e.score !== undefined ? 90 + (1 - e.score) * 170 : 150))
        .strength(e => Math.min(e.weight, 6) * 0.06))
      .force('charge', forceManyBody().strength(-420))
      /* Room for the label block, so two nodes never settle a label apart. */
      .force('collide', forceCollide(n => {
        const { w, h } = labelSize(n)
        return 22 + Math.max(w * 0.42, h * 0.55)
      }))
      /* A softer pull sideways than up and down spreads it to the window's shape. */
      .force('x', forceX(0).strength(0.06 / ax))
      .force('y', forceY(0).strength(0.06 * ax))
      .stop()
    for (let i = 0; i < TICKS; i++) sim.tick()
  } else if (nodes.length) {
    nodes[0].x = 0; nodes[0].y = 0
    nodes[0].vx = 0; nodes[0].vy = 0
  }
  /* d3 resolves edge ends to nodes inside the simulation; do it by hand for one. */
  if (nodes.length <= 1) {
    const byId = new Map(nodes.map(n => [n.id, n]))
    for (const e of edges) { e.source = byId.get(e.source); e.target = byId.get(e.target) }
  }

  const degree = new Map(nodes.map(n => [n.id, 0]))
  const adjacency = new Map(nodes.map(n => [n.id, new Set()]))
  for (const e of edges) {
    const s = e.source.id
    const t = e.target.id
    degree.set(s, degree.get(s) + 1)
    degree.set(t, degree.get(t) + 1)
    adjacency.get(s).add(t)
    adjacency.get(t).add(s)
  }

  for (const n of nodes) n.degree = degree.get(n.id) || 0
  let settled = true
  if (nodes.length > 1) settled = relax(nodes, edges, aspect)
  else placeLabels(nodes)

  /* The world is the settled drawing plus a margin, moved to start at 0,0.
     Labels move with their nodes — they are not re-placed, which could undo
     the relaxation. */
  let width = W, height = H
  if (nodes.length) {
    const all = nodes.map(n => union(labelBox(n), nodeBox(n))).reduce(union)
    const dx = PAD - all.x0, dy = PAD - all.y0
    for (const n of nodes) { n.x += dx; n.y += dy; n.lx += dx; n.ly += dy }
    width = Math.round(all.x1 - all.x0 + PAD * 2)
    height = Math.round(all.y1 - all.y0 + PAD * 2)
  }

  const centre = nodes.length ? centroid(nodes) : { x: width / 2, y: height / 2 }

  /* The label's box doubles as a hit area, so the title text is clickable. */
  for (const n of nodes) n.box = labelBox(n)

  return {
    width,
    height,
    settled,
    nodes,
    edges: edges.map((e, i) => ({ ...e, d: edgePath(e, i, centre), ghost: ghostPath(e, centre) })),
    adjacency,
    centre,
  }
}

/* The part of a settled layout that is on show at some zoom. Every item keeps
   the place it has in the whole, so zooming reveals and hides and never
   reshuffles; only the links are chosen again among what is on show, so an
   item whose strongest neighbours are hidden still keeps its best visible
   one. `items` must be a subset of the items `full` was laid out from. */
export function subLayout(full, items, pairs = null) {
  const ids = new Set(items.map(i => i.id))
  if (ids.size >= full.nodes.length) return full
  const byId = new Map(full.nodes.map(n => [n.id, n]))
  const nodes = full.nodes.filter(n => ids.has(n.id))
  const sorted = [...items].sort((a, b) => a.id.localeCompare(b.id))
  const raw = pairs ? similarityEdges(sorted, pairs) : buildEdges(sorted)
  const edges = raw
    .map(e => ({ ...e, source: byId.get(e.source), target: byId.get(e.target) }))
    .filter(e => e.source && e.target)
  const adjacency = new Map(nodes.map(n => [n.id, new Set()]))
  for (const e of edges) {
    adjacency.get(e.source.id).add(e.target.id)
    adjacency.get(e.target.id).add(e.source.id)
  }
  return {
    ...full,
    nodes,
    edges: edges.map((e, i) => ({ ...e, d: edgePath(e, i, full.centre), ghost: ghostPath(e, full.centre) })),
    adjacency,
  }
}

/* Which detail step a zoom shows, as a ratio of the zoom that fits the
   whole drawing: zoomed out shows the fewest, the fitted view the middle
   step, zoomed in everything. One − or + from the fit crosses a step. */
export const ZOOM_STEPS = [0.85, 1.3]
export function levelAtZoom(ratio, steps) {
  if (steps <= 1) return 0
  const cuts = steps === 2 ? [1.3] : ZOOM_STEPS
  let lv = 0
  while (lv < cuts.length && ratio >= cuts[lv] - 1e-6) lv++
  return Math.min(lv, steps - 1)
}
/* The zoom ratio that shows a step: just inside it. */
export function zoomForLevel(lv, steps) {
  if (steps <= 1 || lv <= 0) return steps <= 1 ? 1 : 0.7
  const cuts = steps === 2 ? [1.3] : ZOOM_STEPS
  if (lv === 1 && steps === 3) return 1
  return cuts[Math.min(lv, cuts.length) - 1] * 1.15
}

/* Labels on screen, at whatever zoom the drawing is shown. Type stays one
   size however far you zoom, so from a distance not everything fits, and
   detail goes in two steps:

   1. Every node, most important first, gets its short label (kicker and
      short title) in the first slot where it touches no dot and no label
      already placed, keeping clear by `margin`. One that fits nowhere is left
      out; its dot remains, and hovering it brings the label back.
   2. Then, in the same order, each short label grows to the full title
      wherever that still touches nothing.

   Zooming in spreads the dots, so more labels come in and more grow full.

   `points` are nodes in screen pixels, each with `sizes` {full, short} of
   its label and the `slot` it held in the layout, which is tried first so
   labels don't hop about. `avoid` lists boxes no label may cross; `always`
   ids are labelled even where nothing fits (marked `crowded`). `reach` ids —
   the finished works — may stand their label further off on a leader before
   giving up, so a dense cluster never leaves its main works unnamed.
   Returns id → { lx, ly, anchor, slot, box, full, leader, crowded }, where
   `leader` is the hairline {x1, y1, x2, y2} of a label set off from its dot. */
export function placeOnScreen(points, order, bounds, { margin = { x: 10, y: 6 }, avoid = [], always = [], reach = [], protect = [] } = {}) {
  const byId = new Map(points.map(p => [p.id, p]))
  const dots = points.map(p => ({ id: p.id, x0: p.x - p.r - 3, y0: p.y - p.r - 3, x1: p.x + p.r + 3, y1: p.y + p.r + 3 }))
  /* Anything else labels must keep off — the control strip. */
  for (const b of avoid) dots.push({ id: null, ...b })
  const taken = new Map()   // id → box
  const shown = new Map()

  const fits = (id, box) => {
    if (box.x0 < bounds.x0 || box.y0 < bounds.y0 || box.x1 > bounds.x1 || box.y1 > bounds.y1) return false
    const air = { x0: box.x0 - margin.x, y0: box.y0 - margin.y, x1: box.x1 + margin.x, y1: box.y1 + margin.y }
    for (const [other, b] of taken) if (other !== id && boxesCross(air, b)) return false
    return !dots.some(d => d.id !== id && boxesCross(box, d))
  }
  const tryPlace = (p, size, full) => {
    const options = slots(p, size, true)
    const first = shown.get(p.id)?.slot ?? p.slot ?? 0
    const own = options.find(o => o.slot === first) ?? options[0]
    for (const o of [own, ...options.filter(o => o !== own)]) {
      const box = boxAt(o.lx, o.ly, o.anchor, size)
      if (!fits(p.id, box)) continue
      taken.set(p.id, box)
      shown.set(p.id, { lx: o.lx, ly: o.ly, anchor: o.anchor, slot: o.slot, box, full, leader: shown.get(p.id)?.leader ?? null })
      return true
    }
    return false
  }

  /* Where a node sits too deep in a cluster for any slot beside it, its
     label may stand off a little way, joined to the dot by a hairline. The
     line must cross no dot and no label, and nothing placed later crosses it. */
  const LEADS = [[1, 0], [-1, 0], [1, -0.8], [-1, -0.8], [1, 0.8], [-1, 0.8], [0, -1], [0, 1]]
  const segmentClear = (id, x0, y0, x1, y1) => {
    for (let u = 0.15; u <= 1; u += 0.12) {
      const x = x0 + (x1 - x0) * u, y = y0 + (y1 - y0) * u
      const pt = { x0: x - 1, y0: y - 1, x1: x + 1, y1: y + 1 }
      for (const [other, b] of taken) if (other !== id && boxesCross(pt, b)) return false
      if (dots.some(d => d.id !== id && boxesCross(pt, d))) return false
    }
    return true
  }
  const NEAR = [34, 60, 90], FAR = [34, 60, 90, 125, 165, 210]
  const far = new Set(reach)
  const tryStandOff = (p, size) => {
    for (const dist of far.has(p.id) ? FAR : NEAR) {
      for (const [dx, dy] of LEADS) {
        const len = Math.hypot(dx, dy)
        const ax = p.x + (dx / len) * (p.r + dist), ay = p.y + (dy / len) * (p.r + dist)
        const anchor = dx > 0 ? 'start' : dx < 0 ? 'end' : 'middle'
        const ly = dy < 0 ? ay - size.h + ASCENT : dy > 0 ? ay + ASCENT : ay + 4
        const lx = anchor === 'start' ? ax + 3 : anchor === 'end' ? ax - 3 : ax
        const box = boxAt(lx, ly, anchor, size)
        if (!fits(p.id, box)) continue
        const sx = p.x + (dx / len) * (p.r + 2), sy = p.y + (dy / len) * (p.r + 2)
        if (!segmentClear(p.id, sx, sy, ax, ay)) continue
        taken.set(p.id, box)
        for (let u = 0.15; u <= 1; u += 0.12) {
          const x = sx + (ax - sx) * u, y = sy + (ay - sy) * u
          taken.set(`${p.id}#${u}`, { x0: x - 1, y0: y - 1, x1: x + 1, y1: y + 1 })
        }
        shown.set(p.id, { lx, ly, anchor, slot: -1, box, full: false, leader: { x1: sx, y1: sy, x2: ax, y2: ay } })
        return true
      }
    }
    return false
  }

  for (const id of order) {
    const p = byId.get(id)
    if (!p) continue
    const plain = p.sizes.full === p.sizes.short
    if (tryPlace(p, p.sizes.short, plain)) continue
    if (tryStandOff(p, p.sizes.short)) { if (plain) shown.get(id).full = true; continue }
    if (!always.includes(id)) continue
    /* The pinned item is labelled whatever the crowding: in the slot that
       covers the fewest dots, its own slot on a tie; everything placed after
       it keeps clear. */
    /* Dots in `protect` (the focused family's fanned copies) count ten
       times over, so the label covers some other dot before one of those. */
    const guarded = new Set(protect)
    const covered = o => {
      const b = boxAt(o.lx, o.ly, o.anchor, p.sizes.short)
      return dots.reduce((n, d) => n + (d.id !== id && boxesCross(b, d) ? (guarded.has(d.id) ? 10 : 1) : 0), 0)
    }
    const options = slots(p, p.sizes.short, true)
    const own = options.find(x => x.slot === p.slot) ?? options[0]
    const o = [own, ...options.filter(x => x !== own)].reduce((best, x) => (covered(x) < covered(best) ? x : best))
    const box = boxAt(o.lx, o.ly, o.anchor, p.sizes.short)
    taken.set(id, box)
    shown.set(id, { lx: o.lx, ly: o.ly, anchor: o.anchor, slot: o.slot, box, full: p.sizes.full === p.sizes.short, crowded: true })
  }
  for (const id of order) {
    const p = byId.get(id)
    if (p && shown.has(id) && !shown.get(id).full && !shown.get(id).leader) tryPlace(p, p.sizes.full, true)
  }
  return shown
}
