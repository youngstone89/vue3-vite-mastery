// customRenderFunction.js
import { h } from 'vue'
import { useToggleState } from './customRenderEventHandlers'

export function useCustomRenderFunction() {
  const { isToggled, toggleState } = useToggleState()

  return {
    render() {
      return h('div', { class: 'interactive-container' }, [
        h('h2', 'Vue Render Function with Interactive Event Handlers'),

        h(
          'button',
          {
            class: 'toggle-button',
            onClick: toggleState
          },
          isToggled.value ? 'State: ON' : 'State: OFF'
        ),

        h('p', isToggled.value ? 'The state is ON' : 'The state is OFF')
      ])
    }
  }
}
