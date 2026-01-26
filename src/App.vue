<script setup>
import WelcomeItem from './components/WelcomeItem.vue'
import IconAbout from './components/icons/IconAbout.vue'
import IconBrainNetwork from './components/icons/IconBrainNetwork.vue'
import PythonIcon from './components/icons/IconPython.vue'
import IconContact from './components/icons/IconContact.vue'
</script>

<template>
  <div>
  <header>
    <img alt="Colors" class="logo" src="@/assets/montana.jpg" />
    <div class="wrapper">
      <div class="greetings">
    <h1>Sara Court</h1>
      <span class="title">PhD Research Scientist</span><br>
      <span class="subtitle">Department of Linguistics,<br>The Ohio State University</span>
  </div>
      
    </div>
  </header>

  <WelcomeItem>
    <div class="tagline">Computational Linguist • Machine Learning Engineer • Data Analyst • Community Builder</div>
    <template #icon>
      <IconAbout />
    </template>
    
    
    <template #heading>About</template>
    
    I'm currently a
    <a href="https://linguistics.osu.edu/people/court.22" target="_blank" rel="noopener">PhD Candidate</a>in the
    <a href="https://linguistics.osu.edu/" target="_blank" rel="noopener">Linguistics Department</a>at<a href="https://linguistics.osu.edu/" target="_blank" rel="noopener">The Ohio State University.</a><a href="https://linguistics.osu.edu/people/elsner.14" target="_blank" rel="noopener">
    <br/>Micha Elsner</a>is my advisor. I'm a<a
      href="https://buildingmovement.org/wp-content/uploads/2022/04/Ecosystem-Guide-April-2022.pdf"
      target="_blank"
      rel="noopener"
      >Weaver</a>to my core and committed to<a href="https://create.nyu.edu/cogscidiy/" target="_blank" rel="noopener">fostering</a>
      <a href="https://docs.google.com/presentation/d/1Y0awbZV4GOCnW-fH4Ls7q_gpGkb5QUaKW40CBcKTTE8/edit?slide=id.p#slide=id.p" target="_blank" rel="noopener">inclusive AI</a><a href="https://docs.google.com/presentation/d/1IZ889fnGPOsdOHee9eArs8hfRm19TX5HDsNPGn7Tebc/edit?slide=id.g337cf7c6c86_0_310#slide=id.g337cf7c6c86_0_310" target="_blank" rel="noopener">development</a>.

      
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <IconBrainNetwork />
    </template>
    <template #heading>Research</template>
    
    I'm a<a href="https://aclanthology.org/2020.coling-main.258/" target="_blank" rel="noopener">computational morphologist,</a>among other things.
    I build and analyze<a href="https://aclanthology.org/2022.sigmorphon-1.22/" target="_blank" rel="noopener">models</a>for typologically diverse<a href="https://aclanthology.org/2023.scil-1.4.pdf" target="_blank" rel="noopener">languages in contact</a>and other <a href="https://docs.google.com/presentation/d/1iHJTTw4V7vCU4mJeAJWkUTKetmbyZOQHkHvWieAblMA/edit?slide=id.g337cf7c6c86_0_310#slide=id.g337cf7c6c86_0_310" target="_blank" rel="noopener">low-resource domains</a>with applications in<a href="https://aclanthology.org/2024.wmt-1.125/" target="_blank" rel="noopener">responsible machine translation</a>and tools for<a href="https://aclanthology.org/2022.computel-1.20/" target="_blank" rel="noopener">collaborative data annotation.</a>
    <br/>
    

  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <PythonIcon />
    </template>
    <template #heading>Resume</template>
    Check out my<a
      href="https://scholar.google.com/citations?user=zi74VNEAAAAJ&hl"
      target="_blank"
      rel="noopener"
      >Google Scholar</a>page and<a
      href="https://www.linkedin.com/in/sarakc/"
      target="_blank"
      rel="noopener"
      >LinkedIn</a>profile to learn more about the work that I do.
    <br/>Feel free to reach out via email to request an up-to-date <a href="/cv.pdf">resume | C.V.</a>in .pdf format.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <IconContact />
    </template>
    <template #heading>Contact</template>
    <img alt="osu" class="icon" src="@/assets/osu.ico" /> <a
      href="https://linguistics.osu.edu/people/court.22"
      target="_blank"
      rel="noopener"
      >Sara Court</a>
      <br/>
    <img alt="linkedin" class="icon" src="@/assets/linkedin.svg" /> <a
      href="https://www.linkedin.com/in/sarakc/"
      target="_blank"
      rel="noopener"
      >LinkedIn</a>   
      <img alt="github" class="icon" src="@/assets/github.svg"/><a href="https://github.com/sarakc" target="_blank" rel="noopener">GitHub</a><br />
      ✉️  <a href="mailto:court.22@osu.edu">court DOT 22 AT osu DOT edu</a>
  </WelcomeItem> 
  </div>
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
/* from HelloWorld.vue */
  h1 {
  font-weight: 600;
  font-size: 2.5rem;
  /* position: relative; */
  /* top: -10px; */
}
h3 {
  font-size: 1.2rem;
  font-weight: 600;
}

.greetings {
  text-align: center;
}

.subtitle {
  font-size: 20px;
}

.title {
  font-size: 18px;
  font-weight: 600;
}

@media (min-width: 1024px) {
  h1 {
    font-size: 1.65rem;
    text-align: left;
  }
  h3 {
    text-align: left;
  }
  .greetings {  
    text-align: left;
    padding-top: 1rem;
  }
  .subtitle {
    font-size: 1rem;
  }
  .title {
    font-size: 1.1rem;
  }
}
}
</style>