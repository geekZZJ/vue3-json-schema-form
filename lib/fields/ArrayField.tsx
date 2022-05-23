import { defineComponent } from 'vue'
import { FieldPropsDefine } from '../types'
import { useVJSFContext } from '../context'

export default defineComponent({
  name: 'ArrayField',
  props: FieldPropsDefine,
  setup(props) {
    const context = useVJSFContext()
    return () => {
      const SchemaItem = context.SchemaItem
      return null
    }
  },
})
