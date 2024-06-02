<template>
    <nav :class="$style.navigation">
        <RouterLink v-for="route in routes" :key="route.name" :to="route.path">
            {{ route.name }}
        </RouterLink>
    </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const currentRoute = useRoute();

// Filter out routes that should not be displayed in the navigation
const routes = computed(() => {
    return router.getRoutes().filter(route => {
        // Assuming you might not want to include certain routes like 'NotFound'
        return route.name && !['NotFound'].includes(route.name);
    }).map(route => ({
        path: route.path,
        name: route.name.charAt(0).toUpperCase() + route.name.slice(1).replace(/-/g, ' ') // Format name
    }));
});
</script>
<style module scoped>
.navigation {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
