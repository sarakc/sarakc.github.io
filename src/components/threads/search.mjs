/* Search for `/`: every word typed must start some word of an item's
   title, creator, venue, tags, people or year. Case and accents are
   ignored; nothing else is dropped — no stop words, no short words, no
   plurals — so "AI" finds AI. No regex is built from what's typed.
   Spec §7. */
import { fold } from './orbits.mjs'
import { typeInfo } from './types.mjs'

const words = text => fold(text).split(/[^\p{L}\p{N}]+/u).filter(Boolean)

const matchesAll = (query, pool) => query.every(q => pool.some(w => w.startsWith(q)))

/* Up to `limit` items, title matches first, then by tier (a paper before
   its talks), then newest first, then id. */
export function searchItems(items, query, limit = 6) {
  const q = words(query)
  if (!q.length) return []
  const hits = []
  for (const item of items) {
    const title = words(item.title)
    const rest = [
      item.creator, item.venue, ...(item.tags || []), ...(item.genres || []), ...(item.people || []),
      item.year === undefined || item.year === null ? '' : String(item.year),
    ].flatMap(words)
    if (!matchesAll(q, [...title, ...rest])) continue
    hits.push({ item, inTitle: matchesAll(q, title) })
  }
  hits.sort((a, b) =>
    (b.inTitle - a.inTitle) ||
    (typeInfo(a.item.type).tier - typeInfo(b.item.type).tier) ||
    ((b.item.year ?? -Infinity) - (a.item.year ?? -Infinity)) ||
    a.item.id.localeCompare(b.item.id))
  return hits.slice(0, limit).map(h => h.item)
}
