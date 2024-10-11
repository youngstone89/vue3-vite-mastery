import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import MyComponent from './MyComponent.vue'

beforeEach(() => {
  vi.mock('./myDependency', () => ({
    default: vi.fn(() => 'mocked_dummy')
  }))
})
afterEach(() => {
  vi.clearAllMocks()
})
test('render MyComponent', async () => {
  const wrapper = mount(MyComponent)
  const textContainer = wrapper.get('.text-container')
  expect(textContainer.text()).toEqual('INITIAL_VALUE')
  await wrapper.vm.$nextTick()
  expect(textContainer.text()).toEqual('mocked_dummy')
})

test('render MyComponent with mocked function', async () => {
  const wrapper = mount(MyComponent)

  await wrapper.vm.$nextTick()

  expect(wrapper.text()).toContain('mocked_dummy')
})
