/* What each type of item is, declared once. The graph, the page, the check
   scripts and the docs all read this table, so adding `game` or `recipe` is
   one row here (and usually a `--t-<type>` token in base.css).

   - mine:  whether an item of this type is Sara's own work unless it says
            otherwise (`mine: true|false` on the item wins).
   - form:  which kind of loved thing it is when it isn't hers — read,
            listen, watch, look or post. Sets the hue family.
   - tier:  how much it weighs within its kind. 1 is a finished work you'd
            hand someone, 2 an ongoing or container-shaped thing, 3 a single
            appearance or a short piece. Sets the dot size.
   - rank:  how strongly it anchors the collection in the detail toggle.
            Kept apart from tier so the toggle's ordering stays as it was.
   - ring:  drawn as an open ring rather than a solid dot.
   - noun:  the plain word for it in the detail line.

   See docs/superpowers/specs/2026-11-15-threads-atlas-navigation-and-encoding-design.md. */

const row = (mine, form, tier, rank, ring, noun) => Object.freeze({ mine, form, tier, rank, ring, noun })

export const TYPES = Object.freeze({
  paper:   row(false, 'read',   1, 3,   false, 'paper'),
  thesis:  row(true,  'read',   1, 3,   false, 'thesis'),
  book:    row(false, 'read',   1, 3,   false, 'book'),
  music:   row(false, 'listen', 1, 3,   false, 'music'),
  film:    row(false, 'watch',  1, 3,   false, 'film'),
  project: row(true,  'look',   2, 2.5, false, 'project'),
  course:  row(true,  'watch',  2, 2.5, false, 'course'),
  podcast: row(false, 'listen', 2, 2.5, false, 'podcast'),
  video:   row(false, 'watch',  2, 2.5, false, 'video'),
  art:     row(false, 'look',   2, 2.5, false, 'art'),
  service: row(true,  'post',   3, 1.2, true,  'service'),
  talk:    row(true,  'listen', 3, 0.6, true,  'talk'),
  poster:  row(true,  'look',   3, 0.6, true,  'poster'),
  post:    row(false, 'post',   3, 0.6, true,  'post'),
})

/* A type the table doesn't know: drawn middling, solid, in the post hue. */
export const UNKNOWN = row(false, 'post', 2, 1.5, false, 'item')

export const KNOWN_TYPES = Object.keys(TYPES)

export function typeInfo(type) {
  return Object.prototype.hasOwnProperty.call(TYPES, type) ? TYPES[type] : UNKNOWN
}

/* Sara's own work: the item says so, or its type is hers by default. */
export function isMine(item) {
  return typeof item.mine === 'boolean' ? item.mine : typeInfo(item.type).mine
}

/* Dot radius in screen px, by tier. */
export const TIER_RADIUS = Object.freeze({ 1: 7, 2: 5, 3: 3.5 })

/* The base hue of each form, for a type with no token of its own. */
export const FORM_BASE = Object.freeze({
  read: '--t-book', listen: '--t-podcast', watch: '--t-video', look: '--t-art', post: '--t-post',
})

/* How an item is drawn. Own work is ink; a loved thing takes its type's
   token, or its form's base hue when the type has none. */
export function markFor(item) {
  const info = typeInfo(item.type)
  const realm = isMine(item) ? 'own' : info.form
  const colour = realm === 'own'
    ? 'var(--page-ink)'
    : `var(--t-${item.type}, var(${FORM_BASE[info.form]}))`
  return { realm, tier: info.tier, ring: info.ring, r: TIER_RADIUS[info.tier], colour }
}

/* The detail line: creator · venue · year, with the type's noun standing in
   for a missing venue unless the creator already names the role. */
export function detailMeta(item) {
  const noun = typeInfo(item.type).noun
  /* A whole word, so "Sara Court · invited talk" drops "talk" but
     "Stuart Davis" keeps "art". */
  const named = String(item.creator || '').toLowerCase().split(/[^\p{L}\p{N}]+/u).includes(noun)
  const middle = item.venue || (named ? '' : noun)
  return [item.creator, middle, item.year].filter(Boolean).join(' · ')
}
