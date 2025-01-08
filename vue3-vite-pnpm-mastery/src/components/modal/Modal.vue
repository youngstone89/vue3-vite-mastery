<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
const props = defineProps({
  isOpen: Boolean
})
const target = ref(null)
const emit = defineEmits(['modal-close'])

onClickOutside(target, () => emit('modal-close'))
</script>
<template>
  <div v-if="isOpen" class="modal-mask">
    <!-- wrapper -->
    <div class="modal-wrapper">
      <div class="modal-container" ref="target">
        <!-- header -->
        <div class="modal-header">
          <slot name="header"></slot>
        </div>
        <!-- body -->
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <!-- footer -->
        <div class="modal-footer">
          <slot name="footer">
            <div>
              <button @click.stop="emit('modal-close')">Submit</button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-container {
  width: 300px;
  margin: 150px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
</style>
