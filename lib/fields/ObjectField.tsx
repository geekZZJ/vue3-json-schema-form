import { defineComponent } from 'vue'
import { FieldPropsDefine } from '../types'
// import SchemaItem from '../SchemaItem'

export default defineComponent({
  name: 'ObjectField',
  props: FieldPropsDefine,
  setup() {
    return () => {
      return <div>object</div>
    }
  },
})
