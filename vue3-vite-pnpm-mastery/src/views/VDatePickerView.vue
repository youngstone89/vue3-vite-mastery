<template>
    <main>
        <div class="date-picker-view">
            <MyVDatePicker />
        </div>
    </main>
</template>

<script setup lang="ts">
import MyVDatePicker from '../components/MyVDatePicker.vue';
</script>

<style scoped>
.date-picker-view {
    display: flex;
    justify-content: center;
    padding: 20px;
}
</style>
