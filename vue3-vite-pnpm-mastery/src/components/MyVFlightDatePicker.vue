
<script setup lang="ts">
import { ref } from 'vue';

const dateRange = ref({ start: null, end: null });

const attributes = ref([
    {
        key: 'today',
        highlight: {
            backgroundColor: '#1e88e5',
            borderRadius: '50%',
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
        <v-date-picker v-model="dateRange" is-range :attributes="attributes" :popover="{ visibility: 'hover' }"
            :show-caps="false" :show-week-numbers="false" :show-months="1" :show-years="false" :title-position="'center'"
            is-dark />
        <button class="confirm" @click="confirmSelection">확인</button>
    </div>
</template>

<style scoped>
.date-picker {
    background-color: #2c2c2c;
    color: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
}

.confirm {
    margin-top: 10px;
    background-color: #1e88e5;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
}
</style>