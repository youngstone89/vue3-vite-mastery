<!-- src/components/DynamicComponent.vue -->
<script setup>
import { fetchRenderFunction } from '@/utils/fetchRenderFunction'
import { h, onMounted, ref } from 'vue'
const renderFunc = ref(null)

onMounted(async () => {
  try {
    renderFunc.value = await fetchRenderFunction('http://localhost:3000/render-function')
  } catch (error) {
    console.error('Failed to fetch render function:', error)
  }
})

const DynamicComponent = () => {
  if (renderFunc.value) {
    // Pass h to the render function
    return renderFunc.value(h)()
  }
  return h('div', 'Loading...')
}
</script>

<template>
  <component :is="DynamicComponent" />
</template>
