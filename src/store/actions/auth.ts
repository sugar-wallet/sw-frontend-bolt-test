import { IKeyValuePair, ISendOtpPayload } from '@sw-npm-packages/types'

import * as types from '../types/auth'

export const updateAuthStatus = (
  key: string,
  value: string | IKeyValuePair<string | boolean | null>
) => ({
  type: types.UPDATE_AUTH_STATUS,
  key,
  value
})

export const handleSendOtp = (value: ISendOtpPayload) => ({
  type: types.HANDLE_SEND_OTP,
  value
})

export const handleResendOtp = () => ({
  type: types.HANDLE_RESEND_OTP
})

export const handleVerifyOtp = (value: {
  otp: string
  isOtpless?: boolean
}) => ({
  type: types.HANDLE_VERIFY_OTP,
  value
})

export const handleSecurityPinSendOtp = (
  value: IKeyValuePair<string | boolean | null>
) => ({
  type: types.HANDLE_SECURITY_PIN_SEND_OTP,
  value
})

export const handleSecurityPinVerify = (
  value: IKeyValuePair<string | boolean | null>
) => ({
  type: types.HANDLE_SECURITY_PIN_VERIFY,
  value
})

export const handleSecurityPinResendOtp = (
  value: IKeyValuePair<string | boolean | null>
) => ({
  type: types.HANDLE_SECURITY_PIN_RESEND_OTP,
  value
})

export const handleSecurityPinVerifyOtp = (
  value: IKeyValuePair<string | boolean | null>
) => ({
  type: types.HANDLE_SECURITY_PIN_VERIFY_OTP,
  value
})

export const handleLogout = () => ({
  type: types.HANDLE_LOGOUT
})

export const resetAuthState = () => ({
  type: types.RESET_AUTH_STATE
})

export const resetAuthStatus = () => ({
  type: types.RESET_AUTH_STATUS
})
