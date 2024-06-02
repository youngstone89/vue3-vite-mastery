
<script setup lang="ts">
import { ref } from 'vue';

const dateRange = ref({ start: null, end: null });

const attributes = ref([
    {
        key: 'today',
        highlight: {
            backgroundColor: '#1e88e5',
            borderRadius: '0%',
        },
        dates: new Date(),
    },
]);

const confirmSelection = () => {
    console.log('Selected dates:', dateRange.value.start, dateRange.value.end);
};
</script>
<template>
    <div class="date-picker">
        <v-date-picker v-model="dateRange" />
    </div>
</template>

<style scoped></style>