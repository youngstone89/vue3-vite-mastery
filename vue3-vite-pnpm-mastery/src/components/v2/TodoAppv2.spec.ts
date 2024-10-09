import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest' // test runner
import TodoAppV2 from './TodoAppV2.vue'

test('renders a todo', () => {
  const wrapper = mount(TodoAppV2)
  const todo = wrapper.get('[data-test="todo"]')
  expect(todo.text()).toContain('Learn Vue.js 3')
})
