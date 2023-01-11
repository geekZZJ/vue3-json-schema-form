import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine } from '../types'
import { withFormItem } from './FormItem'

const NumberWidget = withFormItem(
  defineComponent({
    props: CommonWidgetPropsDefine,
    setup(props) {
      const handleChange = (e: any) => {
        const value = e.target.value
        e.target.value = props.value
        ;(props as any).onChange(value)
      }
      return () => {
        return (
          <input type="number" value={props.value} onInput={handleChange} />
        )
      }
    },
  }),
)

export default NumberWidget
