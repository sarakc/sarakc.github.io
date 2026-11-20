/* The item editor's data logic, kept apart from its page (add-item.html) so
   check-threads can run a save round trip without a browser.

   The form knows ten fields. An item can carry many more (venue, project,
   community, place, people, methods, languages, mine, venueShort, and
   whatever comes next), and the collection has top-level blocks beside
   `items` (`about`, `tags.primary`). Saving merges the form into the item it
   was filled from: a field the form shows but you didn't touch is left
   exactly as it was, one you changed is written, one you cleared is removed,
   and everything the form doesn't show is kept, in its place. */

export const SLUG_RE = /^[a-z0-9][a-z0-9-]*$/
export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

/* The fields the form edits, in the order a new item is written. */
export const FORM_FIELDS = ['id', 'type', 'title', 'added', 'tags', 'url', 'creator', 'year', 'connects', 'note']

export const splitTags = s => String(s ?? '').split(',').map(t => t.trim().toLowerCase()).filter(Boolean)

/* An item as the form shows it: one string per text input, the connects as
   a list. Filling the form and reading it back untouched gives this again. */
export function toForm(item) {
  const text = v => (v === undefined || v === null ? '' : String(v))
  return {
    id: text(item?.id),
    type: text(item?.type),
    title: text(item?.title),
    added: text(item?.added),
    tags: Array.isArray(item?.tags) ? item.tags.join(', ') : text(item?.tags),
    url: text(item?.url),
    creator: text(item?.creator),
    year: text(item?.year),
    connects: Array.isArray(item?.connects) ? [...item.connects] : [],
    note: text(item?.note),
  }
}

const sameValue = (a, b) => (Array.isArray(a) || Array.isArray(b)
  ? JSON.stringify(a ?? []) === JSON.stringify(b ?? [])
  : a === b)

/* What the form's value for one field writes into an item; undefined
   removes the field. */
function parseField(field, value) {
  switch (field) {
    case 'tags': return splitTags(value)
    case 'connects': return value && value.length ? [...value] : undefined
    case 'year': {
      const y = String(value ?? '').trim()
      return y ? Number(y) : undefined
    }
    case 'id': case 'type': case 'title': case 'added':
      return String(value ?? '').trim()
    default: {
      const v = String(value ?? '').trim()
      return v || undefined
    }
  }
}

/* The item a save writes: `existing` (null for a new item) with the form's
   changes applied. Never mutates `existing`. */
export function mergeItem(existing, form) {
  if (!existing) {
    const item = {}
    for (const f of FORM_FIELDS) {
      const v = parseField(f, form[f])
      if (v !== undefined) item[f] = v
    }
    return item
  }
  const before = toForm(existing)
  const item = { ...existing }
  for (const f of FORM_FIELDS) {
    if (!(f in form) || sameValue(form[f], before[f])) continue
    const v = parseField(f, form[f])
    if (v === undefined) delete item[f]
    else item[f] = v
  }
  return item
}

/* The collection after saving `item`: added at the top, or put in the place
   of the one being edited, with a renamed id chased through every connects. */
export function saveItem(items, editingId, item) {
  if (!editingId) return [item, ...items]
  return items.map(other => {
    if (other.id === editingId) return item
    if (item.id !== editingId && Array.isArray(other.connects) && other.connects.includes(editingId)) {
      return { ...other, connects: other.connects.map(c => (c === editingId ? item.id : c)) }
    }
    return other
  })
}

/* The collection without `id`, and with nothing left pointing at it. */
export function deleteItem(items, id) {
  return items.filter(i => i.id !== id).map(other => {
    if (!Array.isArray(other.connects) || !other.connects.includes(id)) return other
    const connects = other.connects.filter(c => c !== id)
    const next = { ...other, connects }
    if (!connects.length) delete next.connects
    return next
  })
}

/* The file's contents, or a message saying why it can't be edited. */
export function parseCollection(text) {
  let data
  try {
    data = JSON.parse(text)
  } catch (e) {
    return { error: 'That file is not valid JSON:\n\n' + e.message }
  }
  if (!data || typeof data !== 'object' || Array.isArray(data) || !Array.isArray(data.items)) {
    return { error: 'Expected an object with an "items" array at the top level.' }
  }
  return { data }
}

/* The whole file: every top-level key as it was, in its order, with the
   new items in place of the old. */
export function serialise(data, items) {
  const out = { ...data, items }
  return JSON.stringify(out, null, 2) + '\n'
}

/* Mirrors scripts/check-items.mjs, so nothing gets past here that fails there. */
export function validate(item, items, editingId) {
  const errors = []
  const warnings = []
  for (const f of ['id', 'type', 'title', 'added']) if (!item[f]) errors.push('missing ' + f)
  for (const f of ['id', 'title']) if (item[f] && typeof item[f] !== 'string') errors.push(f + ' must be a string')
  const tags = Array.isArray(item.tags) ? item.tags : []
  if (!tags.length) errors.push('missing tags')
  if (typeof item.id === 'string' && item.id && !SLUG_RE.test(item.id)) errors.push('id "' + item.id + '" must be kebab-case')
  if (items.some(i => i.id === item.id && i.id !== editingId)) errors.push('id "' + item.id + '" is already used')
  if (item.added && !DATE_RE.test(item.added)) errors.push('added must be YYYY-MM-DD')
  if (item.year !== undefined && (!Number.isInteger(item.year) || item.year < 1000 || item.year > 9999)) {
    errors.push('year must be a four-digit number')
  }
  if (item.url && !/^https?:\/\//.test(item.url)) warnings.push('url does not start with http(s)://')
  for (const t of tags) if (!SLUG_RE.test(t)) warnings.push('tag "' + t + '" should be lowercase kebab-case')
  if (!item.note) warnings.push('no note — the note is the part that does the work')
  return { errors, warnings }
}
