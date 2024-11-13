// customRenderFunction.js
import { h, ref } from 'vue'

export function useCustomRenderFunction() {
  const isToggled = ref(false)
  // Event handler to toggle a boolean value
  const toggleState = () => {
    isToggled.value = !isToggled.value
  }

  return {
    render() {
      return h('div', { class: 'interactive-container' }, [
        // Heading
        h('h2', 'Vue Render Function with Interactive Event Handlers'),

        // Button to toggle a state
        h(
          'button',
          {
            class: 'toggle-button',
            onClick: toggleState
          },
          isToggled.value ? 'State: ON' : 'State: OFF'
        ),

        // Conditional message based on `isToggled` state
        h('p', isToggled.value ? 'The state is ON' : 'The state is OFF')
      ])
    }
  }
}
