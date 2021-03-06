import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine } from '../types'

const TextWidget = defineComponent({
  props: CommonWidgetPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const value = e.target.value
      e.target.value = props.value
      props.onChange(value)
    }
    return () => {
      return <input type="text" value={props.value} onInput={handleChange} />
    }
  },
})

export default TextWidget
