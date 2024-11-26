import { isCitizenID } from '@sw-npm-packages/utils'

export interface ITaxIdFormData {
  taxId: string
}

export const taxIdInitialFormData = {
  taxId: ''
}

function validatorFn<Type>(data: Type): boolean {
  if (typeof data === 'string') return isCitizenID(data)
  return false
}

export const taxIdFormValidationConfig = {
  taxId: {
    required: true,
    validator: validatorFn,
    validatorErrorMessage: 'invalidCitizenId'
  }
}
