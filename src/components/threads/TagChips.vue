<script setup>
/* The topic line: tags as plain words — the collection's primary tags
   first, then the rest by use (tags.mjs). The active one is underlined and
   carries a ×; clicking it again clears the filter. */
import { ref, computed } from 'vue'
import { tagLabel } from './tags.mjs'

const props = defineProps({
  tags: { type: Array, required: true },
  active: { type: String, default: null },
  /* How many lead tags show before `more`: the primary ones, when there are. */
  lead: { type: Number, default: 0 },
  labels: { type: Object, default: () => ({}) },
})

defineEmits(['toggle'])

const expanded = ref(false)
const VISIBLE = computed(() => props.lead || 8)

/* The active tag stays visible even if it would sit past the cut. */
const shown = computed(() => {
  if (expanded.value) return props.tags
  const head = props.tags.slice(0, VISIBLE.value)
  return props.active && !head.includes(props.active) ? [...head, props.active] : head
})
const remaining = computed(() => Math.max(0, props.tags.length - VISIBLE.value))
</script>

<template>
  <nav class="topics" aria-label="Topics">
    <button
      v-for="tag in shown"
      :key="tag"
      type="button"
      :class="{ active: active === tag }"
      :aria-pressed="active === tag"
      @click="$emit('toggle', tag)"
    >{{ tagLabel(tag, labels) }}</button>
    <button v-if="!expanded && remaining > 0" type="button" class="more" @click="expanded = true">more</button>
    <button v-if="expanded && remaining > 0" type="button" class="more" @click="expanded = false">less</button>
  </nav>
</template>

<style scoped>
.topics {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 20px;
  min-width: 0;
  font-family: var(--page-sans);
  font-size: 13px;
}
button {
  background: none;
  border: none;
  border-bottom: 1px solid transparent;
  padding: 2px 0;
  font: inherit;
  color: var(--page-dim);
  cursor: pointer;
  transition: color 0.15s;
}
button:hover { color: var(--page-ink); }
button.active { color: var(--page-ink); border-bottom-color: var(--page-ink); }
button.active::after { content: " ×"; color: var(--page-dim); }
.more { color: var(--page-dim); opacity: 0.7; }

@media (max-width: 860px) {
  .topics { flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; }
  .topics::-webkit-scrollbar { display: none; }
  button { flex: none; }
}
</style>
