<template>
    <div class="calendar-container">
        <v-calendar :attributes="attributes" />
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const attributes = ref([
    {
        key: 'today',
        highlight: {
            backgroundColor: '#ff0000', // Red background
            borderRadius: '50%',        // Circular highlight
            color: '#ffffff'            // White text color
        },
        dates: new Date() // Apply this attribute to today's date
    },
    {
        key: 'weekends',
        highlight: {
            backgroundColor: '#0000ff', // Blue background for weekends
            color: '#ffffff'            // White text color
        },
        dates: date => {
            const day = date.getDay();
            return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
        }
    }
]);

</script>

<style scoped>
.calendar-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
}
</style>
