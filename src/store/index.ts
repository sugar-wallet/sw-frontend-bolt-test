import { createWrapper, type Context } from 'next-redux-wrapper'
import {
  type AnyAction,
  type Store,
  combineReducers,
  createStore,
  applyMiddleware
} from 'redux'
import createSagaMiddleware, { type Task } from 'redux-saga'
import { all } from 'redux-saga/effects'

import { isProduction } from '@sw-npm-packages/constants'

import { appReducer } from './reducers/app'
import { authReducer } from './reducers/auth'
import { modalReducer } from './reducers/modal'
import { paymentReducer } from './reducers/payment'
import { userReducer } from './reducers/user'
import { userFinanceReducer } from './reducers/user-finance'
import {
  dataSaga,
  authSaga,
  userSaga,
  userFinanceSaga,
  paymentSaga,
  analyticsSaga
} from './sagas'

export interface SagaStore extends Store {
  sagaTask?: Task
}

const filterActionPropagation =
  () => (next: (arg: AnyAction) => void) => (action: AnyAction) => {
    if (!action.type?.includes('HANDLE_')) return next(action)
  }

const reducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  user: userReducer,
  userFinance: userFinanceReducer,
  payment: paymentReducer,
  modal: modalReducer
})

function* rootSaga() {
  yield all([
    dataSaga,
    ...authSaga,
    userSaga,
    userFinanceSaga,
    paymentSaga,
    analyticsSaga
  ])
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const makeStore = (context: Context) => {
  const sagaMiddleware = createSagaMiddleware()

  const middlewares = [sagaMiddleware, filterActionPropagation]

  const store: SagaStore = createStore(
    reducers,
    applyMiddleware(...middlewares)
  )

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export const wrapper = createWrapper(makeStore, {
  debug: !isProduction
})
