import { mount } from '@vue/test-utils'
import JsonSchemaForm, { StringField, NumberField } from '../../lib'

describe('ObjectField', () => {
  let schema: any
  beforeEach(() => {
    schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        age: {
          type: 'number',
        },
      },
    }
  })

  it('should render property to correct fields', () => {
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema,
        value: {},
        onChange: () => {
          // console.log(111)
        },
      },
    })

    const strField = wrapper.findComponent(StringField)
    const numberField = wrapper.findComponent(NumberField)

    expect(strField.exists()).toBeTruthy()
    expect(numberField.exists()).toBeTruthy()
  })

  it('should change value when sub fields trigger onChange', async () => {
    let value: any = {}
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema,
        value,
        onChange: (v: any) => {
          value = v
        },
      },
    })

    const strField = wrapper.findComponent(StringField)
    const numberField = wrapper.findComponent(NumberField)

    await strField.props('onChange')('1')
    await numberField.props('onChange')(1)

    expect(value.name).toEqual('1')
    expect(value.age).toEqual(1)
  })

  it('should render property to correct fields', async () => {
    let value: any = {
      name: '123',
    }
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema,
        value,
        onChange: (v: any) => {
          value = v
        },
      },
    })

    const strField = wrapper.findComponent(StringField)
    // const numberField = wrapper.findComponent(NumberField)
    await strField.props('onChange')(undefined)

    expect(value.name).toBeUndefined()
    // expect(numberField.exists()).toBeTruthy()
  })
})
