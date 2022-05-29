import { inject, DefineComponent } from 'vue'
import { FieldPropsDefine, Theme } from './types'

export const SchemaFormContextKey = Symbol()

type SchemaItemDefine = DefineComponent<typeof FieldPropsDefine>

export function useVJSFContext() {
  const context: { theme: Theme; SchemaItem: SchemaItemDefine } | undefined =
    inject(SchemaFormContextKey)
  if (!context) {
    throw new Error('SchemaForm should be used')
  }
  return context
}
