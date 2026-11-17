/* Similarity between /threads items, after the engine in Unified
   (unified-music-manager/server/lib/similarity): several signals, each
   scored 0–1, blended by weight. Shared values count for more the rarer
   they are, so a co-author on everything says little and a co-author on two
   items says a lot.

   Pure. Run offline by scripts/build-threads-similarity.mjs, which writes the
   result next to the items file; the page only reads it. */
import { tagLabel } from './tags.mjs'
import { isMine } from './types.mjs'

export const DEFAULTS = Object.freeze({
  weights: Object.freeze({
    project: 4,      // the same piece of work, presented again
    title: 2.5,      // title wording — catches the same project when `project` is missing
    tags: 3,
    people: 2.5,     // co-authors, Sara excluded
    languages: 2,
    methods: 1.5,
    genres: 1.5,     // the methods of a loved thing: poetry, ambient, essay
    community: 1,    // which research community the venue belongs to
    year: 0.75,
    connects: 3,     // an explicit link in the data
  }),
  yearSigma: 2,      // years apart at which year closeness has fallen to ~60%
  minScore: 0.2,     // weaker pairs are never edges
  evidenceFloor: 1.5,// …nor are pairs resting on too little shared evidence
  k: 3,              // each item draws its strongest k neighbours (chosen on the page)
  candidates: 8,     // …from this many written to the file, so any part of the
                     //    collection can still find its own strongest k
  fallbackScore: 0.1,// an item with no neighbour above minScore keeps its best one above this
})

const SET_SIGNALS = ['tags', 'people', 'languages', 'methods', 'genres', 'community']

/* The values an item holds for a set signal. A loved thing's creator stands in
   for co-authors, so two albums by one artist sit together; Sara's own work
   names its collaborators in `people` and its creator line is her byline. */
export function valuesOf(item, field) {
  const v = item?.[field]
  if (field === 'people' && !(v && v.length) && item?.creator && !isMine(item)) return [item.creator]
  return v || []
}

/* An item's project keys. `project` may be one key or a list, for a work that
   belongs to more than one line of work (a paper that is a dissertation
   chapter and its own study). */
export function projectsOf(item) {
  const p = item?.project
  return (Array.isArray(p) ? p : p ? [p] : []).filter(Boolean)
}
const sharedProjects = (a, b) => {
  const B = new Set(projectsOf(b))
  return projectsOf(a).filter(k => B.has(k))
}

const STOP = new Set(('a an and are as at be both by for from how in into is it its of on or the their ' +
  'this to towards with what when where which who why our your these those is are was were enough').split(' '))

/* Content words of a title, lowercased, plural -s folded. */
export function titleTokens(title) {
  return String(title || '')
    .toLowerCase()
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/[\s-]+/)
    .filter(w => w.length > 2 && !STOP.has(w))
    .map(w => (w.length > 4 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w))
}

const idf = (df, n) => Math.log(1 + n / df)

function documentFrequencies(items, field) {
  const df = new Map()
  for (const it of items) for (const v of new Set(valuesOf(it, field))) df.set(v, (df.get(v) || 0) + 1)
  return df
}

/* Weighted Jaccard: shared IDF over union IDF. Null when either side is empty,
   so a solo talk is not penalised for having no co-authors. */
function setSimilarity(a, b, df, n) {
  const A = new Set(a || []), B = new Set(b || [])
  if (!A.size || !B.size) return null
  let shared = 0, union = 0
  const sharedValues = []
  for (const v of new Set([...A, ...B])) {
    const w = idf(df.get(v) || 1, n)
    union += w
    if (A.has(v) && B.has(v)) { shared += w; sharedValues.push(v) }
  }
  return { sim: union ? shared / union : 0, shared: sharedValues }
}

/* TF-IDF vectors of title tokens; cosine between them. */
function titleVectors(items) {
  const tokens = items.map(i => titleTokens(i.title))
  const df = new Map()
  for (const ts of tokens) for (const t of new Set(ts)) df.set(t, (df.get(t) || 0) + 1)
  return tokens.map(ts => {
    const v = new Map()
    for (const t of ts) v.set(t, (v.get(t) || 0) + 1)
    let norm = 0
    for (const [t, tf] of v) { const w = tf * idf(df.get(t), items.length); v.set(t, w); norm += w * w }
    norm = Math.sqrt(norm) || 1
    for (const [t, w] of v) v.set(t, w / norm)
    return v
  })
}

function cosine(a, b) {
  let s = 0
  const shared = []
  for (const [t, w] of a) if (b.has(t)) { s += w * b.get(t); shared.push(t) }
  return { sim: s, shared }
}

/* Score one pair. Returns the blended score, the raw evidence behind it, and
   the reasons — each signal's contribution, strongest first. */
export function scorePair(a, b, ctx, cfg = DEFAULTS) {
  const parts = []
  const add = (signal, sim, values) => {
    if (sim === null) return
    parts.push({ signal, sim, weight: cfg.weights[signal], values })
  }

  /* Sharing any one project key is the same work presented again. */
  const pa = projectsOf(a), pb = projectsOf(b), common = sharedProjects(a, b)
  add('project', pa.length && pb.length ? (common.length ? 1 : 0) : null, common)

  const t = cosine(ctx.titles.get(a.id), ctx.titles.get(b.id))
  add('title', t.sim, t.shared)

  /* A value on a third or more of the collection still counts toward the
     score, but is never offered as the reason — "Micha Elsner" explains
     nothing when he is on nearly everything. Rarest values first. */
  for (const field of SET_SIGNALS) {
    const r = setSimilarity(valuesOf(a, field), valuesOf(b, field), ctx.df[field], ctx.n)
    const telling = r
      ? r.shared
        .filter(v => (ctx.df[field].get(v) || 0) / ctx.n < 1 / 3)
        .sort((x, y) => (ctx.df[field].get(x) || 0) - (ctx.df[field].get(y) || 0))
      : []
    add(field, r && r.sim, telling)
  }

  add('year', a.year && b.year ? Math.exp(-((a.year - b.year) ** 2) / (2 * cfg.yearSigma ** 2)) : null,
    a.year && b.year ? [Math.abs(a.year - b.year)] : [])

  const linked = (a.connects || []).includes(b.id) || (b.connects || []).includes(a.id)
  if (linked) add('connects', 1, [])

  let evidence = 0, possible = 0
  for (const p of parts) { evidence += p.weight * p.sim; possible += p.weight }
  const score = possible ? evidence / possible : 0
  const reasons = parts
    .filter(p => p.sim > 0 && p.signal !== 'year' && (p.values.length || !SET_SIGNALS.includes(p.signal)))
    .map(p => ({ signal: p.signal, contribution: +(p.weight * p.sim).toFixed(3), values: p.values }))
    .sort((x, y) => y.contribution - x.contribution)
  return { score, evidence, reasons }
}

export function context(items) {
  const df = {}
  for (const f of SET_SIGNALS) df[f] = documentFrequencies(items, f)
  const vectors = titleVectors(items)
  return { n: items.length, df, titles: new Map(items.map((it, i) => [it.id, vectors[i]])) }
}

/* Every item's strongest `candidates` neighbours above the thresholds, as one
   undirected edge per pair. The page draws each visible item's best `k` of
   these (graph.mjs similarityEdges). Each item also lists its nearest pairs
   that fall short of the thresholds but clear fallbackScore, marked `weak`:
   an item with no strong pair among those on show attaches by its best weak
   one instead of floating free.
   Deterministic: ties break on id. */
export function buildSimilarity(items, cfg = DEFAULTS) {
  const ctx = context(items)
  const scored = new Map(items.map(i => [i.id, []]))
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const r = scorePair(items[i], items[j], ctx, cfg)
      if (r.score <= 0) continue
      scored.get(items[i].id).push({ other: items[j].id, ...r })
      scored.get(items[j].id).push({ other: items[i].id, ...r })
    }
  }

  const pairKey = (a, b) => (a < b ? `${a}|${b}` : `${b}|${a}`)
  const edges = new Map()
  for (const it of items) {
    const list = scored.get(it.id).sort((x, y) => y.score - x.score || x.other.localeCompare(y.other))
    const strong = r => r.score >= cfg.minScore && r.evidence >= cfg.evidenceFloor
    /* Strong pairs first, then — so a part of the collection that leaves an
       item without them still has somewhere to attach it — the nearest weak. */
    const n = cfg.candidates ?? cfg.k
    const kept = [
      ...list.filter(strong).slice(0, n),
      ...list.filter(r => !strong(r) && r.score >= cfg.fallbackScore).slice(0, Math.max(1, Math.floor(n / 2))),
    ]
    for (const r of kept) {
      const key = pairKey(it.id, r.other)
      if (!edges.has(key)) {
        const [source, target] = it.id < r.other ? [it.id, r.other] : [r.other, it.id]
        const edge = { source, target, score: +r.score.toFixed(4), reasons: r.reasons }
        if (!strong(r)) edge.weak = true
        edges.set(key, edge)
      }
    }
  }
  return [...edges.values()].sort((x, y) => x.source.localeCompare(y.source) || x.target.localeCompare(y.target))
}

/* Pairs whose titles are close but whose `project` keys differ or are
   missing — the likely "same work, presented again" the data doesn't say. */
export function projectSuggestions(items, threshold = 0.5) {
  const ctx = context(items)
  const out = []
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i], b = items[j]
      if (sharedProjects(a, b).length) continue
      const { sim } = cosine(ctx.titles.get(a.id), ctx.titles.get(b.id))
      if (sim >= threshold) out.push({ a: a.id, b: b.id, title: +sim.toFixed(2), projects: [projectsOf(a).join('+') || '—', projectsOf(b).join('+') || '—'] })
    }
  }
  return out.sort((x, y) => y.title - x.title)
}

/* Plain words for why two items sit together, strongest reason first. */
export function describeReasons(reasons, max = 3) {
  const words = []
  for (const r of reasons || []) {
    if (r.signal === 'project') words.push('same project')
    else if (r.signal === 'title') words.push('similar titles')
    else if (r.signal === 'connects') words.push('linked')
    else if (r.signal === 'year') continue
    else words.push(...r.values.map(v => tagLabel(v)))
    if (words.length >= max) break
  }
  return [...new Set(words)].slice(0, max)
}
