<script setup>
/* `/` search: one quiet input at the top left of the graph, and up to six
   rows under it in the label's own format. Arrowing or pointing at a row
   previews it in the graph; Enter or a click pins it. Escape closes. */
import { ref, computed, watch, onMounted } from 'vue'
import { searchItems } from './search.mjs'
import { kicker, shortTitle } from './graph.mjs'
import { typeInfo } from './types.mjs'

const props = defineProps({
  /* The whole collection, not just what is on show. */
  items: { type: Array, required: true },
})
const emit = defineEmits(['pick', 'peek', 'close'])

const input = ref(null)
const query = ref('')
const active = ref(-1)

const results = computed(() => searchItems(props.items, query.value))
/* Each row reads like the item's label. A paper and the poster that
   presented it can read the same, so then each also names what it is. */
const rows = computed(() => {
  const base = results.value.map(item => ({ item, kicker: kicker(item), title: shortTitle(item.title).join(' ') }))
  const seen = new Map()
  for (const r of base) seen.set(r.kicker + '|' + r.title, (seen.get(r.kicker + '|' + r.title) || 0) + 1)
  return base.map(r => (seen.get(r.kicker + '|' + r.title) > 1
    ? { ...r, kicker: [r.kicker, typeInfo(r.item.type).noun].filter(Boolean).join(' · ') }
    : r))
})
watch(results, () => { active.value = -1; emit('peek', null) })

function move(step) {
  const n = results.value.length
  if (!n) return
  active.value = active.value < 0 ? (step > 0 ? 0 : n - 1) : (active.value + step + n) % n
  emit('peek', results.value[active.value].id)
}

function choose(i = active.value < 0 ? 0 : active.value) {
  const item = results.value[i]
  if (item) emit('pick', item.id)
}

function onKey(e) {
  if (e.key === 'ArrowDown') { e.preventDefault(); move(1) }
  else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1) }
  else if (e.key === 'Enter') { e.preventDefault(); choose() }
  else if (e.key === 'Escape') {
    /* Only closes: a second Escape, on the page, unpins. */
    e.preventDefault()
    e.stopPropagation()
    emit('close', { restoreFocus: true })
  }
}

onMounted(() => input.value?.focus())
</script>

<template>
  <div class="search" role="search">
    <input
      ref="input"
      v-model="query"
      type="text"
      placeholder="find…"
      aria-label="Find an item"
      autocomplete="off"
      spellcheck="false"
      role="combobox"
      aria-autocomplete="list"
      :aria-expanded="results.length > 0"
      :aria-controls="results.length ? 'search-results' : undefined"
      :aria-activedescendant="active >= 0 ? `search-result-${active}` : undefined"
      @keydown="onKey"
      @blur="emit('close')"
    >
    <ul v-if="results.length" id="search-results" role="listbox" @mouseleave="emit('peek', null)">
      <li
        v-for="({ item, kicker: k, title }, i) in rows"
        :id="`search-result-${i}`"
        :key="item.id"
        role="option"
        :aria-selected="i === active"
        :class="{ active: i === active }"
        @mousedown.prevent
        @mouseenter="active = i; emit('peek', item.id)"
        @click="choose(i)"
      >
        <span v-if="k" class="kicker">{{ k }}</span>
        <span class="title">{{ title }}</span>
      </li>
    </ul>
    <p v-else-if="query.trim()" class="none">nothing found</p>
  </div>
</template>

<style scoped>
.search {
  width: 300px;
  max-width: calc(100% - 24px);
  padding: 0 20px 10px 0;
  background: var(--page-bg);
  font-family: var(--page-sans);
}
input {
  width: 100%;
  padding: 4px 0 5px;
  border: none;
  border-bottom: 1px solid var(--cool-hairline);
  border-radius: 0;
  background: var(--page-bg);
  font: inherit;
  font-size: 13px;
  color: var(--page-ink);
  outline: none;
}
input:focus { border-bottom-color: var(--page-ink); }
input::placeholder { color: var(--page-dim); }

ul {
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
  background: var(--page-bg);
}
li {
  display: flex;
  flex-direction: column;
  padding: 6px 0;
  cursor: pointer;
}
.kicker {
  font-size: 12px;
  letter-spacing: 0.02em;
  font-variant-numeric: tabular-nums;
  color: var(--page-dim);
}
.title {
  font-family: var(--page-serif);
  font-size: 14.5px;
  line-height: 1.3;
  color: var(--page-ink);
  opacity: 0.86;
}
li.active .title { opacity: 1; color: var(--accent-blue); }
.none {
  margin: 6px 0 0;
  font-size: 12px;
  color: var(--page-dim);
}
</style>
