import {
  IConfirmPayment,
  IKeyValuePair,
  IPaymentIntent,
  IRetrievePayment
} from '@sw-npm-packages/types'

import * as types from '../types/payment'

export const updatePaymentStatus = (
  key: string,
  value: string | IKeyValuePair<string | boolean | null | unknown>
) => ({
  type: types.UPDATE_PAYMENT_STATUS,
  key,
  value
})

export const handlePaymentIntent = (data: IPaymentIntent) => ({
  type: types.HANDLE_PAYMENT_INTENT,
  data
})

export const handleConfirmPayment = (data: IConfirmPayment) => ({
  type: types.HANDLE_CONFIRM_PAYMENT,
  data
})

export const handleRetrievePaymentIntent = (data: IRetrievePayment) => ({
  type: types.HANDLE_RETRIEVE_PAYMENT_INTENT,
  data
})

export const resetPaymentState = () => ({
  type: types.RESET_PAYMENT_STATE
})
