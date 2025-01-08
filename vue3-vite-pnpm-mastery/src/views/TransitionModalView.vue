<script setup lang="ts">
import { ref } from 'vue'

const showModal = ref(false)
</script>
<template>
  <div>
    <button @click="showModal = true">Open Modal</button>
    <transition name="modal">
      <div v-if="showModal" class="modal-overlay" @click="showModal = false">
        <div
          :class="{
            modal: true,
            'fade-in': showModal == true,
            'fade-out': showModal == false
          }"
          @click.stop
        >
          <h2>Modal Title</h2>
          <p>This is the modal content.</p>
          <button @click="showModal = false">Close</button>
        </div>
      </div>
    </transition>
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

  transition: transform 0.3s ease-out;
}

.fade-in {
  transform: translateX(0);
}

.fade-out {
  transform: translateX(100%);
}

.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform 0.3s ease-out;
}

.modal-enter-to .modal,
.modal-leave-from .modal {
  transform: translateX(0);
}

.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: translateX(100%);
}
</style>
