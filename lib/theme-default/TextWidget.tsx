import { defineComponent } from 'vue'
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
      return () => {
        return <input type="text" value={props.value} onInput={handleChange} />
      }
    },
  }),
)

export default TextWidget
