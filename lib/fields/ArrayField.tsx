import { defineComponent } from 'vue'
import { FieldPropsDefine, Schema } from '../types'
import { useVJSFContext } from '../context'

export default defineComponent({
  name: 'ArrayField',
  props: FieldPropsDefine,
  setup(props) {
    const context = useVJSFContext()
    const handleMutiTypeChange = (v: any, index: number) => {
      const { value, onChange } = props
      const arr = Array.isArray(value) ? value : []
      arr[index] = v
      onChange(arr)
    }
    return () => {
      const { schema, rootSchema, value } = props
      const { SchemaItem } = context
      const isMultiType = Array.isArray(schema.items)
      if (isMultiType) {
        const items: Schema[] = schema.items as any
        const arr = Array.isArray(value) ? value : []
        return items.map((s: Schema, index: number) => (
          <SchemaItem
            schema={s}
            key={index}
            rootSchema={rootSchema}
            value={arr[index]}
            onChange={(v: any) => handleMutiTypeChange(v, index)}
          ></SchemaItem>
        ))
      }
      return null
    }
  },
})
