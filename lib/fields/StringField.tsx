import { CommonWidgetNames, FieldPropsDefine } from '../types'
import { defineComponent } from 'vue'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'StringField',
  props: FieldPropsDefine,
  setup(props) {
    const handleChange = (v: string) => {
      ;(props as any).onChange(v)
    }
    const TextWidgetRef = getWidget(CommonWidgetNames.TextWidget)
    // eslint-disable-next-line
    const { schema, rootSchema, errorSchema, ...rest } = props
    return () => {
      const TextWidget = TextWidgetRef.value
      return (
        <TextWidget
          schema={schema}
          {...rest}
          value={props.value}
          errors={errorSchema.__errors}
          onChange={(v) => handleChange(v)}
        />
      )
    }
  },
})
