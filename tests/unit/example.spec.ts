import { shallowMount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

const HelloWorld = defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup(props) {
    return () => {
      return h('div', props.msg)
    }
  },
})

beforeEach(() => {
  console.log('beforeEach')
})

afterEach(() => {
  console.log('afterEach')
})

beforeAll(() => {
  console.log('beforeAll')
})

afterAll(() => {
  console.log('afterAll')
})

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', async () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    })
    // setTimeout(() => {
    //   expect(wrapper.text()).toMatch(msg)
    //   done()
    // }, 100)
    // return new Promise<void>((resolve) => {
    //   expect(wrapper.text()).toMatch(msg)
    //   resolve()
    // })
    await wrapper.setProps({
      msg: '123',
    })
    expect(wrapper.text()).toMatch('123')
  })

  it('should work', () => {
    expect(1 + 1).toBe(2)
  })
})
