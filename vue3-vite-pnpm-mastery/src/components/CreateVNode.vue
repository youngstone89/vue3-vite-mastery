<template>
    <div class="vnode-container">
        <h1>Create VNode Example</h1>
        <button @click="createVNode">Create VNode</button>
        <button @click="removeVNode">Remove VNode</button>
        <div ref="vnodeDisplay"></div>
    </div>
</template>

<script setup lang="ts">
import { createApp, h, ref, type App } from 'vue';
import type { Router } from 'vue-router';

// Augment the module 'vue' to add custom configuration
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $router?: Router;
    }
}

const vnodeDisplay = ref(null);
const vnodeApp = ref<App<Element> | null>(null);

function createVNode() {
    const newVNode = h('p', { style: 'color: blue;' }, 'This is a dynamically created VNode');
    if (vnodeDisplay.value) {
        vnodeDisplay.value.innerHTML = ''; // Clear the container
        const app = createApp({ render: () => newVNode });
        app.mount(vnodeDisplay.value);
        vnodeApp.value = app;
    }
}
function removeVNode() {
    vnodeApp.value?.unmount();
    vnodeApp.value = null;
}
</script>

<style scoped>
.vnode-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.vnode-container h1 {
    margin-bottom: 20px;
}

.vnode-container button {
    margin-bottom: 10px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}
</style>
