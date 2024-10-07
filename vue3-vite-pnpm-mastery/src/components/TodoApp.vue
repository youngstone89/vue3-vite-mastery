<script setup lang="ts">
import { ref } from 'vue'
const newTodo = ref('INITIAL_VALUE')
const todos = ref([
  {
    id: 1,
    text: 'Learn Vue.js 3',
    completed: false
  },
  {
    id: 2,
    text: 'Learn Vue.js 2',
    completed: false
  }
])
function createTodo() {
  todos.value.push({
    id: 3,
    text: newTodo.value,
    completed: false
  })
}
</script>
<template>
  <div>
    <div v-for="todo in todos" :key="todo.id" data-test="todo">
      {{ todo.text }}
    </div>
    <form data-test="form" @submit.prevent="createTodo()">
      <input type="text" data-test="new-todo" v-model="newTodo" />
    </form>
  </div>
</template>
<style></style>
