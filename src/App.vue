<template>
  <nav class="site-nav">
    <router-link v-if="$route.name === 'threads'" to="/" class="back">← website</router-link>
    <router-link v-else to="/" exact-active-class="is-active">home</router-link>
    <a href="/cv.pdf" target="_blank" rel="noopener">cv</a>
    <ThreadsGlyph v-if="$route.name !== 'threads'" />
  </nav>
  <router-view />
</template>

<script>
import ThreadsGlyph from './components/threads/ThreadsGlyph.vue'

export default {
  name: 'App',
  components: { ThreadsGlyph },
}
</script>

<style>
.site-nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 18px;
  max-width: var(--page-max);
  margin: 0 auto;
  padding: 14px var(--page-gutter) 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 13px;
  letter-spacing: 0.02em;
}
.site-nav a {
  color: var(--page-ink);
  opacity: 0.6;
  text-decoration: none;
  transition: color 0.15s, opacity 0.15s;
}
.site-nav a:hover {
  color: var(--accent-blue);
  opacity: 1;
}
/* The door to Threads: the menu's own opacity, blue on touch. */
.site-nav .threads-glyph { opacity: 0.6; transition: opacity 0.15s; }
.site-nav .threads-glyph:hover,
.site-nav .threads-glyph:focus-visible { opacity: 1; }
/* On /threads the way home sits at the left of the same line as cv. */
.site-nav a.back { margin-right: auto; }
/* The home page is one window tall, menu included: the page takes what the
   menu leaves, so there is never a scroll bar when the content fits. */
@supports selector(:has(a)) {
  #app:has(> .home-page) {
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }
  #app:has(> .home-page) > * { width: 100%; }
  #app:has(> .home-page) > .site-nav { flex: none; }
  #app:has(> .home-page) > .home-page { flex: 1 0 auto; min-height: 0; }
}
.site-nav a.is-active {
  color: var(--accent-blue);
  opacity: 1;
}
</style>
