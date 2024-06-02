<template>
    <main>
        <div class="date-picker-view">
            <MyVDatePicker />
        </div>
        <div class="date-picker-view">
            <MyVFlightDatePicker />
        </div>
        <div class="date-picker-view">
            <VCalendarInitialPage />
        </div>
    </main>
</template>

<script setup lang="ts">
import MyVDatePicker from '../components/MyVDatePicker.vue';
import MyVFlightDatePicker from '../components/MyVFlightDatePicker.vue';
</script>

<style scoped>
.date-picker-view {
    display: flex;
    justify-content: center;
    padding: 20px;
}
</style>
