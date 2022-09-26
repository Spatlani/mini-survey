import { mount } from '@vue/test-utils'
import QuestionsSidebar from '@/components/QuestionsSidebar'

describe('QuestionsSidebar', () => {

  const wrapper = mount(QuestionsSidebar)
  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('has data', () => {
    expect(typeof QuestionsSidebar.data).toBe('function')
  })

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('Question templates')
  })
})