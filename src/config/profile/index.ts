import { getCountryCode } from '@sw-npm-packages/config'

function emailValidation<Type>(data: Type): boolean {
  if (typeof data === 'string')
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data)
  return false
}

function phoneValidation<Type>(data: Type): boolean {
  // the validator should only allow these sample types of phone numbers eg: +642112345678, +<valid country code><phone number>
  if (typeof data === 'string') return /^\+[0-9]{10,15}$/.test(data)
}

const countryCode = getCountryCode()

export const profileFormConfig = {
  firstName: {
    required: true
  },
  lastName: {
    required: true
  },
  dateOfBirth: {
    required: true
  },
  gender: {
    required: true,
    requiredErrorMessage: 'pleaseSelectOne'
  }
}

export const profileFormConfigGlobal = {
  ...profileFormConfig,
  email: {
    required: true,
    validator: emailValidation,
    validatorErrorMessage: 'invalidEmail'
  },
  phone: {
    required: true,
    validator: phoneValidation,
    validatorErrorMessage: 'invalidPhone'
  },
  companyName: {
    required: countryCode !== 'NZ'
  }
}

export const initialProfileData = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  email: '',
  phone: '',
  companyName: ''
}
