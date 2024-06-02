<script setup lang="ts">
import { ref, watch } from 'vue';

const mode = ref('date');
const range = ref({
    start: new Date(2024, 5, 24),
    end: new Date(2024, 6, 1)
});
const attributes = ref([
    {
        key: 'selected-range',
        highlight: {
            backgroundColor: '#42b983', // Custom color for selected range
        },
        dates: {
            start: range.value.start,
            end: range.value.end
        }
    },
    // Existing attributes...
]);
watch(range.value, (oldV, newV) => {
    console.log(newV.start);
    console.log(newV.end);
});
</script>
<template>
    <div class="date-picker-container">
        <v-date-picker v-model.range=range :mode="mode" :columns="2" :attribute="attributes" />
    </div>
</template>
<style scoped>
:root {
    --vc-select-hover-bg: Red;
}

:deep(.vc-base-select) {
    & :deep(select) {

        &:deep(:hover) {
            background-color: var(--vc-select-hover-bg) !important;
        }
    }
}

/* Target the selected day */
:deep(.vc-highlight) {
    background-color: #ffeb3b !important;

    & :deep(.vc-highlight-base-start) {
        width: 0% !important;
        border-radius: 0 !important;
        border-right-width: 0 !important;
        background-color: blue;
    }
}

:deep(.vc-highlight-bg-solid) {
    border-radius: 0 !important;
}

:deep(.vc-highlight-content-solid) {
    color: black;
}

:deep(.vc-day-content) {
    border-radius: 0 !important;
}

:deep(.vc-highlight-bg-outline),
:deep(.vc-highlight-bg-none) {
    background-color: var(--vc-highlight-outline-bg);
    border: 2px solid;
    border-color: var(--vc-highlight-outline-border);
    border-radius: 0;
}

:deep(.vc-light) {
    --vc-hover-bg: transparent;
    /* --vc-highlight-outline-border: black; */
    /* --vc-select-color: black; */
    --vc-border: black;
}

:deep(.vc-highlight-content-outline) {
    color: red;
}

:deep(.vc-focus) {
    outline: 0;
    box-shadow: none;
}
</style>
