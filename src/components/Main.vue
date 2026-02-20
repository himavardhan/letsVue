<script setup >
import {ref} from 'vue';

let number = ref(0);
let list = ref(['hima','vardhan','reddy','donuru','kumar']);
let name = ref();
const changeNumber = (Type) => {
    if(Type === 'decrease') 
    {number.value--;}   
    else{
    number.value++;
     }
}   
const updateList = () => {
    if(name.value.trim() === '') return;
    list.value.push(name.value);
    name.value = '';
}
</script>
<template> 
  <h1>Counter: {{ number }}</h1>
  <input type="text" v-model="name" placeholder="Enter your name">
    <p>Your name is: {{ name }}</p>
    <ul>
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>

  <button @click="updateList()">Add to List</button>
  <button @click="changeNumber('increase')">Increase</button>
  <button @click="changeNumber('decrease')">Decrease</button>
</template>
<style scoped>

</style>