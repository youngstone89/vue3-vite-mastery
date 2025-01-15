<template>
  <button class="base-button" :class="$attrs.class" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
// No need for a script section if there's no logic
</script>

<style scoped>
.base-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
</style>
