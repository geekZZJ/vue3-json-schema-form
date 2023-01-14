import {
  defineComponent,
  PropType,
  provide,
  ref,
  Ref,
  shallowRef,
  watch,
  watchEffect,
} from 'vue'
import Ajv, { Options } from 'ajv'
// import { Schema, Theme } from './types'
import { Schema, UISchema } from './types'
import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './context'
import { ErrorSchema, validateFormData } from './validator'

interface ContextRef {
  doValidate: () => Promise<{
    errors: any[]
    valid: boolean
  }>
}

export default defineComponent({
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
    contextRef: {
      type: Object as PropType<Ref<ContextRef | undefined>>,
    },
    ajvOptions: {
      type: Object as PropType<Options>,
    },
    locale: {
      type: String,
      default: 'zh',
    },
    customValidate: {
      type: Function as PropType<(data: any, errors: any) => void>,
    },
    uiSchema: {
      type: Object as PropType<UISchema>,
    },
    // theme: {
    //   type: Object as PropType<Theme>,
    //   required: true,
    // },
  },
  name: 'SchemaForm',
  setup(props) {
    const handleChange = (v: any) => {
      ;(props as any).onChange(v)
    }

    const context: any = {
      SchemaItem,
      // theme: props.theme,
    }

    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({})

    const validatorRef: Ref<Ajv> = shallowRef() as any

    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...props.ajvOptions,
      })
    })

    watch(
      () => props.value,
      () => {
        if (validatorResolveRef.value) doValidate()
      },
      { deep: true },
    )

    const validatorResolveRef = ref()
    const validatorIndex = ref(0)

    async function doValidate() {
      const index = (validatorIndex.value += 1)
      const result = await validateFormData(
        validatorRef.value,
        props.value,
        props.schema,
        props.locale,
        props.customValidate,
      )
      if (index !== validatorIndex.value) return
      errorSchemaRef.value = result.errorSchema
      validatorResolveRef.value(result)
      validatorResolveRef.value = undefined
    }

    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            doValidate() {
              return new Promise((resolve) => {
                validatorResolveRef.value = resolve
                doValidate()
              })
            },
          }
        }
      },
      {
        immediate: true,
      },
    )
    provide(SchemaFormContextKey, context)

    return () => {
      const { schema, value, uiSchema } = props
      return (
        <SchemaItem
          schema={schema}
          value={value}
          rootSchema={schema}
          onChange={handleChange}
          errorSchema={errorSchemaRef.value || {}}
          uiSchema={uiSchema || {}}
        ></SchemaItem>
      )
    }
  },
})
