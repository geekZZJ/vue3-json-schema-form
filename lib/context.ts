import { inject, DefineComponent } from 'vue'
import { FieldPropsDefine } from './types'

export const SchemaFormContextKey = Symbol()

type SchemaItemDefine = DefineComponent<typeof FieldPropsDefine>

export function useVJSFContext() {
  const context: { SchemaItem: SchemaItemDefine } | undefined =
    inject(SchemaFormContextKey)
  if (!context) {
    throw new Error('SchemaForm should be used')
  }
  return context
}
