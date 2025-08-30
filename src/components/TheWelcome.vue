<script setup>
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import ToolingIcon from "./icons/IconTooling.vue";
import EcosystemIcon from "./icons/IconEcosystem.vue";
import CommunityIcon from "./icons/IconCommunity.vue";
import SupportIcon from "./icons/IconSupport.vue";

</script>

<template>
  <WelcomeItem>
    <template #icon>
      <!-- <DocumentationIcon /> -->
      <i class="fa-solid fa-user"></i>
      <!-- <i class="fa-solid fa-user-astronaut" style="color: #B197FC;"></i> -->
      <!-- <font-awesome-icon :icon="['fas', 'user-astronaut']" style="color: #B197FC;" /> -->
    </template>
    <template #heading>About Me</template>

    I'm currently a
    <a href="https://linguistics.osu.edu/people/court.22" target="_blank" rel="noopener">PhD student</a>in the
    Department of Linguistics at The Ohio State University, co-advised by
    <!-- <a href="https://linguistics.osu.edu" target="_blank" rel="noopener">Department of Linguistics</a>at The Ohio State University, co-advised by -->
  <a href="https://linguistics.osu.edu/people/elsner.14" target="_blank" rel="noopener">Micha Elsner</a>
  and
  <a href="https://linguistics.osu.edu/people/sims.120" target="_blank" rel="noopener">Andrea Sims</a>.


  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Research</template>

    I'm a<RouterLink to="/research">computational contact morphologist</RouterLink>, among other things.
    <br/>I'm also a committed
    <a
      href="https://buildingmovement.org/wp-content/uploads/2022/04/Ecosystem-Guide-April-2022.pdf"
      target="_blank"
      rel="noopener"
      >weaver</a>
      <!-- according to the
      <a
      href="https://www.socialchangemap.com/framework"
      target="_blank"
      rel="noopener"
      >Social Change Ecosystem</a>framework -->
      -- I prioritize collaborative infrastructure building and resource development
      throughout<RouterLink to="/research">my work as a linguist</RouterLink>.
      <!-- and<RouterLink to="/projects">life</RouterLink> -->
      <!-- Learn more about my<RouterLink to="/research">research interests</RouterLink>. -->
    <br/>
    

  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Curriculum Vitae</template>

    You can download a copy of <RouterLink to="/CV">my CV</RouterLink>in .pdf format, or check out my
    <a
      href="https://scholar.google.com/citations?user=zi74VNEAAAAJ&hl"
      target="_blank"
      rel="noopener"
      >Google Scholar</a>page and
      <a
      href="https://www.linkedin.com/in/sarakc/"
      target="_blank"
      rel="noopener"
      >LinkedIn</a>profile for more information.
    
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Projects</template>
  To learn more about me irl, check out some of my<RouterLink to="/projects">passion projects</RouterLink>.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Contact</template>

      [l]<a
      href="https://www.linkedin.com/in/sarakc/"
      target="_blank"
      rel="noopener"
      >LinkedIn</a><br />
      [e] court DOT 22 AT osu DOT edu
  </WelcomeItem>
</template>
