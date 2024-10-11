<template>
  <div>
    <p class="text-container">{{ text }}</p>
  </div>
</template>

<script>
import dummyFunction from './myDependency'

export default {
  data() {
    return {
      text: 'INITIAL_VALUE'
    }
  },
  mounted() {
    this.text = dummyFunction()
    console.log(`this.text:${this.text}`)
  }
}
</script>

<style lang="scss" scoped></style>
