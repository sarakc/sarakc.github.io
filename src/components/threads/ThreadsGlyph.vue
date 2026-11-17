<script setup>
/* The way in: a small constellation at the end of the top menu, after cv —
   four dots on three threads, a tree rather than a closed shape, so it reads
   as a drawing of the thing it opens. Sara's pick, 2026-11-16 (from
   strand, brushstroke, loop, stitch, needle, ∴ and weave; it replaced a
   pentagon in the bottom-right corner). Quiet as the menu words at rest,
   blue on touch like them. */
</script>

<template>
  <router-link to="/threads" class="threads-glyph" title="Threads" aria-label="Threads">
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
      <path class="threads" d="M4 15 L10 8 L17.5 11 L20.5 4.5 M10 8 L12.5 19" />
      <g class="stars">
        <circle class="hub" cx="10" cy="8" r="2.3" />
        <circle cx="4" cy="15" r="1.7" />
        <circle cx="17.5" cy="11" r="1.7" />
        <circle cx="20.5" cy="4.5" r="1.5" />
        <circle cx="12.5" cy="19" r="1.5" />
      </g>
    </svg>
  </router-link>
</template>

<style scoped>
.threads-glyph {
  display: inline-flex;
  align-items: center;
  line-height: 0;
  color: var(--page-ink);
}
.threads-glyph svg { display: block; overflow: visible; }
.threads {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.3;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.6;
  transition: opacity 0.2s;
}
.stars circle { fill: currentColor; }
.hub { transition: r 0.2s; }

.threads-glyph:hover,
.threads-glyph:focus-visible { color: var(--accent-blue); }
.threads-glyph:hover .threads,
.threads-glyph:focus-visible .threads { opacity: 1; }
.threads-glyph:hover .hub { r: 2.8; }

@media (prefers-reduced-motion: reduce) {
  .threads, .hub { transition: none; }
}
</style>
