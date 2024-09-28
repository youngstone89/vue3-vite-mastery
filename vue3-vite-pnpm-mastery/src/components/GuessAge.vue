<script setup lang="ts">
import { computed, ref } from "vue";

interface GuessAgeProp {
  title: string;
}
defineProps<GuessAgeProp>();

const search = ref("")
const firstname = ref("")
const age = ref("")
</script>


<template>
  <h1>{{ title }}</h1>
</template>