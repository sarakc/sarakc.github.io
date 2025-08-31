<script setup>
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import ToolingIcon from "./icons/IconTooling.vue";
import PythonIcon from "./icons/IconPython.vue";
import IconBrainNetwork from "./icons/IconBrainNetwork.vue";
import IconAbout from "./icons/IconAbout.vue";
import IconContact from "./icons/IconContact.vue";
import EcosystemIcon from "./icons/IconEcosystem.vue";
import CommunityIcon from "./icons/IconCommunity.vue";
import SupportIcon from "./icons/IconSupport.vue";

</script>

<template>
  <!-- <nav class="nav"> -->
        <!-- <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/research">Research</RouterLink>
        <RouterLink to="/CV">CV</RouterLink> -->
        <!-- <RouterLink to="/projects">Projects</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink> -->
      <!-- </nav> -->
  <WelcomeItem>
    <div class="tagline">Computational Linguist • Machine Learning Engineer • Data Analyst • Community Builder</div>
    <template #icon>
      <!-- <DocumentationIcon /> -->
      <IconAbout />
      <!-- <i class="fa-solid fa-user-astronaut" style="color: #B197FC;"></i> -->
      <!-- <font-awesome-icon :icon="['fas', 'user-astronaut']" style="color: #B197FC;" /> -->
    </template>
    
    
    <template #heading>About</template>
    
    I'm currently a
    <a href="https://linguistics.osu.edu/people/court.22" target="_blank" rel="noopener">PhD Candidate</a>in the
    <a href="https://linguistics.osu.edu/" target="_blank" rel="noopener">Linguistics Department</a>at<a href="https://linguistics.osu.edu/" target="_blank" rel="noopener">The Ohio State University.</a><a href="https://linguistics.osu.edu/people/elsner.14" target="_blank" rel="noopener">
    <br/>Micha Elsner</a>is my advisor.
  </WelcomeItem>
  

  <WelcomeItem>
    <template #icon>
      <IconBrainNetwork />
    </template>
    <template #heading>Research</template>
    
    <!-- I'm a<RouterLink to="/research">computational contact morphologist</RouterLink>, among other things. -->
    I'm a<a href="https://aclanthology.org/2020.coling-main.258/" target="_blank" rel="noopener">computational morphologist</a>, among other things.
    I build and analyze models for typologically diverse languages in contact and other low-resource domains, with applications in machine translation and collaborative annotation.
    <!-- <br/> -->
    <!-- If you can't already tell,  -->
    I'm also an avid<a
      href="https://buildingmovement.org/wp-content/uploads/2022/04/Ecosystem-Guide-April-2022.pdf"
      target="_blank"
      rel="noopener"
      >Weaver</a> and passionate about science outreach.
      <!-- and am committed to inclusive and responsible AI development. -->
    <!-- <br/><br/> -->
    <!-- a dedicated<a
      href="https://buildingmovement.org/wp-content/uploads/2022/04/Ecosystem-Guide-April-2022.pdf"
      target="_blank"
      rel="noopener"
      >Weaver</a>. -->
      <!-- in my community's<a
      href="https://www.socialchangemap.com/framework"
      target="_blank"
      rel="noopener"
      >Social Change Ecosystem.</a> -->
      <!-- -- I prioritize collaborative infrastructure building and resource development -->
      <!-- throughout<RouterLink to="/research">my work as a linguist</RouterLink>. -->
      <!-- and<RouterLink to="/projects">life</RouterLink> -->
      <!-- Learn more about my<RouterLink to="/research">research interests</RouterLink>. -->
    <br/>
    

  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <PythonIcon />
    </template>
    <template #heading>Resume</template>

    <!-- You can download a copy of<RouterLink to="/CV">my CV</RouterLink>in .pdf format, or c -->
    Check out my<a
      href="https://scholar.google.com/citations?user=zi74VNEAAAAJ&hl"
      target="_blank"
      rel="noopener"
      >Google Scholar</a>page and<a
      href="https://www.linkedin.com/in/sarakc/"
      target="_blank"
      rel="noopener"
      >LinkedIn</a>profile to learn more about the work that I do.
    <br/>Feel free to reach out via email for an up-to-date resume or C.V. in .pdf format.
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
      >LinkedIn</a><br />
      ✉️  court DOT 22 AT osu DOT edu
  </WelcomeItem>

  <!-- <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Projects</template>
  </WelcomeItem> -->

</template>

<style scoped>
.nav {
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 9rem;
  font-size: 23px;
  /* background-color: #f0f0f0; */
  border-radius: 0.5rem;
}
.icon {
  height: .8em;
  width: .9em;
}
.tagline {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: .4rem;
}
</style>
