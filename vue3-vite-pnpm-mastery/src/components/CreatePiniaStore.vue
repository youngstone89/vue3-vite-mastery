<template>
    <div>
        <p>State: {{ stateValue }}</p>
        <button @click="increment">Increment</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';
const id = nanoid()
const useStore = defineStore(`counter_${id}`, {
    state: () => ({
        count: 0
    }),
    actions: {
        increment() {
            this.count++;
        }
    }
});

const store = useStore();
const stateValue = ref(store.count);

store.$onAction(({ name, args }) => {
    console.log(`Action: ${name}, Args: ${args}`);
});

function increment() {
    store.increment();
    stateValue.value = store.count;
}
</script>
