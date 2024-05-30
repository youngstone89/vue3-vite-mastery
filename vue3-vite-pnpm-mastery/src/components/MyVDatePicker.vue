<template>
    <div class="date-picker-container">
        <v-date-picker v-model="selectedDate" locale="kr" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedDate = ref(new Date());
// const { vDatePicker } = useDatePicker();
</script>

<style scoped>
.date-picker-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
}
</style>
