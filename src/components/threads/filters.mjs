/* What counts as a filtered graph, and what Escape does on the page. Search
   handles its own Escape first; after that each press peels one layer: the
   pin, then the filters. */

export function isFiltered({ tag, researchOnly }) {
  return Boolean(tag) || Boolean(researchOnly)
}

export function escapeStep({ pinned, filtered, typing }) {
  if (typing) return null
  if (pinned) return 'unpin'
  if (filtered) return 'clear'
  return null
}
