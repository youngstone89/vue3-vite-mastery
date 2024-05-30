<template>
    <div>
        <p>User ID: {{ userId }}</p>
        <p>User data: {{ userData }}</p>
    </div>
</template>

<script>
import { watch, ref, onMounted } from 'vue';

export default {
    setup(props) {
        const userData = ref({});
        const userId = ref(1);
        setInterval(() => {
            userId.value = userId.value + 1;
        }, 1000);

        watch(userId, (newUserId, oldUserId) => {
            console.log(`User ID changed from ${oldUserId} to ${newUserId}`);
        });

        onMounted(() => {
            console.log('Component is mounted');
        });

        return { userData, userId };
    }
}
</script >