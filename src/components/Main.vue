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
const updateList = (Type) => {
    
    if(list.value.length > 0 && Type === 'REMOVE'){
        list.value.pop();
    }else{
       if(name.value.trim() === '') return;
        list.value.push(name.value);
        name.value = '';
    }
}
</script>
<template> 
<br>
  <input type="text" v-model="name" placeholder="Enter your name"><br>
    <p>Your list:</p><br>
    <ul>
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
  <br>
  <button @click="updateList('ADD')">Add to List</button><br>
  <button @click="updateList('REMOVE')">Remove from List</button>
</template>
<style scoped>

</style>