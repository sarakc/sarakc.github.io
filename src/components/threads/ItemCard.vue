<script setup>
/* One row of the list: year and title. Opening it shows who made it, what it
   is, the link and the note — the same detail the graph shows on click. */
import { computed } from 'vue'
import { detailMeta } from './types.mjs'
import { labelVenue } from './graph.mjs'

const props = defineProps({
  item: { type: Object, required: true },
  open: { type: Boolean, default: false },
  /* Name the venue on the row: set when another item shares this title. */
  showVenue: { type: Boolean, default: false },
})

defineEmits(['toggle'])

/* Publication year if there is one, otherwise the year it was added. */
const year = computed(() => {
  if (props.item.year) return props.item.year
  const m = /^(\d{4})-/.exec(props.item.added || '')
  return m ? m[1] : ''
})

/* The detail line's words, less the year the row already shows. */
const meta = computed(() => detailMeta({ ...props.item, year: undefined }))
</script>

<template>
  <article class="row" :class="{ open }">
    <button type="button" :aria-expanded="open" @click="$emit('toggle', item.id)">
      <span class="year">{{ year }}</span>
      <span class="title">{{ item.title }}<span v-if="showVenue && item.venue" class="venue">{{ labelVenue(item) }}</span></span>
    </button>
    <div v-if="open" class="more">
      <p class="meta">
        {{ meta }}<template v-if="item.url">
          <template v-if="meta"> · </template><a :href="item.url" target="_blank" rel="noopener">open ↗</a>
        </template>
      </p>
      <p v-if="item.note" class="note">{{ item.note }}</p>
    </div>
  </article>
</template>

<style scoped>
.row { border-bottom: 1px solid var(--cool-hairline); }

button {
  width: 100%;
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  gap: 16px;
  align-items: baseline;
  padding: 16px 0;
  background: none;
  border: none;
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
}
.year {
  font-family: var(--page-sans);
  font-size: 12.5px;
  font-weight: 600;
  color: var(--page-ink);
  font-variant-numeric: tabular-nums;
}
.venue {
  margin-left: 10px;
  font-family: var(--page-sans);
  font-size: 12.5px;
  color: var(--page-dim);
  white-space: nowrap;
}
.title {
  font-family: var(--page-serif);
  font-size: 18.5px;
  line-height: 1.35;
  color: var(--page-ink);
  transition: color 0.15s;
}
button:hover .title { color: var(--accent-blue); }
.row.open .title { color: var(--page-ink); }

.more { padding: 0 0 18px 72px; }
.meta {
  margin: 0;
  font-size: 13px;
  color: var(--page-dim);
}
.meta a {
  color: var(--page-ink);
  text-decoration: none;
  padding: 0;
  border-bottom: 1px solid var(--cool-hairline);
}
.meta a:hover { color: var(--accent-blue); border-color: var(--accent-blue); background: none; }
.note {
  margin: 10px 0 0;
  max-width: 64ch;
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--page-ink);
}

@media (max-width: 860px) {
  button { grid-template-columns: 1fr; gap: 2px; padding: 14px 0; }
  .title { font-size: 19px; }
  .more { padding-left: 0; }
}
</style>
