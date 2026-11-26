<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TagChips from './threads/TagChips.vue'
import ItemCard from './threads/ItemCard.vue'
import GraphView from './threads/GraphView.vue'
import DetailLine from './threads/DetailLine.vue'
import SearchBox from './threads/SearchBox.vue'
import { describeReasons } from './threads/similarity.mjs'
import { findOrbits, splitWorks, titleKey } from './threads/orbits.mjs'
import { orderTags } from './threads/tags.mjs'
import { isFiltered, escapeStep } from './threads/filters.mjs'
import { isMine } from './threads/types.mjs'
import { cvGroups } from './threads/cvgroups.mjs'

/* "Ink" (decided 2026-11-15): no heading, no counts, no type cards, no rail.
   One line of topic words, the graph, and one line of detail under it that
   appears on hover or selection. See DESIGN.md. */

const route = useRoute()
const router = useRouter()
const items = ref([])
/* Similarity edges, built offline by `npm run build-similarity`. Null when the
   collection has none; the graph then falls back to shared tags. */
const pairs = ref(null)
/* The collection's own tag settings: primary tags and display labels. */
const tagMeta = ref({})
const activeTag = ref(null)
/* Everything is on show by default. One wordless switch narrows it to
   Sara's own CV work (isMine). It appears only when the collection holds
   anything else. */
const researchOnly = ref(false)
const view = ref('graph')
const selectedId = ref(null)
const hoveredId = ref(null)
const isNarrow = ref(false)
const isPreview = ref(false)
const loadFailed = ref(false)

/* The graph takes the rest of the window and no more; it zooms instead. */
const canvas = ref(null)
const canvasHeight = ref(0)
function measureCanvas() {
  if (!canvas.value) return
  const top = canvas.value.getBoundingClientRect().top + window.scrollY
  canvasHeight.value = Math.max(420, Math.floor(window.innerHeight - top - 20))
}

let mq = null
function onChange(e) { isNarrow.value = e.matches }

/* The topic line grows when "more" opens (or the active topic joins it past
   the cut), which pushes the canvas down: remeasure whenever it changes size. */
const controlsEl = ref(null)
let controlsRo = null

/* `/` opens search, unless you are typing somewhere already. */
const searchOpen = ref(false)
const peekId = ref(null)
function isTyping(el) {
  return el instanceof Element && Boolean(el.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])'))
}
function openSearch() {
  if (inGraph.value) searchOpen.value = true
}
function closeSearch({ restoreFocus = false } = {}) {
  searchOpen.value = false
  peekId.value = null
  if (restoreFocus) nextTick(() => canvas.value?.querySelector('.stage')?.focus())
}
function onPick(id) {
  closeSearch()
  revealAndPin(id)
  nextTick(() => canvas.value?.querySelector('.stage')?.focus())
}

function onKey(e) {
  if (e.key === 'Escape') {
    const step = escapeStep({ pinned: Boolean(selectedId.value), filtered: hasFilter.value, typing: isTyping(e.target) })
    if (step === 'unpin') selectedId.value = null
    else if (step === 'clear') clearFilters()
  } else if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey && !searchOpen.value && !isTyping(e.target) && inGraph.value) {
    e.preventDefault()
    openSearch()
  }
}

onMounted(() => {
  mq = window.matchMedia('(max-width: 860px)')
  isNarrow.value = mq.matches
  mq.addEventListener('change', onChange)
  window.addEventListener('keydown', onKey)
  window.addEventListener('resize', measureCanvas)
  measureCanvas()
  controlsRo = new ResizeObserver(() => measureCanvas())
  if (controlsEl.value) controlsRo.observe(controlsEl.value)
})

onBeforeUnmount(() => {
  mq?.removeEventListener('change', onChange)
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('resize', measureCanvas)
  controlsRo?.disconnect()
})

/* Draft collections, development only: ?preview=<name>. drafts/ is
   gitignored, so it is never bundled or published, and a fresh clone may
   not have it. The dev server hands its files out at /__drafts/
   (vue.config.js); a draft that isn't there is a 404, and the page shows the
   live items instead. The ternary and the `development &&` below keep all
   of it out of the production build: webpack drops the dead branches. */
const PREVIEWS = process.env.NODE_ENV === 'development' ? {
  papers: { label: 'papers linked from HomeView.vue', file: 'threads-paper-candidates' },
  research: { label: 'research atlas drafted from the CV', file: 'threads-research' },
} : {}
const previewLabel = ref('')

const loading = ref(false)

/* A draft and its similarity file (optional, as for the live items), or
   null when the draft isn't in drafts/. */
async function loadDraft({ file }) {
  const get = async url => {
    try {
      const res = await fetch(url)
      return res.ok ? await res.json() : null
    } catch { return null }
  }
  const [data, similarity] = await Promise.all([get(`/__drafts/${file}.json`), get(`/__drafts/${file}.similarity.json`)])
  if (data && Array.isArray(data.items)) return { data, similarity }
  console.info(`drafts/${file}.json isn't here; showing the live items`)
  return null
}

async function loadItems(preview) {
  loading.value = true
  loadFailed.value = false
  try {
    let data
    let similarity = null
    let draft = null
    if (process.env.NODE_ENV === 'development' && Object.hasOwn(PREVIEWS, preview || '') &&
        (draft = await loadDraft(PREVIEWS[preview]))) {
      data = draft.data
      similarity = draft.similarity
      isPreview.value = true
      previewLabel.value = PREVIEWS[preview].label
    } else {
      const res = await fetch('./threads/items.json')
      if (!res.ok) throw new Error(`items request failed: ${res.status}`)
      data = await res.json()
      isPreview.value = false
      try {
        const simRes = await fetch('./threads/items.similarity.json')
        similarity = simRes.ok ? await simRes.json() : null
      } catch { similarity = null }
    }
    pairs.value = similarity?.edges || null
    tagMeta.value = data.tags && typeof data.tags === 'object' ? data.tags : {}
    items.value = (data.items || [])
      .slice()
      .sort((a, b) => (b.year || 0) - (a.year || 0) || (b.added || '').localeCompare(a.added || ''))
    /* Pin a linked item in the same tick the items arrive, so the graph lays
       out and frames them together — no fly-in. */
    loading.value = false
    pinFromUrl()
  } catch {
    items.value = []
    pairs.value = null
    isPreview.value = false
    loadFailed.value = true
  }
  loading.value = false
}

/* Draft data is deliberately available only to the development build. The
   production compiler removes the branch that fetches it. */
watch(() => route.query.preview, preview => {
  activeTag.value = null
  selectedId.value = null
  loadItems(preview)
}, { immediate: true })

const hasBothRealms = computed(() =>
  items.value.some(isMine) && items.value.some(i => !isMine(i)))
const inRealm = i => !researchOnly.value || isMine(i)
const realmItems = computed(() => items.value.filter(inRealm))
watch(hasBothRealms, both => { if (!both) researchOnly.value = false })
/* A topic only the rest of the collection uses would filter to nothing. */
watch(researchOnly, () => {
  if (activeTag.value && !realmItems.value.some(i => (i.tags || []).includes(activeTag.value))) activeTag.value = null
})

const tagOrder = computed(() => orderTags(realmItems.value, tagMeta.value.primary || []))
const allTags = computed(() => tagOrder.value.tags)

/* In the list, a talk shares its paper's title; the venue tells them apart. */
const repeatedTitles = computed(() => {
  const seen = new Map()
  for (const i of items.value) seen.set(titleKey(i.title), (seen.get(titleKey(i.title)) || 0) + 1)
  return new Set([...seen].filter(([, n]) => n > 1).map(([k]) => k))
})

const filtered = computed(() =>
  realmItems.value.filter(i => !activeTag.value || (i.tags || []).includes(activeTag.value))
)
/* The list reads like the CV: its sections in its order, newest first. */
const listGroups = computed(() => cvGroups(filtered.value))

/* A talk or poster with its paper's title orbits the paper: the graph lays
   out works, and draws each work's satellites around it (orbits.mjs). Which
   items orbit is decided on the whole collection, never on a filter; under a
   topic only the talk carries, it stands on its own. */
const orbits = computed(() => findOrbits(items.value))
const split = computed(() => splitWorks(filtered.value, orbits.value))
const works = computed(() => split.value.works)

/* Every work goes to the graph; how much of it is on show follows the zoom
   (GraphView). Each work's satellites go with it and are drawn when it is. */
/* A filter can strand the selection outside the visible set. (Zooming out
   never does: a pin and its links stay on show at every zoom.) */
const visible = computed(() => (view.value === 'graph' && !isNarrow.value
  ? [...works.value, ...[...split.value.satellites.values()].flat()]
  : filtered.value))
watch(visible, list => {
  if (selectedId.value && !list.some(i => i.id === selectedId.value)) selectedId.value = null
})

/* Anything that moves the canvas down the page changes how much room it has. */
watch([isPreview, loadFailed, view, isNarrow, allTags], () => nextTick(measureCanvas))

const byId = computed(() => new Map(items.value.map(i => [i.id, i])))
/* Pointing at an item, or arrowing to it in search, previews it. */
const lookId = computed(() => hoveredId.value || peekId.value)
const shownItem = computed(() => byId.value.get(lookId.value || selectedId.value) || null)
/* Hovering something else while an item is pinned previews it, quieter. */
const isPreviewing = computed(() =>
  Boolean(lookId.value && selectedId.value && lookId.value !== selectedId.value)
)

/* Why the hovered item is linked to the pinned one: only when the graph
   draws a line between them (GraphView's `links`), and for a talk, the line
   is its paper's. The similarity file holds up to eight candidates per item,
   but each item draws only its best few. */
const drawnLinks = ref([])
const linkIndex = computed(() => {
  const m = new Map()
  for (const l of drawnLinks.value) m.set(`${l.source}|${l.target}`, l).set(`${l.target}|${l.source}`, l)
  return m
})
const familyOf = computed(() => {
  const m = new Map()
  for (const [parent, list] of split.value.satellites) for (const i of list) m.set(i.id, parent)
  return m
})
const linkReason = computed(() => {
  if (!isPreviewing.value) return ''
  const fam = id => familyOf.value.get(id) || id
  const l = linkIndex.value.get(`${fam(selectedId.value)}|${fam(lookId.value)}`)
  return l ? describeReasons(l.reasons).join(' · ') : ''
})

/* ── one item, by link ─────────────────────────────────────────────────
   `#/threads?item=<id>` opens the page with that item pinned and framed.
   Pinning writes the id into the URL and unpinning removes it, in place:
   history doesn't grow, so Back leaves the page. */

const inGraph = computed(() => view.value === 'graph' && !isNarrow.value)

/* Make an item visible, then pin it: clear a topic or realm that hides it,
   then pin. (A talk whose paper a topic hides is drawn on its own, so only
   the item itself matters.) The graph keeps a pin on show at every zoom and
   frames it itself. Search uses this too. */
function revealAndPin(id) {
  const item = byId.value.get(id)
  if (!item) return false
  if (!inRealm(item)) researchOnly.value = false
  if (activeTag.value && !(item.tags || []).includes(activeTag.value)) activeTag.value = null
  selectedId.value = id
  if (!inGraph.value) {
    nextTick(() => document.querySelector(`.listing [data-id="${CSS.escape(id)}"]`)?.scrollIntoView({ block: 'center' }))
  }
  return true
}

function pinFromUrl() {
  const id = route.query.item
  if (!id || typeof id !== 'string' || id === selectedId.value) return
  if (!revealAndPin(id)) {
    const query = { ...route.query }
    delete query.item
    router.replace({ query })
  }
}
/* A link pasted into an already open page, or `item=` deleted from the
   address bar, which unpins. Our own replace never loops: it only runs when
   the URL and the pin disagree. */
watch(() => route.query.item, id => {
  if (loading.value) return
  if (id) pinFromUrl()
  else selectedId.value = null
})

watch(selectedId, id => {
  if (loading.value) return
  if ((id || undefined) === route.query.item) return
  const query = { ...route.query }
  if (id) query.item = id
  else delete query.item
  router.replace({ query })
})

function toggleTag(tag) {
  activeTag.value = activeTag.value === tag ? null : tag
}

/* `all` shows only while something is filtered, and takes it all off: the
   topic and research-only. The pin and the view stay. It vanishes once
   used, so keyboard focus moves on to the first topic word. */
const hasFilter = computed(() => isFiltered({ tag: activeTag.value, researchOnly: researchOnly.value }))
const allEl = ref(null)
function clearFilters() {
  const hadFocus = Boolean(allEl.value) && document.activeElement === allEl.value
  activeTag.value = null
  researchOnly.value = false
  if (hadFocus) nextTick(() => controlsEl.value?.querySelector('.topics button')?.focus())
}

function toggleRow(id) {
  selectedId.value = selectedId.value === id ? null : id
}
</script>

<template>
  <div class="threads-page" :class="{ fills: !isNarrow && view === 'graph' }">
    <h1 class="sr-only">Threads</h1>

    <p v-if="isPreview" class="preview-notice">
      <strong>Draft preview:</strong> {{ previewLabel }}
      <router-link to="/threads">use regular items</router-link>
    </p>

    <p v-if="loadFailed" class="load-error">
      The collection could not be loaded. Try refreshing the page.
    </p>

    <header ref="controlsEl" class="controls">
      <div class="topline">
        <button v-if="hasFilter" ref="allEl" type="button" class="all" @click="clearFilters">all</button>
        <TagChips :tags="allTags" :active="activeTag" :lead="tagOrder.primaryCount"
                  :labels="tagMeta.labels || {}" @toggle="toggleTag" />
      </div>
      <button
        v-if="hasBothRealms"
        type="button"
        class="realm"
        :aria-pressed="researchOnly"
        aria-label="Research only"
        @click="researchOnly = !researchOnly"
      >
        <svg width="20" height="12" viewBox="0 0 20 12" aria-hidden="true">
          <circle class="own" cx="5" cy="6" r="3.4" />
          <circle class="rest" cx="14.5" cy="6" r="3.4" />
        </svg>
      </button>
      <span v-if="!isNarrow" class="views">
        <button type="button" :aria-pressed="view === 'graph'" @click="view = 'graph'">network</button>
        <button type="button" :aria-pressed="view === 'list'" @click="view = 'list'">list</button>
      </span>
    </header>

    <section v-if="!isNarrow && view === 'graph'" ref="canvas" class="canvas"
             :style="canvasHeight ? { height: `${canvasHeight}px` } : null">
      <GraphView
        :items="works"
        :satellites="split.satellites"
        :pairs="pairs"
        :selected-id="selectedId"
        :peek-id="peekId"
        @select="id => selectedId = id"
        @hover="id => hoveredId = id"
        @links="list => drawnLinks = list"
      >
        <template #controls>
          <button
            type="button"
            class="find"
            :aria-pressed="searchOpen"
            aria-label="Find (/)"
            title="Find (/)"
            @mousedown.prevent
            @click="searchOpen ? closeSearch() : openSearch()"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <circle cx="6" cy="6" r="4.2" />
              <line x1="9.1" y1="9.1" x2="12.6" y2="12.6" />
            </svg>
          </button>
        </template>
      </GraphView>
      <DetailLine
        :item="shownItem"
        :pinned="Boolean(selectedId)"
        :preview="isPreviewing"
        :reason="linkReason"
      />
      <SearchBox
        v-if="searchOpen"
        class="search-box"
        :items="items"
        @pick="onPick"
        @peek="id => peekId = id"
        @close="opts => closeSearch(opts)"
      />
    </section>

    <section v-if="isNarrow || view === 'list'" class="listing">
      <section v-for="group in listGroups" :key="group.id" class="group" :aria-labelledby="`group-${group.id}`">
        <h2 :id="`group-${group.id}`" class="group-name">{{ group.label }}</h2>
        <ItemCard
          v-for="item in group.items"
          :key="item.id"
          :data-id="item.id"
          :item="item"
          :show-venue="repeatedTitles.has(titleKey(item.title))"
          :open="item.id === selectedId"
          @toggle="toggleRow"
        />
      </section>
      <p v-if="filtered.length === 0" class="empty">nothing here yet</p>
    </section>
  </div>
</template>

<style scoped>
.threads-page {
  font-family: var(--page-sans);
  font-size: 15px;
  line-height: 1.55;
  color: var(--page-ink);
  background: var(--page-bg);
  max-width: var(--page-max);
  margin: 0 auto;
  padding: 40px var(--page-gutter) 120px;
  text-align: left;
  min-height: 100vh;
}
/* With the graph on show the page is exactly one window tall. */
.threads-page.fills { padding-bottom: 0; min-height: 0; }

/* The page keeps a heading for screen readers; sighted visitors don't need one. */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

.preview-notice,
.load-error {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  margin: 0 0 24px;
  padding: 9px 12px;
  border: 1px solid var(--cool-hairline);
  border-left: 3px solid var(--accent-blue);
  background: var(--page-bg-soft);
  font-size: 13px;
  color: var(--page-dim);
}
.preview-notice strong { color: var(--page-ink); font-weight: 600; }
.preview-notice a { white-space: nowrap; }
.load-error { border-left-color: var(--t-post); color: var(--page-ink); }

.controls {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 32px;
}
.topline {
  display: flex;
  align-items: baseline;
  gap: 20px;
  min-width: 0;
}
/* Sits outside the topic line's sideways scroll, so it stays put on a phone. */
.all {
  flex: none;
  background: none;
  border: none;
  border-bottom: 1px solid transparent;
  padding: 2px 0;
  font-family: var(--page-sans);
  font-size: 13px;
  color: var(--page-dim);
  cursor: pointer;
  transition: color 0.15s;
}
.all:hover { color: var(--page-ink); }
.views { display: inline-flex; gap: 16px; flex: none; font-size: 13px; }
.views button {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: var(--page-dim);
  cursor: pointer;
  transition: color 0.15s;
}
.views button:hover { color: var(--page-ink); }
.views button[aria-pressed="true"] { color: var(--page-ink); }
/* Two dots, the graph's own marks: ink for CV work, colour for the rest.
   Pressed, the coloured dot empties: research only. No words. */
.realm {
  margin-left: auto;
  align-self: center;
  display: inline-flex;
  align-items: center;
  padding: 2px;
  background: none;
  border: none;
  cursor: pointer;
  line-height: 0;
}
.realm svg { display: block; }
.realm .own { fill: var(--page-ink); }
.realm .rest {
  fill: var(--t-book);
  stroke: var(--page-dim);
  stroke-width: 0;
  transition: fill 0.2s, stroke-width 0.2s;
}
.realm[aria-pressed="true"] .rest { fill: transparent; stroke-width: 0.9; }
.realm:hover .rest { stroke: var(--page-ink); stroke-width: 0.9; }
.realm:focus-visible { outline: 1px solid var(--accent-blue); outline-offset: 2px; }

.canvas {
  position: relative;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
/* Search floats over the graph's top left corner while it's open. */
.search-box {
  position: absolute;
  top: 6px;
  left: 0;
  z-index: 2;
}

/* The magnifier sits before the zoom, in the same quiet strip. */
.find {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
}
.find svg { fill: none; stroke: var(--page-dim); stroke-width: 1.2; stroke-linecap: round; transition: stroke 0.15s; }
.find:hover svg,
.find[aria-pressed="true"] svg { stroke: var(--page-ink); }
.find:focus-visible { outline: 1px solid var(--accent-blue); outline-offset: 1px; }
.canvas > :first-child { flex: 1; min-height: 0; }

.listing { margin-top: 8px; }
.group-name {
  margin: 0;
  padding: 36px 0 10px;
  border-bottom: 1px solid var(--cool-hairline);
  font-family: var(--page-sans);
  font-size: 12.5px;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: var(--page-dim);
}
.group:first-child .group-name { padding-top: 16px; }

.empty {
  font-family: var(--page-sans);
  font-size: 14px;
  color: var(--page-dim);
  padding: 40px 0;
  text-align: center;
}

@media (max-width: 860px) {
  .threads-page { padding: 32px var(--page-gutter) 90px; }
  .preview-notice { display: block; }
  .preview-notice a { display: block; margin-top: 4px; }
  .listing { margin-top: 4px; }
  .group-name { padding-top: 28px; }
}
</style>
