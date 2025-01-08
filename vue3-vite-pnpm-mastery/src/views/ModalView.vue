<script setup lang="ts">
import Modal from '@/components/modal/Modal.vue'
import { ref } from 'vue'

const isModalOpened = ref(false)

const openModal = () => {
  isModalOpened.value = true
}
const closeModal = () => {
  isModalOpened.value = false
}

const submitHandler = () => {
  //here you do whatever
}
</script>
<template>
  <div>
    <button @click="openModal">Open generic modal</button>
  </div>
  <Modal
    :isOpen="isModalOpened"
    @modal-close="closeModal"
    @submit="submitHandler"
    name="first-modal"
  >
    <template #header>Custom header</template>
    <template #body>Custom content</template>
  </Modal>
</template>
