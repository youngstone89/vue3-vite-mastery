<script setup lang="ts">
import { ref } from 'vue';

const showModal = ref(false)
</script>
<template>
  <div>
    <button @click="showModal = true">Open Modal</button>
    <div v-if="showModal" class="modal-overlay" @click="showModal = false">
    </div>
    <Transition name="modal">
      <div class="modal" v-if="showModal">
        <h2>Modal Title</h2>
        <p>This is the modal content.</p>
        <button @click="showModal = false">Close</button>
      </div>
    </Transition>
  </div>
</template>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
}

.modal {
  background-color: white;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  width: 50%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
}

/* define how modal enters interms of timing and move style */
.modal-enter-active {
  transition: all 1s ease-out;
}

/* define how modal enters in terms of opacity and x axis move */
.modal-enter-from {
  transform: translateX(200px);
  opacity: 0;
}

.modal-leave-active {
  transition: all 0.5s ease-out;
}

.modal-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
</style>
