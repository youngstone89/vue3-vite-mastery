<!-- src/components/DynamicComponent.vue -->
<script setup>
import { fetchRenderFunction } from '@/utils/fetchRenderFunction'
import { defineAsyncComponent, h, onMounted, ref } from 'vue'
const DynamicComponent = defineAsyncComponent(async () => {
  const renderFunc = await fetchRenderFunction('http://localhost:3000/render-function')
  return {
    setup() {
      const renderFn = renderFunc(h, { ref, onMounted })
      return renderFn
    }
  }
})
</script>

<template>
  <Suspense>
    <DynamicComponent />
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
