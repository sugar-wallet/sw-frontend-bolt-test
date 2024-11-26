import { HYDRATE } from 'next-redux-wrapper'
import { type Value } from 'react-phone-number-input'
import type { AnyAction } from 'redux'

import { getCountryCode } from '@sw-npm-packages/config'
import { IApiRequestProcessing } from '@sw-npm-packages/types'
import { LOGIN_METHODS } from '@sw-npm-packages/types/login'
import { multiLoginCountries } from 'config'
import { AUTH_STATE_KEYS } from 'store/constants/auth'

import * as types from '../types/auth'

export interface IInitialState {
  phoneNumber: {
    value: Value | undefined
    isValid: false
    country: string
  }
  email?: string
  emailAlreadyExists?: boolean
  otpOrderId?: string
  loginMethod: LOGIN_METHODS
  sendOTPStatus: IApiRequestProcessing
  resendOTPStatus: IApiRequestProcessing
  verifyOTPStatus: IApiRequestProcessing
  verifyPinStatus: IApiRequestProcessing
  securityPin: string
}

const initialStatusState = {
  sendOTPStatus: {
    status: null,
    errorMessage: ''
  },
  resendOTPStatus: {
    status: null,
    errorMessage: ''
  },
  verifyOTPStatus: {
    status: null,
    errorMessage: ''
  },
  verifyPinStatus: {
    status: null,
    errorMessage: ''
  }
}

const countryCode = getCountryCode()

const initialState: IInitialState = {
  phoneNumber: {
    value: undefined,
    isValid: false,
    country: ''
  },
  email: '',
  emailAlreadyExists: true,
  loginMethod: LOGIN_METHODS.EMAIL,
  // loginMethod: multiLoginCountries.includes(countryCode)
  //   ? LOGIN_METHODS.EMAIL
  //   : LOGIN_METHODS.SMS,
  securityPin: '',
  ...initialStatusState
}

const handleAuthState = (state: IInitialState, action: AnyAction) => {
  switch (action.key) {
    case AUTH_STATE_KEYS.SET_LOGIN_METHOD:
      return {
        ...state,
        loginMethod: action.value
      }
    case AUTH_STATE_KEYS.PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: {
          value: action.value?.value,
          isValid: action.value?.isValid,
          country: action.value?.country
        }
      }
    case AUTH_STATE_KEYS.EMAIL:
      return {
        ...state,
        email: action.value
      }

    case AUTH_STATE_KEYS.EMAIL_ALREADY_EXISTS:
      return {
        ...state,
        emailAlreadyExists: action.value
      }

    case AUTH_STATE_KEYS.SEND_OTP:
      return {
        ...state,
        otpOrderId: action.value?.otpOrderId,
        sendOTPStatus: {
          status: action.value?.status,
          errorMessage: action.value?.errorMessage
        }
      }

    case AUTH_STATE_KEYS.RESEND_OTP:
      return {
        ...state,
        resendOTPStatus: {
          status: action.value?.status,
          errorMessage: action.value?.errorMessage
        }
      }

    case AUTH_STATE_KEYS.VERIFY_OTP:
      return {
        ...state,
        verifyOTPStatus: {
          status: action.value?.status,
          errorMessage: action.value?.errorMessage
        }
      }

    case AUTH_STATE_KEYS.VERIFY_PIN:
      return {
        ...state,
        verifyPinStatus: {
          status: action.value?.status,
          errorMessage: action.value?.errorMessage
        }
      }

    case AUTH_STATE_KEYS.SECURITY_PIN:
      return {
        ...state,
        securityPin: action.value?.securityPin
      }

    default:
      return state
  }
}

const authReducer = (
  state: IInitialState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload }

    case types.UPDATE_AUTH_STATUS:
      return handleAuthState(state, action)

    case types.RESET_AUTH_STATUS:
      return {
        ...state,
        ...initialStatusState
      }

    case types.RESET_AUTH_STATE:
      return initialState

    default:
      return state
  }
}

export { authReducer }
