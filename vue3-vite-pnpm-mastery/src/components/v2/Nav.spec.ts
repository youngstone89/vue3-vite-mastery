import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Nav from './Nav.vue'
test('renders a profile link', async () => {
  const wrapper = mount(Nav)
  const profileLink = wrapper.get('#profile')
  expect(profileLink.text()).toBe('My profile')
})

test('does not render admin link', async () => {
  const wrapper = mount(Nav)
  expect(wrapper.find('#admin').exists()).toBe(false)
})
test('renders a admin link', async () => {
  const wrapper = mount(Nav, {
    data() {
      return { admin: true }
    }
  })
  expect(wrapper.get('#admin').text()).toEqual('Admin')
})
test('does not show user dropdown', async () => {
  const wrapper = mount(Nav, {
    data() {
      return { shouldShowDropdown: true }
    }
  })
  expect(wrapper.get('#user-dropdown').isVisible()).toBe(true)
})
