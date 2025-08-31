<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Colors" class="logo" src="@/assets/montana.jpg" />
    <div class="wrapper">
      <HelloWorld msg="Sara Court"/>
      
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* place-items: center; */
  /* max-height: 100vh; */
}

.logo {
  /* display: block; */
  max-width: 200px;
  max-height: auto;
  width: 100%;
  margin-bottom: 2rem;
  /* margin: 0 auto 2rem; */
}


nav {
  width: 100%;
  font-size: 23px;
  font-weight: 600;
  text-align: center;
  margin-top:4rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    /* display: flex; */
    /* flex-direction: row; */
    padding-top: 40px;
    align-items: flex-start;
    padding-right: calc(var(--section-gap) / 2);
    padding-left: 115px;
    padding-bottom: 40px;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>