<script setup>
import { ref } from 'vue';

let name = ref('Guest 3')
const emoji = ref('👋')
</script>

<template>
  <header>
     <span>{{ emoji }}</span>
  </header>
    <br>
  <h1>Let's Vue! Hello , {{ name }}</h1>
</template>

<style scoped>
header {
  font-size: 2rem;
  text-align: center;
  margin-top: 2rem;
  width: 100%;
}

h1 {
  text-align: center;
  color: #42b983;
  width: 100%;
}
</style>