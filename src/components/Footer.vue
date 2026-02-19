<script setup>
import {ref} from 'vue';
const year = ref(2015)

</script>

<template>
  <footer>
    <p> @ {{ year }}</p>
  </footer>
</template> 

<style scoped>
footer {
  margin-top: 2rem;
  font-size: 0.875rem;
  color: #555;
  position: fixed;
  bottom: 0;
  text-align: center;
  left: 0;
  right: 0;
}

footer p {
  color: blue;
  }

</style>