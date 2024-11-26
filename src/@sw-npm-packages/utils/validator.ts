import { phone } from 'phone'
import _isJWT from 'validator/lib/isJWT'
import _isTaxID from 'validator/lib/isTaxID'
import _isURL from 'validator/lib/isURL'

import { isProduction } from '@sw-npm-packages/constants'

export const isURL = (url: string) => {
  return _isURL(url || '', {
    require_tld: isProduction
  })
}

export const isJWT = (token: string) => {
  return _isJWT(token || '')
}

export const isTaxID = (id: string) => {
  const val = _isTaxID(id)
  return val
}

export const isCitizenID = (id: string | number) => {
  if (id) {
    const val = Number(id)
    const isEven = val % 2 === 0
    if (id.toString().length === 11 && isEven) {
      return true
    }
    return false
  }
  return false
}

export const isValidPhoneNumber = (phoneNumber: string) => {
  return phone(phoneNumber, { strictDetection: true })
}
