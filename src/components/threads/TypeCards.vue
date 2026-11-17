<script setup>
/* One card per kind of item present in the collection. Colour is the same
   --t-<type> token the graph and list use, so the row doubles as the key.
   Click filters to that type; click again clears. */
defineProps({
  types: { type: Array, required: true },   // [{ type, count }]
  active: { type: String, default: null },
})

defineEmits(['toggle'])
</script>

<template>
  <div class="cards" role="group" aria-label="Filter by kind">
    <button
      v-for="t in types"
      :key="t.type"
      class="card"
      :class="{ on: active === t.type }"
      :aria-pressed="active === t.type"
      @click="$emit('toggle', active === t.type ? null : t.type)"
    >
      <i :style="{ background: `var(--t-${t.type}, var(--page-bg-soft))` }"></i>
      <span class="name">{{ t.type }}</span>
      <span class="count">{{ t.count }}</span>
    </button>
  </div>
</template>

<style scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 18px 0 20px;
}
.card {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--page-sans);
  font-size: 13px;
  padding: 9px 13px 9px 11px;
  border: 1px solid var(--cool-hairline);
  border-radius: 3px;
  background: transparent;
  color: var(--page-ink);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}
.card:hover { border-color: var(--accent-blue); }
.card.on {
  border-color: var(--page-ink);
  background: var(--page-bg-soft);
}
.card i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 1px solid var(--page-ink);
  flex: none;
}
.card .count {
  color: var(--page-dim);
  font-variant-numeric: tabular-nums;
}
.card.on .count { color: var(--page-ink); }
</style>
