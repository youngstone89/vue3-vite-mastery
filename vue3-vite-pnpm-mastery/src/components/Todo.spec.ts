import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import TodoApp from './TodoApp.vue'
test('renders a todo', () => {
  const wrapper = mount(TodoApp)

  const todo = wrapper.get('[data-test="todo"]')

  expect(todo.text()).toBe('Learn Vue.js 3')
})

test('findAll check length', () => {
  const wrapper = mount(TodoApp)
  expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2)
})

test('creates a todo', async () => {
  const wrapper = mount(TodoApp)
  expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2)
  expect(wrapper.find('[data-test="new-todo"]').exists()).toBe(true)

  expect(wrapper.find('input[type="text"]').exists()).toBe(true)
  await wrapper.get('[data-test="new-todo"]').setValue('New todo')
  await wrapper.get('[data-test="form"]').trigger('submit')

  expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(3)
  // expect(wrapper.find('input').text()).toBe('New todo')
})
