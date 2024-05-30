<template>
    <div>
        <input v-model="title" placeholder="Edit title">
        <input v-model="suffix" placeholder="Edit suffix">
        <p>Document title: {{ fullTitle }}</p>
    </div>
</template>

<script>
import { ref, watchEffect } from 'vue';

export default {
    setup() {
        const title = ref('Default Title');
        const suffix = ref('VueApp');

        const fullTitle = ref('');

        watchEffect(() => {
            fullTitle.value = `${title.value} - ${suffix.value}`;
            document.title = fullTitle.value;
            console.log(`Document title set to: ${document.title}`);
        });

        return { title, suffix, fullTitle };
    }
}
</script>