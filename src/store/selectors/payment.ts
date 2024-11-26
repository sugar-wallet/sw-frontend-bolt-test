import { createSelector } from 'reselect'

import {
  CurrencySymbol,
  PAYMENT_VENDORS,
  REQUEST_RESPONSE_STATUS
} from '@sw-npm-packages/constants'
import { isNull } from '@sw-npm-packages/utils'

import { selectUserCurrency } from './user'

import { IInitialState } from '../reducers/payment'

interface IState {
  payment: IInitialState
}

export const selectPaymentIntentStatus = (state: IState) =>
  state.payment.paymentIntentStatus
export const selectIsPaymentIntentProcessing = createSelector(
  selectPaymentIntentStatus,
  (paymentIntentStatus) => {
    return paymentIntentStatus.status === REQUEST_RESPONSE_STATUS.PROCESSING
  }
)
export const selectPaymentStatus = (state: IState) =>
  state.payment.paymentStatus
export const selectIsPaymentProcessing = createSelector(
  selectPaymentStatus,
  (paymentStatus) => {
    return paymentStatus.status === REQUEST_RESPONSE_STATUS.PROCESSING
  }
)

export const selectPaymentGatewayProvider = createSelector(
  selectUserCurrency,
  (currency) => {
    if (isNull(currency)) return null

    if (currency?.toUpperCase() === CurrencySymbol.INR)
      return PAYMENT_VENDORS.RAZORPAY

    return PAYMENT_VENDORS.STRIPE
  }
)
