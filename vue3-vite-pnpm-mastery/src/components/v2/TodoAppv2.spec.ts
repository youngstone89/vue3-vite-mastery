import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest' // test runner
import TodoAppV2 from './TodoAppV2.vue'

test('renders a todo', () => {
  const wrapper = mount(TodoAppV2)
  const todo = wrapper.get('[data-test="todo"]')
  expect(todo.text()).toContain('Learn Vue.js 3')
})

test('creates a todo', async () => {
  const wrapper = mount(TodoAppV2)
  expect(wrapper.findAll('[data-test="todo"')).toHaveLength(1)
  expect(wrapper.get('[data-test="new-todo"').text()).toBe('')
  await wrapper.get('[data-test="new-todo"').setValue('New todo')
  await wrapper.get('[data-test="form"').trigger('submit')

  expect(wrapper.findAll('[data-test="todo"')).toHaveLength(2)
})
