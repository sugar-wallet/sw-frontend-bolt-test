import { takeLatest } from 'redux-saga/effects'

import * as types from '../../types/payment'
import { handlePaymentEvents } from '../handlers/payment'

export function* watchPaymentEvents() {
  yield takeLatest(
    [
      types.HANDLE_PAYMENT_INTENT,
      types.HANDLE_CONFIRM_PAYMENT,
      types.HANDLE_RETRIEVE_PAYMENT_INTENT
    ],
    handlePaymentEvents
  )
}
