import { computed, defineComponent } from 'vue'
import { CommonWidgetPropsDefine } from '../types'
import { withFormItem } from './FormItem'

const TextWidget = withFormItem(
  defineComponent({
    name: 'TextWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
      console.log(111, props)
      const handleChange = (e: any) => {
        const value = e.target.value
        e.target.value = props.value
        ;(props as any).onChange(value)
      }
      const styleRef = computed(() => {
        return {
          color: (props.options && props.options.color) || 'black',
        }
      })

      return () => {
        return (
          <input
            type="text"
            value={props.value}
            onInput={handleChange}
            style={styleRef.value}
          />
        )
      }
    },
  }),
)

export default TextWidget
