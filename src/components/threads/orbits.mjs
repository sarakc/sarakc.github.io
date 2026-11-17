/* A talk or poster with its paper's title is a showing of that paper, not a
   second work. It stays its own item — it can be reached, pinned, searched
   and linked to — but the graph draws it as a small ring orbiting the paper.
   Spec §9: docs/superpowers/specs/2026-11-15-threads-atlas-navigation-and-encoding-design.md */
import { typeInfo, isMine } from './types.mjs'

/* Lowercase, accents stripped. Search folds the same way. */
export function fold(s) {
  return String(s ?? '').normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

/* A title with case, accents, punctuation and runs of spaces ignored. */
export function titleKey(title) {
  return fold(title).replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
}

/* satellite id → parent id. Always computed on the whole collection, so
   which items orbit never depends on a filter. An item orbits a parent when
   it is tier 3, the parent tier 1 or 2, both in the same realm, and their
   titles match. Ties: lowest tier, then nearest year, then id. */
export function findOrbits(items) {
  const realm = i => (isMine(i) ? 'own' : 'loved')
  const parentsByKey = new Map()
  for (const i of items) {
    if (typeInfo(i.type).tier > 2) continue
    const key = titleKey(i.title)
    if (!key) continue
    if (!parentsByKey.has(key)) parentsByKey.set(key, [])
    parentsByKey.get(key).push(i)
  }
  const orbits = new Map()
  for (const i of items) {
    if (typeInfo(i.type).tier !== 3) continue
    const options = (parentsByKey.get(titleKey(i.title)) || []).filter(p => realm(p) === realm(i))
    if (!options.length) continue
    const gap = p => (p.year && i.year ? Math.abs(p.year - i.year) : Infinity)
    options.sort((a, b) =>
      typeInfo(a.type).tier - typeInfo(b.type).tier || gap(a) - gap(b) || a.id.localeCompare(b.id))
    orbits.set(i.id, options[0].id)
  }
  return orbits
}

/* The works the graph lays out, and each drawn parent's satellites (by year,
   then id). A satellite whose parent isn't among `items` appears in neither. */
export function splitWorks(items, orbits) {
  const ids = new Set(items.map(i => i.id))
  const works = []
  const satellites = new Map()
  for (const i of items) {
    const parent = orbits.get(i.id)
    if (!parent) { works.push(i); continue }
    if (!ids.has(parent)) continue
    if (!satellites.has(parent)) satellites.set(parent, [])
    satellites.get(parent).push(i)
  }
  for (const list of satellites.values()) {
    list.sort((a, b) => (a.year || 0) - (b.year || 0) || a.id.localeCompare(b.id))
  }
  return { works, satellites }
}

/* A showing is drawn as a paler copy of its paper's dot (Sara, 2026-11-16,
   replacing 2.5px hollow rings). At rest the copies sit in a tight, uneven
   orbit half hidden behind the dot, like an echo; when the paper is hovered
   or pinned they fan out into a short arc beside it, each labelled with its
   venue and year. Positions are screen px, so they keep their size at every
   zoom. Each copy's place at rest comes from a hash of its id, so it never
   changes between visits. */

/* Copies at rest: 0.45–0.85 of the dot's radius off centre, at an angle of
   their own, kept at least a quarter turn apart. */
export function restPoints(parent, ids) {
  const out = []
  let last = null
  for (const id of ids) {
    let a = hash(`${id}|a`) * Math.PI * 2
    if (last !== null && Math.abs(Math.atan2(Math.sin(a - last), Math.cos(a - last))) < Math.PI / 2) a = last + Math.PI * (0.6 + hash(`${id}|b`) * 0.8)
    last = a
    const d = parent.r * (0.45 + hash(`${id}|d`) * 0.4)
    out.push({ x: parent.x + Math.cos(a) * d, y: parent.y + Math.sin(a) * d })
  }
  return out
}

const FAN_GAP = 9      // the dot's edge to a copy's edge
const COPY_GAP = 3     // between neighbouring copies

/* Copies fanned out: an arc just outside the dot, starting lower left and
   stepping clockwise. */
export function fanPoints(parent, count) {
  const r = parent.r
  const d = 2 * r + FAN_GAP
  const chord = 2 * r + COPY_GAP
  const step = 2 * Math.asin(Math.min(1, chord / (2 * d)))
  const out = []
  for (let i = 0; i < count; i++) {
    const a = (3 * Math.PI) / 4 + i * step
    out.push({ x: parent.x + Math.cos(a) * d, y: parent.y + Math.sin(a) * d })
  }
  return out
}

/* Kept for callers that still place by count alone. */
export const orbitPoints = fanPoints

function hash(text) {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619) }
  return ((h >>> 0) % 100000) / 100000
}
