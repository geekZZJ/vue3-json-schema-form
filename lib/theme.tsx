import {
  computed,
  ComputedRef,
  defineComponent,
  inject,
  PropType,
  provide,
} from 'vue'
import { Theme } from './types'

const ThEME_PROVIDER_KEY = Symbol()

const ThemeProvider = defineComponent({
  name: 'VJSFThemeProvider',
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const context = computed(() => props.theme)
    provide(ThEME_PROVIDER_KEY, context)
    return () => slots.default?.()
  },
})

export function getWidget(name: string) {
  const context: ComputedRef<Theme> | undefined =
    inject<ComputedRef<Theme>>(ThEME_PROVIDER_KEY)
  if (!context) {
    throw new Error('vjsf theme required')
  }

  const widgetRef = computed(() => {
    return (context.value.widgets as any)[name]
  })
  return widgetRef
}

export default ThemeProvider
