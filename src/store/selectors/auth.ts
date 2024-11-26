import { createSelector } from 'reselect'

import { REQUEST_RESPONSE_STATUS } from '@sw-npm-packages/constants'

import { IInitialState } from '../reducers/auth'

interface IState {
  auth: IInitialState
}

export const selectPhoneNumber = (state: IState) => state.auth.phoneNumber.value
export const selectEmail = (state: IState) => state.auth.email
export const selectEmailAlreadyExists = (state: IState) =>
  state.auth.emailAlreadyExists
export const selectCountry = (state: IState) => state.auth.phoneNumber.country
export const selectIsPhoneNumberValid = (state: IState) =>
  state.auth.phoneNumber.isValid
export const selectSendOTPStatus = (state: IState) => state.auth.sendOTPStatus
export const selectResendOTPStatus = (state: IState) =>
  state.auth.resendOTPStatus
export const selectVerifyOTPStatus = (state: IState) =>
  state.auth.verifyOTPStatus

export const selectIsOTPSent = createSelector(
  selectSendOTPStatus,
  (sendOTPStatus) => {
    return sendOTPStatus.status === REQUEST_RESPONSE_STATUS.SUCCESS
  }
)

export const selectLoginMethod = (state: IState) => state.auth.loginMethod
export const selectSecurityPin = (state: IState) => state.auth.securityPin

export const selectAuthOtpError = (state: IState) =>
  state.auth.verifyOTPStatus.status === REQUEST_RESPONSE_STATUS.ERROR
    ? state.auth.verifyOTPStatus.errorMessage
    : ''

export const selectAuthPinError = (state: IState) =>
  state.auth.verifyPinStatus.status === REQUEST_RESPONSE_STATUS.ERROR
    ? state.auth.verifyPinStatus.errorMessage
    : ''

export const selectOtpOrderId = (state: IState) => state.auth.otpOrderId
