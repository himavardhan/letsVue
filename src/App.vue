<script setup>
import  IntroToVue  from '@/components/IntroToVue.vue'
import { ref } from 'vue';
import Header  from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Main from '@/components/Main.vue';
let name = ref('Guest')
const year = ref(2014)

</script>

<template>
  <Header/>  

  <!-- <IntroToVue /> -->
  <Main/>

  <Footer/>
  
</template>

<style scoped>






</style>
