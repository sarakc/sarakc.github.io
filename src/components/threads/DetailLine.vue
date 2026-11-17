<script setup>
/* The one line of detail under the graph. Empty at rest; hovering a node
   previews it; clicking pins it. A pinned item also shows its note. */
import { computed } from 'vue'
import { detailMeta } from './types.mjs'

const props = defineProps({
  item: { type: Object, default: null },
  pinned: { type: Boolean, default: false },
  preview: { type: Boolean, default: false },
  /* Why the previewed item sits near the pinned one, in a few words. */
  reason: { type: String, default: '' },
})

/* creator · venue · year, with a plain noun for a missing venue (types.mjs). */
const meta = computed(() => (props.item ? detailMeta(props.item) : ''))
</script>

<template>
  <div class="detail" :class="{ preview, empty: !item }" aria-live="polite">
    <template v-if="item">
      <h2>{{ item.title }}</h2>
      <p class="meta">
        {{ meta }}<template v-if="item.url">
          <template v-if="meta"> · </template><a :href="item.url" target="_blank" rel="noopener">open ↗</a>
        </template>
      </p>
      <p v-if="preview && reason" class="reason">linked by {{ reason }}</p>
      <p v-if="pinned && !preview && item.note" class="note">{{ item.note }}</p>
    </template>
  </div>
</template>

<style scoped>
/* A fixed band under the graph, so pointing at something never moves the
   graph; a long note scrolls inside it. */
.detail {
  flex: none;
  height: 118px;
  overflow-y: auto;
  padding: 16px 0 12px;
  border-top: 1px solid var(--cool-hairline);
  background: var(--page-bg);
}
.detail.preview h2,
.detail.preview .meta { opacity: 0.6; }
.reason {
  margin: 6px 0 0;
  font-size: 13px;
  color: var(--accent-blue);
}

h2 {
  margin: 0;
  font-family: var(--page-serif);
  font-weight: 400;
  font-size: 21px;
  line-height: 1.3;
  letter-spacing: -0.005em;
  max-width: 46em;
  color: var(--page-ink);
}
.meta {
  margin: 6px 0 0;
  font-size: 13px;
  color: var(--page-dim);
}
.meta a {
  color: var(--page-ink);
  text-decoration: none;
  padding: 0;
  border-bottom: 1px solid var(--cool-hairline);
  transition: color 0.15s, border-color 0.15s;
}
.meta a:hover { color: var(--accent-blue); border-color: var(--accent-blue); background: none; }
.note {
  margin: 12px 0 0;
  max-width: 64ch;
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--page-ink);
}
</style>
