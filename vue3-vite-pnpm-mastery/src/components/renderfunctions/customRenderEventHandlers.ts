// eventHandlers.js
import { ref } from 'vue'

export function useToggleState() {
  const isToggled = ref(false)

  const toggleState = () => {
    isToggled.value = !isToggled.value
  }

  return {
    isToggled,
    toggleState
  }
}
