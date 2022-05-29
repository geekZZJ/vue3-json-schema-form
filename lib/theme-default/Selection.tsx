import { defineComponent, PropType, ref, watch } from 'vue'

export default defineComponent({
  name: 'SelectionWidget',
  props: {
    value: {},
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
    options: {
      type: Array as PropType<{ key: string; value: any }[]>,
      required: true,
    },
  },
  setup(props) {
    const currentValRef = ref(props.value)
    watch(currentValRef, (newVal) => {
      if (newVal !== props.value) {
        props.onChange(newVal)
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
