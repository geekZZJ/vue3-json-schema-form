import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine } from '../../lib/types'
import { withFormItem } from '../../lib/theme-default/FormItem'

const PasswordWidget = withFormItem(
  defineComponent({
    name: 'PasswordWidget',
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
          <input type="password" value={props.value} onInput={handleChange} />
        )
      }
    },
  }),
)

export default PasswordWidget
