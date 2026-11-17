<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: { type: Object, default: null },
  items: { type: Array, required: true },
})

defineEmits(['tag-click', 'select'])

function formatDate(d) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(d || '')
  return m ? `${m[1]} · ${m[2]} · ${m[3]}` : ''
}

function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return 'open'
  }
}

/* Anything sharing a tag with the selected item, or explicitly tied to it. */
const connected = computed(() => {
  if (!props.item) return []
  const tags = new Set(props.item.tags || [])
  return props.items.filter(other => {
    if (other.id === props.item.id) return false
    if ((props.item.connects || []).includes(other.id)) return true
    if ((other.connects || []).includes(props.item.id)) return true
    return (other.tags || []).some(t => tags.has(t))
  })
})

const counts = computed(() => {
  const tags = new Set()
  for (const i of props.items) for (const t of i.tags || []) tags.add(t)
  return { items: props.items.length, tags: tags.size }
})
</script>

<template>
  <aside class="rail">
    <template v-if="item">
      <div class="kind">
        <span class="type" :class="`t-${item.type}`">{{ item.type }}</span>
        <span class="kind-right">
          <span v-if="item.year">{{ item.year }}</span>
          <span v-else>{{ formatDate(item.added) }}</span>
          <button type="button" class="clear" @click="$emit('select', null)">× clear</button>
        </span>
      </div>
      <h3>{{ item.title }}</h3>
      <p v-if="item.creator" class="by">{{ item.creator }}</p>
      <p v-if="item.note" class="note">{{ item.note }}</p>
      <p v-if="item.tags && item.tags.length" class="tags">
        <template v-for="(tag, i) in item.tags" :key="tag">
          <button type="button" @click="$emit('tag-click', tag)">#{{ tag }}</button><span
            v-if="i < item.tags.length - 1" class="sep">·</span>
        </template>
      </p>
      <a v-if="item.url" class="open" :href="item.url" target="_blank" rel="noopener">↗ {{ hostOf(item.url) }}</a>

      <template v-if="connected.length">
        <hr />
        <div class="also">connected · {{ connected.length }}</div>
        <ul class="also-list">
          <li v-for="other in connected" :key="other.id">
            <button type="button" @click="$emit('select', other.id)">
              <i :style="{ background: `var(--t-${other.type}, var(--page-bg-soft))` }"></i>
              <span>{{ other.title }}</span>
            </button>
          </li>
        </ul>
      </template>
    </template>

    <template v-else>
      <div class="kind"><span>everything</span><span>{{ counts.items }} items · {{ counts.tags }} tags</span></div>
    </template>
  </aside>
</template>

<style scoped>
.rail {
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;
  padding-top: 6px;
}

.kind {
  font-family: var(--page-sans);
  font-size: 12.5px;
  color: var(--page-dim);
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.kind-right { display: inline-flex; gap: 10px; align-items: baseline; }
.clear {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: var(--page-dim);
  cursor: pointer;
  transition: color 0.15s;
}
.clear:hover { color: var(--accent-blue); }
.kind .type { color: var(--page-ink); }
.kind .t-book { color: #a8830f; }
.kind .t-music { color: #5c3f9e; }
.kind .t-podcast { color: #6f4fb0; }
.kind .t-video { color: #2f6f9e; }
.kind .t-film { color: #1f5385; }
.kind .t-art { color: #2f8a55; }
.kind .t-post { color: #d2452c; }
.kind .t-paper { color: #8a6410; }

h3 {
  font-family: var(--page-serif);
  font-weight: 400;
  font-size: 18px;
  line-height: 1.3;
  letter-spacing: -0.008em;
  margin-top: 7px;
  color: var(--page-ink);
}
.by {
  font-style: italic;
  font-size: 13px;
  color: var(--page-dim);
  margin-top: 3px;
}
.note {
  font-size: 14px;
  line-height: 1.6;
  margin-top: 11px;
  color: var(--page-ink);
}
.tags {
  font-family: var(--page-sans);
  font-size: 12.5px;
  margin-top: 12px;
  color: var(--page-dim);
}
.tags button {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
  transition: color 0.15s;
}
.tags button:hover { color: var(--accent-blue); }
.tags .sep { margin: 0 4px; opacity: 0.5; }

.open {
  font-family: var(--page-sans);
  font-size: 13px;
  color: var(--accent-blue);
  text-decoration: none;
  margin-top: 12px;
  align-self: flex-start;
  padding: 0;
}
.open:hover { text-decoration: underline; }

hr {
  border: none;
  border-top: 1px solid var(--cool-hairline);
  margin: 20px 0 14px;
  width: 100%;
}
.also {
  font-family: var(--page-sans);
  font-size: 12.5px;
  font-weight: 500;
  color: var(--page-dim);
}
.also-list { list-style: none; margin-top: 7px; }
.also-list button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 3px 0;
  font: inherit;
  font-size: 12.5px;
  line-height: 1.4;
  color: var(--page-ink);
  text-align: left;
  cursor: pointer;
  transition: color 0.15s;
}
.also-list button:hover { color: var(--accent-blue); }
.also-list i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 1px solid var(--page-ink);
  flex: none;
}

</style>
