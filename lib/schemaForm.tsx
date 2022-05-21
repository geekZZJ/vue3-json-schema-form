import { defineComponent, PropType } from 'vue'
import { Schema, SchemaTypes } from './types'

export default defineComponent({
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },
  name: 'SchemaForm',
  setup(props) {
    return () => {
      const schema = props.schema
      const type = schema?.type
      switch (type) {
        case SchemaTypes.STRING:
          return <input type="text" />
          break

        default:
          break
      }
      return <div>1111</div>
    }
  },
})
