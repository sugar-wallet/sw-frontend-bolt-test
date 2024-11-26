import { takeEvery } from 'redux-saga/effects'

import * as types from '../../types/user-finance'
import { handleUserFinanceEvents } from '../handlers/user-finance'

export function* watchUserFinanceEvents() {
  yield takeEvery(
    [
      types.HANDLE_BUY_GOLD,
      types.HANDLE_AUTO_INVEST_GOLD,
      types.HANDLE_CANCEL_AUTO_INVEST_GOLD,
      types.HANDLE_SELL_GOLD,
      types.HANDLE_USER_INFO,
      types.HANDLE_USER_BANK_ACCOUNT,
      types.HANDLE_USER_UPI_ID,
      types.HANDLE_AKAHU_USER_TOKEN_REGISTRATION,
      types.HANDLE_AKAHU_USER_TOKEN_EXCHANGE
    ],
    handleUserFinanceEvents
  )
}
