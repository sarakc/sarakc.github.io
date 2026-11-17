/* The list view reads like the CV: Sara's own work under the CV's sections,
   in the CV's order, newest first within each; anything beyond the CV after
   it, grouped by kind (books, music, …). Sara's request, 2026-11-17. */
import { isMine } from './types.mjs'

/* The CV's sections, in its order, and which own-work items go under each. */
export const CV_SECTIONS = Object.freeze([
  { id: 'education', label: 'education', fits: i => i.type === 'thesis' },
  { id: 'research', label: 'research experience', fits: i => i.type === 'project' },
  { id: 'publications', label: 'publications', fits: i => i.type === 'paper' },
  { id: 'invited', label: 'invited talks', fits: i => i.type === 'talk' && isInvited(i) },
  { id: 'presentations', label: 'conference presentations', fits: i => i.type === 'talk' || i.type === 'poster' },
  { id: 'teaching', label: 'teaching', fits: i => i.type === 'course' },
  { id: 'service', label: 'leadership, policy & service', fits: i => i.type === 'service' },
])

/* Groups for things beyond the CV, in this order; any other kind follows,
   named by its type. */
const KINDS = Object.freeze([
  ['book', 'books'], ['paper', 'papers'], ['music', 'music'], ['podcast', 'podcasts'],
  ['film', 'films'], ['video', 'videos'], ['course', 'courses'], ['talk', 'talks'],
  ['art', 'art'], ['post', 'posts'],
])

/* An invited talk says so: `invited: true`, or "invited" in its byline
   ("Sara Court · invited talk"). */
export function isInvited(item) {
  if (typeof item.invited === 'boolean') return item.invited
  return /\binvited\b/i.test(String(item.creator || ''))
}

/* Newest first, like a CV; work with no year yet (in progress) leads. Ties
   keep the order the items came in. */
function byDate(a, b) {
  const ya = Number.isFinite(a.year) ? a.year : Infinity
  const yb = Number.isFinite(b.year) ? b.year : Infinity
  return yb - ya
}

/* items → [{ id, label, items }], empty groups left out. */
export function cvGroups(items) {
  const own = CV_SECTIONS.map(s => ({ id: s.id, label: s.label, items: [] }))
  const other = new Map()
  const rest = { id: 'other-work', label: 'other work', items: [] }
  for (const item of items) {
    if (isMine(item)) {
      const at = CV_SECTIONS.findIndex(s => s.fits(item))
      ;(at >= 0 ? own[at] : rest).items.push(item)
    } else {
      const type = item.type || 'item'
      if (!other.has(type)) other.set(type, [])
      other.get(type).push(item)
    }
  }
  const known = KINDS.map(([t]) => t)
  const kinds = [...other.keys()].sort((a, b) => {
    const ia = known.indexOf(a), ib = known.indexOf(b)
    return (ia < 0 ? Infinity : ia) - (ib < 0 ? Infinity : ib) || a.localeCompare(b)
  })
  const beyond = kinds.map(t => ({
    id: `kind-${t}`,
    label: (KINDS.find(([k]) => k === t) || [t, `${t}s`])[1],
    items: other.get(t),
  }))
  return [...own, rest, ...beyond]
    .filter(g => g.items.length)
    .map(g => ({ ...g, items: [...g.items].sort(byDate) }))
}
