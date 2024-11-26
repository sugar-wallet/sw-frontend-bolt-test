/* eslint-disable @typescript-eslint/no-explicit-any */
import { IKeyValuePair } from '@sw-npm-packages/types'

interface IFieldConfig {
  required: boolean
  requiredErrorMessage?: string
  validator?: <T>(data: T) => boolean
  validatorErrorMessage?: string
}

export const validateForm = <T>(
  formData: T,
  config: IKeyValuePair<IFieldConfig>
): {
  isValidated: boolean
  errors: T
} => {
  const errors: any = {}
  for (const field of Object.keys(
    formData as IKeyValuePair<string | number | boolean>
  )) {
    if (config[field]) {
      if (config[field].required) {
        if (!(formData as any)[field]) {
          errors[field] =
            config[field].requiredErrorMessage || 'fieldIsRequired'
        }
      }
      if (config[field].validator) {
        if (
          !config[field].validator?.<T>((formData as any)[field]?.toString())
        ) {
          errors[field] =
            config[field].validatorErrorMessage || 'validationError'
        }
      }
    }
  }
  return {
    isValidated: Object.keys(errors).length === 0,
    errors
  }
}
