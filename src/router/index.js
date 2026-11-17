import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/components/HomeView.vue'
import ThreadsView from '@/components/ThreadsView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/threads', name: 'threads', component: ThreadsView },
  ],
  /* A new page starts at the top. A query change on the same page — /threads
     writing ?item= as you pin — keeps the scroll where it is. */
  scrollBehavior(to, from) {
    if (to.path === from.path) return false
    return { top: 0 }
  },
})

export default router
