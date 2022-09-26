import { mount } from '@vue/test-utils'
import PreviewSection from '@/components/PreviewSection'

describe('PreviewSection', () => {
  const questions = []
  const wrapper = mount(PreviewSection, {
    propsData: { questions }
  })

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})