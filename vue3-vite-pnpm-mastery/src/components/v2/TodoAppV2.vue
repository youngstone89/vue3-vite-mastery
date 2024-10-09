<template>
  <div>
    <div v-for="todo in todos" :key="todo.id" data-test="todo">
      {{ todo.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoAppV2',
  data() {
    return {
      todos: [
        {
          id: 1,
          text: 'Learn Vue.js 3',
          completed: true
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
