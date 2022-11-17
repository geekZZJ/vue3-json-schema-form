import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine } from '../types'
import FormItem from './FormItem'

const TextWidget = defineComponent({
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
      return (
        <FormItem {...props}>
          <input type="text" value={props.value} onInput={handleChange} />
        </FormItem>
      )
    }
  },
})

export default TextWidget
