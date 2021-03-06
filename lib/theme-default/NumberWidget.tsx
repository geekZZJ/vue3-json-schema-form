import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine } from '../types'

const NumberWidget = defineComponent({
  props: CommonWidgetPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const value = e.target.value
      e.target.value = props.value
      props.onChange(value)
    }
    return () => {
      return <input type="number" value={props.value} onInput={handleChange} />
    }
  },
})

export default NumberWidget
