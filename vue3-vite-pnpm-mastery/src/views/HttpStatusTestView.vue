<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';


const myData = ref(null)
axios.get('/api/v1/http-status/tests')
  .then(response => {
        console.log(`response.data type:${typeof response.data}`)
        console.log(`response.data:${response.data}`)
        myData.value = response.data;
      })
      .catch(error => {
        console.error(error);
      });

</script>
<template>
  <div>
    {{ typeof myData }}
    {{ myData?.somedata ?? [] }}
    <!-- {{ myData.somedata ?? [] }} -->
    {{ JSON.stringify(myData) }}
  </div>
</template>
