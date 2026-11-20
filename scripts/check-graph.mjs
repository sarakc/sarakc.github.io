#!/usr/bin/env node
/* Exercises the real /threads layout code against the real items.json.
   Catches structural breakage — off-canvas nodes, NaN coordinates,
   malformed paths — that a passing build will not. */
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import {
  layoutGraph, buildEdges, wrapTitle, labelSize, labelBox, TITLE_LINE, YEAR_LINE, kicker,
  shortTitle, shortVenue, rankItems, levelCounts, placeOnScreen, similarityEdges,
} from '../src/components/threads/graph.mjs'
import { findOrbits, splitWorks, fanPoints, restPoints } from '../src/components/threads/orbits.mjs'
import { buildSimilarity, DEFAULTS as SIMILARITY } from '../src/components/threads/similarity.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ITEMS = process.argv[2]
  ? resolve(process.cwd(), process.argv[2])
  : resolve(__dirname, '..', 'public', 'threads', 'items.json')

const failures = []
const notes = []
function check(label, ok, detail = '') {
  if (ok) console.log(`  ✓ ${label}`)
  else { failures.push(`${label}${detail ? ` — ${detail}` : ''}`); console.log(`  ✗ ${label}${detail ? ` — ${detail}` : ''}`) }
}

const { items: collection } = JSON.parse(await readFile(ITEMS, 'utf8'))
/* The page lays out works: a talk with its paper's title orbits the paper
   instead (orbits.mjs). Every check below runs on what the page draws. */
const { works: items, satellites } = splitWorks(collection, findOrbits(collection))

/* Use the collection's similarity edges when they have been built, as the page does. */
let pairs = null
let similarity = null
try {
  similarity = JSON.parse(await readFile(ITEMS.replace(/\.json$/, '.similarity.json'), 'utf8'))
  pairs = similarity.edges
  console.log('using similarity edges')
} catch { console.log('no similarity file — using shared-tag edges') }
console.log(`\nlayout of ${items.length} works (${collection.length - items.length} satellites)\n`)

/* The similarity file is built offline (npm run build-similarity), and the
   page trusts it whenever it exists: an item added or edited without a
   rebuild floats unlinked, and there is no fallback to shared tags. So the
   file must be exactly what a fresh build of these items gives. */
if (similarity) {
  const usable = collection.filter(i => i && i.id)
  const ids = new Set(usable.map(i => i.id))
  const inFile = new Set((pairs || []).flatMap(p => [p.source, p.target]))
  const unknown = [...inFile].filter(id => !ids.has(id))
  check('the similarity file names only items in the collection', unknown.length === 0,
    `${unknown.join(', ')} — run npm run build-similarity`)
  const fresh = JSON.stringify(buildSimilarity(usable, SIMILARITY))
  const stale = fresh !== JSON.stringify(pairs) || JSON.stringify(SIMILARITY) !== JSON.stringify(similarity.config)
  let detail = ''
  if (stale) {
    const key = p => `${p.source}|${p.target}`
    const want = new Map(JSON.parse(fresh).map(p => [key(p), JSON.stringify(p)]))
    const have = new Map((pairs || []).map(p => [key(p), JSON.stringify(p)]))
    const missing = [...want.keys()].filter(k => !have.has(k))
    const extra = [...have.keys()].filter(k => !want.has(k))
    const changed = [...want.keys()].filter(k => have.has(k) && have.get(k) !== want.get(k))
    const touched = [...new Set([...missing, ...extra, ...changed].flatMap(k => k.split('|')))]
    detail = (touched.length
      ? `${missing.length} pairs missing, ${extra.length} extra, ${changed.length} changed (${touched.slice(0, 4).join(', ')}${touched.length > 4 ? ', …' : ''})`
      : 'built with other settings than similarity.mjs now has') +
      ' — run npm run build-similarity'
  }
  check('the similarity file is up to date with the items', !stale, detail)
}

const { nodes, edges, adjacency, width: W, height: H, settled } = layoutGraph(items, pairs)

check('label relaxation settled with nothing touching', settled)

/* The page sorts items by year; the layout must not care. */
const shuffled = layoutGraph([...items].reverse(), pairs)
const same = shuffled.nodes.every(n => {
  const m = nodes.find(o => o.id === n.id)
  return Math.abs(m.x - n.x) < 0.01 && Math.abs(m.y - n.y) < 0.01
})
check('layout does not depend on input order', same)

check('one node per item', nodes.length === items.length, `${nodes.length} vs ${items.length}`)

const finite = nodes.every(n => Number.isFinite(n.x) && Number.isFinite(n.y))
check('every coordinate is finite', finite,
  finite ? '' : nodes.filter(n => !Number.isFinite(n.x) || !Number.isFinite(n.y)).map(n => n.id).join(', '))

const out = nodes.filter(n => n.x < 0 || n.x > W || n.y < 0 || n.y > H)
check('every node inside the viewBox', out.length === 0,
  out.map(n => `${n.id} (${n.x.toFixed(0)},${n.y.toFixed(0)})`).join(', '))

const overlapping = []
for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y)
    if (d < nodes[i].r + nodes[j].r + 4) overlapping.push(`${nodes[i].id}/${nodes[j].id} ${d.toFixed(0)}px`)
  }
}
check('no two nodes overlap', overlapping.length === 0, overlapping.join(', '))

/* Labels are placed after the simulation: each picks the side of its node
   that collides least. A label box may not cross another node or label. */
function boxesCross(a, b) {
  return a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1
}
function nodeBox(n) { return { x0: n.x - n.r, y0: n.y - n.r, x1: n.x + n.r, y1: n.y + n.r } }
const labelClashes = []
for (let i = 0; i < nodes.length; i++) {
  const a = labelBox(nodes[i])
  for (let j = 0; j < nodes.length; j++) {
    if (i === j) continue
    if (boxesCross(a, nodeBox(nodes[j]))) labelClashes.push(`${nodes[i].id} label / ${nodes[j].id} node`)
    if (j > i && boxesCross(a, labelBox(nodes[j]))) labelClashes.push(`${nodes[i].id} / ${nodes[j].id} labels`)
  }
}
check('no label crosses another node or label', labelClashes.length === 0, labelClashes.join(', '))

const labelOut = nodes.map(labelBox).filter(b => b.x0 < 0 || b.x1 > W || b.y0 < 0 || b.y1 > H)
check('every label inside the viewBox', labelOut.length === 0, `${labelOut.length} outside`)

const placed = nodes.every(n => Number.isFinite(n.lx) && Number.isFinite(n.ly) && ['start', 'middle', 'end'].includes(n.anchor))
check('every node has a placed label', placed)

const N = '[\\d.-]+'
const STROKE = new RegExp(`^M ${N} ${N} C ${N} ${N} ${N} ${N} ${N} ${N} C ${N} ${N} ${N} ${N} ${N} ${N} Z$`)
const GHOST = new RegExp(`^M ${N} ${N} Q ${N} ${N} ${N} ${N}$`)
const badPath = edges.filter(e => !STROKE.test(e.d) || (e.ghost !== null && !GHOST.test(e.ghost)))
check('every edge is a closed, tapered stroke', badPath.length === 0,
  badPath.map(e => e.d).slice(0, 2).join(' | '))

const resolved = edges.every(e => typeof e.source === 'object' && typeof e.target === 'object')
check('edge endpoints resolved to nodes', resolved)

const degreeOk = nodes.every(n => n.degree === (adjacency.get(n.id)?.size ?? -1))
check('degree matches adjacency', degreeOk)

/* Size says tier: every dot is one of the three tier radii. */
const radiusOk = nodes.every(n => [7, 5, 3.5].includes(n.r))
check('every radius is a tier radius', radiusOk,
  nodes.filter(n => ![7, 5, 3.5].includes(n.r)).slice(0, 4).map(n => `${n.id} ${n.r}`).join(', '))

/* Labels carry the whole title, wrapped — never truncated unless absurdly long. */
const norm = t => t.split(/\s+/).filter(Boolean).join(' ')
const whole = nodes.filter(n => n.lines.join(' ') !== norm(n.title) && !n.lines.at(-1).endsWith('…'))
check('every label carries the full title', whole.length === 0, whole.map(n => n.id).join(', '))
const wide = nodes.filter(n => n.lines.some(l => l.length > 30 && l.includes(' ')))
check('title lines wrap at 30 characters', wide.length === 0, wide.map(n => n.id).join(', '))

check('a short title stays on one line', wrapTitle('Crystallise').length === 1)
check('a long title wraps without losing words',
  wrapTitle('Analogy in Contact: Modeling Maltese Plural Inflection').join(' ') === 'Analogy in Contact: Modeling Maltese Plural Inflection')
check('an absurd title is cut, and the cut is marked', wrapTitle('word '.repeat(80)).at(-1).endsWith('…'))
check('a year adds its own line',
  labelSize({ lines: ['x'], kicker: '2024' }).h === YEAR_LINE + TITLE_LINE &&
  labelSize({ lines: ['x'] }).h === TITLE_LINE)
check('the kicker carries year and venue', kicker({ year: 2024, venue: 'WMT' }) === '2024 · WMT' && kicker({ year: 2024 }) === '2024')
check('a long venue is cut at a word, never on "The"',
  shortVenue('Ph.D. dissertation, The Ohio State University') === 'Ph.D. dissertation…' && shortVenue('WMT') === 'WMT')
check('a subtitle starts its own line', wrapTitle('Analogy in Contact: Modeling Maltese Plural Inflection')[0] === 'Analogy in Contact:')
check('the short title is the part before the colon',
  shortTitle('Analogy in Contact: Modeling Maltese Plural Inflection').join(' ') === 'Analogy in Contact')
check('a short title is never more than two lines', nodes.every(n => n.short.length <= 2))

/* The detail toggle. */
const counts = levelCounts(items.length)
check('detail steps grow to the whole collection',
  counts.at(-1) === items.length && counts.every((c, i) => i === 0 || c > counts[i - 1]))
check('a small collection has a single step', levelCounts(12).length === 1)
const rank = rankItems(items, pairs)
check('ranking covers every item once', rank.length === items.length && new Set(rank).size === items.length)
const kind = new Map(items.map(i => [i.id, i.type]))
const works = new Set(['paper', 'thesis', 'project', 'course'])
const lastWork = Math.max(-1, ...rank.map((id, i) => (works.has(kind.get(id)) ? i : -1)))
const firstShowing = rank.findIndex(id => ['talk', 'poster'].includes(kind.get(id)))
check('pieces of work rank above talks and posters', firstShowing === -1 || lastWork < firstShowing)
/* Service sits between works and showings, so the middle step keeps it. */
const services = items.filter(i => i.type === 'service').map(i => i.id)
if (services.length && counts.length > 2) {
  const middle = new Set(rank.slice(0, counts[1]))
  check('the middle detail step keeps every service item', services.every(id => middle.has(id)),
    services.filter(id => !middle.has(id)).join(', '))
}

if (pairs) {
  check('similarity edges resolve for the whole collection', (() => {
    const drawn = similarityEdges(items, pairs)
    return drawn.length > 0 && drawn.every(e => e.score > 0)
  })())
}

/* Each step lays out cleanly, seeded from the whole. */
const seed = new Map(nodes.map(n => [n.id, { x: n.x, y: n.y }]))
for (const c of counts.slice(0, -1)) {
  const top = new Set(rank.slice(0, c))
  const part = layoutGraph(items.filter(i => top.has(i.id)), pairs, { seed })
  const ok = part.settled && part.nodes.length === c &&
    part.nodes.every(n => Number.isFinite(n.x) && n.x >= 0 && n.x <= part.width && n.y >= 0 && n.y <= part.height)
  check(`detail step of ${c} lays out cleanly`, ok)
}

/* No time axis: position comes from similarity alone, so changing every
   year moves nothing. */
const undated = layoutGraph(items.map(i => ({ ...i, year: i.year ? i.year - 40 : i.year })), pairs)
check('position ignores year', undated.nodes.every((n, i) =>
  Math.abs(n.x - nodes[i].x) < 0.01 && Math.abs(n.y - nodes[i].y) < 0.01))

/* The layout takes the shape of the window it is fitted to. */
const wideLayout = layoutGraph(items, pairs, { aspect: 2.4 })
const tallLayout = layoutGraph(items, pairs, { aspect: 1 })
if (items.length > 6) check('a wider window gets a wider layout', wideLayout.width / wideLayout.height > tallLayout.width / tallLayout.height)

/* On screen: at every zoom, no label crosses another label or another dot. */
const sized = nodes.map(n => {
  const full = labelSize(n)
  const short = n.short.join(' ') === n.lines.join(' ') ? full : labelSize(n, n.short)
  return { n, sizes: { full, short } }
})
let screenClashes = 0
let shownAtZoom = []
const EVERYWHERE = { x0: -1e6, y0: -1e6, x1: 1e6, y1: 1e6 }
const dotOf = p => ({ x0: p.x - p.r, y0: p.y - p.r, x1: p.x + p.r, y1: p.y + p.r })
function clashes(shown, dots) {
  let c = 0
  const placedBoxes = [...shown.entries()]
  for (let i = 0; i < placedBoxes.length; i++) {
    for (let j = i + 1; j < placedBoxes.length; j++) if (boxesCross(placedBoxes[i][1].box, placedBoxes[j][1].box)) c++
  }
  for (const [id, s] of placedBoxes) for (const d of dots) if (d.id !== id && boxesCross(s.box, dotOf(d))) c++
  return c
}
let satClashes = 0, satUnplaced = 0
for (const k of [0.3, 0.5, 0.8, 1, 1.5, 2.5]) {
  const pts = sized.map(({ n, sizes }) => ({ id: n.id, x: n.x * k, y: n.y * k, r: n.r, slot: n.slot, sizes }))
  /* Satellites are paler copies of their parent's dot, a constant screen
     size: half behind it at rest, fanned out beside it when focused. */
  const at = new Map(pts.map(p => [p.id, p]))
  const copies = (parent, list, place) => place(at.get(parent), list).map((o, i) =>
    ({ id: list[i].id, parent, ...o, r: at.get(parent).r, kicker: kicker(list[i]) }))
  const sats = [...satellites].flatMap(([parent, list]) => copies(parent, list, (p, l) => restPoints(p, l.map(i => i.id))))
  const satBox = s => ({ x0: s.x - s.r - 2, y0: s.y - s.r - 2, x1: s.x + s.r + 2, y1: s.y + s.r + 2 })
  const shown = placeOnScreen(pts, rank, EVERYWHERE, { avoid: sats.map(satBox) })
  screenClashes += clashes(shown, [...pts, ...sats])
  shownAtZoom.push(`${k}×: ${shown.size}`)
  /* Focusing a family labels its satellites with their kickers, and they
     must fit like any other label. */
  for (const [parent, list] of satellites) {
    const family = copies(parent, list, (p, l) => fanPoints(p, l.length))
    const famPts = family.map(s => ({ ...s, sizes: (() => { const z = labelSize({ kicker: s.kicker }, []); return { full: z, short: z } })() }))
    /* As on the page: the focused family is labelled first. */
    const order = [parent, ...list.map(i => i.id), ...rank.filter(id => id !== parent)]
    const famShown = placeOnScreen([...pts, ...famPts], order, EVERYWHERE,
      { avoid: sats.filter(s => s.parent !== parent).map(satBox), always: [parent], protect: family.map(s => s.id) })
    /* Only clashes a satellite takes part in: a pinned parent that is
       crowded at a far zoom is the existing "labelled however crowded" rule. */
    const satIds = new Set(sats.map(x => x.id))
    let c = 0
    for (const [id, at] of famShown) {
      for (const [other, b] of famShown) {
        if (other !== id && (satIds.has(id) || satIds.has(other)) && id < other && boxesCross(at.box, b.box)) c++
      }
      /* A pinned parent labelled "however crowded" may cover other dots,
         resting copies included (they sit behind their own paper's dot), but
         never its own fanned copies. */
      const dots = at.crowded ? family : [...pts, ...sats.filter(x => x.parent !== parent), ...family]
      for (const d of dots) {
        if (d.id !== id && (satIds.has(id) || satIds.has(d.id)) && boxesCross(at.box, dotOf(d))) c++
      }
    }
    satClashes += c
    /* Like any label, one with no room is left out — but from about the
       whole-drawing fit inwards, every one finds room. */
    if (k >= 0.5) satUnplaced += list.filter(i => !famShown.has(i.id)).length
  }
}
check('labels on screen never cross at any zoom', screenClashes === 0, `${screenClashes} clashes`)
if (satellites.size) {
  check('satellite labels never cross at any zoom', satClashes === 0, `${satClashes} clashes`)
  check('every satellite label finds room from 0.5× in', satUnplaced === 0, `${satUnplaced} missing`)
}
const roomy = (() => {
  const pts = sized.map(({ n, sizes }) => ({ id: n.id, x: n.x * 2.5, y: n.y * 2.5, r: n.r, slot: n.slot, sizes }))
  return placeOnScreen(pts, rank, { x0: -1e6, y0: -1e6, x1: 1e6, y1: 1e6 })
})()
check('zoomed in, every item is labelled in full', roomy.size === nodes.length && [...roomy.values()].every(s => s.full),
  `${roomy.size}/${nodes.length}`)
notes.push(`labels shown by zoom — ${shownAtZoom.join(', ')}`)
const pinned = placeOnScreen(
  sized.map(({ n, sizes }) => ({ id: n.id, x: n.x * 0.2, y: n.y * 0.2, r: n.r, slot: n.slot, sizes })),
  rank, { x0: -1e6, y0: -1e6, x1: 1e6, y1: 1e6 }, { always: [rank.at(-1)] })
check('a pinned item is labelled however crowded', pinned.has(rank.at(-1)))

/* Filtering by tag is the other path through the layout. The topic line
   offers every tag in the collection, satellites' included, and the page
   splits the filtered items into works as it does the whole (ThreadsView). */
const allOrbits = findOrbits(collection)
const tags = [...new Set(collection.flatMap(i => i.tags || []))]
let filterFailures = 0
const unseen = []
for (const tag of tags) {
  const filtered = collection.filter(i => (i.tags || []).includes(tag))
  const { works: subset, satellites: subSats } = splitWorks(filtered, allOrbits)
  const sub = layoutGraph(subset, pairs)
  const bad = sub.nodes.some(n => !Number.isFinite(n.x) || n.x < 0 || n.x > sub.width || n.y < 0 || n.y > sub.height)
  if (bad) filterFailures++
  /* Every item the filter keeps is drawn: as a work, or round a work that is. */
  const drawn = new Set([...subset.map(i => i.id), ...[...subSats.values()].flat().map(i => i.id)])
  const lost = filtered.filter(i => !drawn.has(i.id))
  if (lost.length) unseen.push(`${tag}: ${lost.map(i => i.id).join(', ')}`)
}
check(`every one-tag filter lays out cleanly (${tags.length} tags)`, filterFailures === 0, `${filterFailures} broken`)
check('every one-tag filter draws every item it keeps', unseen.length === 0, unseen.join('; '))

const empty = layoutGraph([])
check('empty collection does not throw', empty.nodes.length === 0)
const single = layoutGraph([items[0]], pairs)
const one = single.nodes[0]
check('a single item sits inside its own small world',
  one.x > 0 && one.x < single.width && one.y > 0 && one.y < single.height && labelBox(one).x1 <= single.width)

/* Not a failure, but the thing most likely to disappoint. */
const rawEdges = pairs ? edges : buildEdges(items)
const isolated = nodes.filter(n => n.degree === 0)
notes.push(`${rawEdges.length} edges across ${items.length} items (${rawEdges.filter(e => e.explicit).length} explicit)`)
if (isolated.length) notes.push(`${isolated.length} unconnected: ${isolated.map(n => n.id).join(', ')}`)

console.log('\n' + notes.map(n => `  · ${n}`).join('\n'))

if (failures.length) {
  console.log(`\n${failures.length} failure${failures.length === 1 ? '' : 's'}\n`)
  process.exit(1)
}
console.log('\nok\n')
