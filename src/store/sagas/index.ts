import { fork } from 'redux-saga/effects'

import { watchAnalyticsEventChannel } from './watchers/analytics'
import { watchAuthEventsChannel, watchAuthEvents } from './watchers/auth'
import { watchDataFetchEventChannel } from './watchers/data'
import { watchPaymentEvents } from './watchers/payment'
import { watchUserEvents } from './watchers/user'
import { watchUserFinanceEvents } from './watchers/user-finance'

const dataSaga = fork(watchDataFetchEventChannel)
const authSaga = [fork(watchAuthEventsChannel), fork(watchAuthEvents)]
const userSaga = fork(watchUserEvents)
const userFinanceSaga = fork(watchUserFinanceEvents)
const paymentSaga = fork(watchPaymentEvents)
const analyticsSaga = fork(watchAnalyticsEventChannel)

export {
  dataSaga,
  authSaga,
  userSaga,
  userFinanceSaga,
  paymentSaga,
  analyticsSaga
}
