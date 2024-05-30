<template>
    <div class="v-calendar-view">
        <MyVCalender />
    </div>
</template>

<script setup lang="ts">
import MyVCalender from '../components/MyVCalender.vue';
</script>

<style scoped>
.v-calendar-view {
    display: flex;
    justify-content: center;
    padding: 20px;
}
</style>
