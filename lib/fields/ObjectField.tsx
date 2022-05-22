import { SchemaFormContextKey } from '../context'
import { defineComponent, inject, DefineComponent, ExtractPropTypes } from 'vue'
import { FieldPropsDefine } from '../types'
import { isObject } from '../utils'

type SchemaItemDefine = DefineComponent<typeof FieldPropsDefine>

export default defineComponent({
  name: 'ObjectField',
  props: FieldPropsDefine,
  setup(props) {
    const context: { SchemaItem: SchemaItemDefine } | undefined =
      inject(SchemaFormContextKey)
    if (!context) {
      throw new Error('SchemaForm should be used')
    }

    const handleObjectFieldChange = (key: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {}
      if (v === undefined) {
        delete value[key]
      } else {
        value[key] = v
      }
      props.onChange(value)
    }

    return () => {
      const { schema, rootSchema, value } = props
      const { SchemaItem } = context
      const properties = schema.properties || {}
      const currentValue: any = isObject(value) ? value : {}
      return Object.keys(properties).map((k: string, index: number) => (
        <SchemaItem
          schema={properties[k]}
          rootSchema={rootSchema}
          value={currentValue[k]}
          key={index}
          onChange={(v: any) => handleObjectFieldChange(k, v)}
        ></SchemaItem>
      ))
    }
  },
})
