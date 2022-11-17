import Ajv, { ErrorObject } from 'ajv'
import i18n from 'ajv-i18n'
import toPath from 'lodash.topath'
import { Schema } from './types'

interface TransformErrorObject {
  name: string
  property: string
  message: string | undefined
  params: Record<string, any>
  schemaPath: string
}

interface ErrorSchemaObject {
  [level: string]: ErrorSchema
}

export type ErrorSchema = ErrorSchemaObject & {
  __errors?: string[]
}

function transformErrors(
  errors: ErrorObject[] | null | undefined,
): TransformErrorObject[] {
  if (errors === null || errors === undefined) return []
  return errors.map(
    ({ message, instancePath, keyword, params, schemaPath }) => {
      return {
        name: keyword,
        property: instancePath,
        message,
        params,
        schemaPath,
      }
    },
  )
}

function toErrorSchema(errors: TransformErrorObject[]) {
  if (errors.length < 1) return {}

  return errors.reduce((errorSchema, error) => {
    const { property, message } = error
    const path = toPath(property) // /obj/a -> [obj, a]
    let parent = errorSchema

    // If the property is at the root (.level1) then toPath creates
    // an empty array element at the first index. Remove it.
    if (path.length > 0 && path[0] === '') {
      path.splice(0, 1)
    }

    // {
    //   obj: {
    //     a: {}
    //   }
    // } // /obj/a
    for (const segment of path.slice(0)) {
      if (!(segment in parent)) {
        ;(parent as any)[segment] = {}
      }
      parent = parent[segment]
    }

    if (Array.isArray(parent.__errors)) {
      // We store the list of errors for this node in a property named __errors
      // to avoid name collision with a possible sub schema field named
      // "errors" (see `validate.createErrorHandler`).
      parent.__errors = parent.__errors.concat(message || '')
    } else {
      if (message) {
        parent.__errors = [message]
      }
    }
    return errorSchema
  }, {} as ErrorSchema)
}

export function validateFormData(
  validator: Ajv,
  formData: any,
  schama: Schema,
  locale = 'zh',
) {
  let validationError = null
  try {
    validator.validate(schama, formData)
  } catch (error) {
    validationError = error
  }
  ;(i18n as any)[locale](validator.errors)
  let errors = transformErrors(validator.errors)
  if (validationError) {
    errors = [
      ...errors,
      { message: (validationError as any).message } as TransformErrorObject,
    ]
  }

  const errorSchema = toErrorSchema(errors)
  return {
    errors,
    errorSchema,
    valid: errors.length === 0,
  }
}
