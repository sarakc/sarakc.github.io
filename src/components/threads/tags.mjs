/* How a tag reads on the page. Tags are stored lowercase and kebab-case
   (`responsible-ai`); visitors see words (`responsible AI`). A collection
   may name its own labels and its primary tags in a top-level `tags` block:

     "tags": { "primary": ["morphology", "maltese"], "labels": { "llms": "LLMs" } }

   Primary tags lead the topic line, in the order given; the rest follow,
   most used first. */

/* Words that keep their capitals wherever they turn up in a tag. */
const WORDS = {
  ai: 'AI', llm: 'LLM', llms: 'LLMs', mt: 'MT', nlp: 'NLP', rag: 'RAG', sae: 'SAE', saes: 'SAEs',
  maltese: 'Maltese', quechua: 'Quechua', arabic: 'Arabic', chinese: 'Chinese', mandarin: 'Mandarin',
  english: 'English', spanish: 'Spanish', semitic: 'Semitic', romance: 'Romance',
}

/* Whole tags whose hyphen belongs to the word. */
const PHRASES = { 'low-resource': 'low-resource', 'southern-quechua': 'Southern Quechua', 'word-and-paradigm': 'word-and-paradigm', 'human-in-the-loop': 'human-in-the-loop' }

export function tagLabel(tag, labels = {}) {
  if (labels && Object.prototype.hasOwnProperty.call(labels, tag)) return labels[tag]
  if (Object.prototype.hasOwnProperty.call(PHRASES, tag)) return PHRASES[tag]
  return String(tag).split('-').map(w => WORDS[w] || w).join(' ')
}

/* Tags in topic-line order: the collection's primary ones first, as listed,
   then every other tag by how many items carry it, then alphabetically. */
export function orderTags(items, primary = []) {
  const counts = new Map()
  for (const item of items) {
    for (const tag of item.tags || []) if (tag) counts.set(tag, (counts.get(tag) || 0) + 1)
  }
  const lead = primary.filter(t => counts.has(t))
  const leadSet = new Set(lead)
  const rest = [...counts.entries()]
    .filter(([t]) => !leadSet.has(t))
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([t]) => t)
  return { tags: [...lead, ...rest], primaryCount: lead.length }
}
