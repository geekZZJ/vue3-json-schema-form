import { defineComponent, ref, watch } from 'vue'
import { SelectionWidgetPropsDefine } from '../types'

const Selection = defineComponent({
  name: 'SelectionWidget',
  props: SelectionWidgetPropsDefine,
  setup(props) {
    const currentValRef = ref(props.value)
    watch(currentValRef, (newVal) => {
      if (newVal !== props.value) {
        ;(props as any).onChange(newVal)
      }
    })
    watch(
      () => props.value,
      (v) => {
        if (v !== currentValRef.value) {
          currentValRef.value = v
        }
      },
    )
    return () => {
      const { options } = props
      return (
        <select multiple={true} v-model={currentValRef.value}>
          {options.map((op) => (
            <option value={op.value}>{op.key}</option>
          ))}
        </select>
      )
    }
  },
})

export default Selection
