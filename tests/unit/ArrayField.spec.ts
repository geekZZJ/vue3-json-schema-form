import { mount } from '@vue/test-utils'
import JsonSchemaForm, {
  StringField,
  NumberField,
  ArrayField,
  Selection,
} from '../../lib'

describe('ArrayField', () => {
  it('should render a list of fields', () => {
    const wrapper = mount(JsonSchemaForm as any, {
      props: {
        schema: {
          type: 'array',
          items: [
            {
              type: 'string',
            },
            {
              type: 'number',
            },
          ],
        },
        value: [],
        onChange: () => {
          // console.log(111)
        },
      },
    })

    const arr = wrapper.findComponent(ArrayField)
    const str = arr.findComponent(StringField)
    const num = arr.findComponent(NumberField)

    expect(str.exists()).toBeTruthy()
    expect(num.exists()).toBeTruthy()
  })

  it('should render single type', () => {
    const wrapper = mount(JsonSchemaForm as any, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        value: ['1', '2'],
        onChange: () => {
          // console.log(111)
        },
      },
    })

    const arr = wrapper.findComponent(ArrayField)
    const strs = arr.findAllComponents(StringField)

    expect(strs.length).toBe(2)
    expect(strs[0].props().value).toBe('1')
  })

  it('should render select type', () => {
    const wrapper = mount(JsonSchemaForm as any, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['1', '2', '3'],
          },
        },
        value: [],
        onChange: () => {
          // console.log(111)
        },
      },
    })

    const select = wrapper.findComponent(Selection)

    expect(select.exists()).toBeTruthy()
  })
})
