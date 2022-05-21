import { SchemaFormContextKey } from '../context'
import { defineComponent, inject } from 'vue'
import { FieldPropsDefine } from '../types'

export default defineComponent({
  name: 'ObjectField',
  props: FieldPropsDefine,
  setup() {
    const context = inject(SchemaFormContextKey)
    return () => {
      const { SchemaItem } = context
      return <div>object</div>
    }
  },
})
