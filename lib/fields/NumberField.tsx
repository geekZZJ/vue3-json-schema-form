import { defineComponent } from 'vue'
import { FieldPropsDefine, CommonWidgetNames } from '../types'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'NumberField',
  props: FieldPropsDefine,
  setup(props) {
    const handleChange = (v: string) => {
      const num = Number(v)
      if (Number.isNaN(num)) {
        props.onChange(undefined)
      } else {
        props.onChange(num)
      }
    }
    const NumberWidgetRef = getWidget(CommonWidgetNames.NumberWidget)
    return () => {
      const NumberWidget = NumberWidgetRef.value
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { schema, rootSchema, ...rest } = props
      return <NumberWidget {...rest} onChange={handleChange} />
    }
  },
})
