<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script> 

<template>
  <div class="greetings">
    <h1>{{ msg }}</h1>
      <span class="title">PhD Research Scientist</span><br>
      <span class="subtitle">Department of Linguistics,<br>The Ohio State University</span>
  </div>
  <!-- <div class="contact">
    <br />
    <h3>Contact</h3>

    <img alt="linkedin" class="icon" src="@/assets/linkedin.svg" /><a
      href="https://www.linkedin.com/in/sarakc/"
      target="_blank"
      rel="noopener"
      >LinkedIn</a><br />
      ✉️ court DOT 22 AT osu DOT edu
  </div> -->
</template>

<style scoped>
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
</style>
