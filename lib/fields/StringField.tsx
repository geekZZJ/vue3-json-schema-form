import { CommonWidgetNames, FieldPropsDefine } from '../types'
import { computed, defineComponent } from 'vue'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'StringField',
  props: FieldPropsDefine,
  setup(props) {
    const handleChange = (v: string) => {
      ;(props as any).onChange(v)
    }
    const TextWidgetRef = computed(() => {
      const widgetRef = getWidget(CommonWidgetNames.TextWidget, props.uiSchema)
      return widgetRef.value
    })

    const widgetOptionsRef = computed(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { widget, properties, items, ...rest } = props.uiSchema as any
      return rest
    })

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
          options={widgetOptionsRef.value}
        />
      )
    }
  },
})
