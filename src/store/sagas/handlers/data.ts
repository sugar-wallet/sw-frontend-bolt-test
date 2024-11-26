import { setUser } from '@sentry/nextjs'
import { type AxiosResponse } from 'axios'
import { all, call, put } from 'redux-saga/effects'

import { USER_STATE_INFO, isDevelopment } from '@sw-npm-packages/constants'
import { IEventData } from '@sw-npm-packages/types'
import { isEmpty, logger, queryClient } from '@sw-npm-packages/utils'
import {
  fetchGoldLatestPrice,
  fetchUserAkahuAccounts,
  fetchUserBalance,
  fetchUserBankAccount,
  fetchUserGoldSubscriptions,
  fetchUserProfile,
  fetchUserTransactions,
  fetchUserUpiId
} from 'config'
import { setUserState, setUserCookieData, configureCurrency } from 'helpers'
import {
  dataKeys,
  emitFetchGoldLatestPrice,
  emitFetchUserBalance,
  emitFetchUserBankAccount,
  emitFetchUserGoldSubscriptions
} from 'helpers/events'
import { updateCurrency } from 'store/actions/user'

export function* handleFetchUserProfile(data: IEventData = {}) {
  const { refetch = false, isFirstTimeFetch = false } = data

  try {
    if (refetch) {
      yield queryClient.invalidateQueries({
        queryKey: [dataKeys.FETCH_USER_PROFILE],
        exact: true
      })
    }

    const response: AxiosResponse = yield queryClient.fetchQuery(
      fetchUserProfile()
    )

    logger.log('user profile data response :- ', response)

    // save currency in state
    yield put(updateCurrency(response.data.currency))

    // set currency
    yield call(configureCurrency, response.data.currency)

    setUserCookieData(response.data)

    if (!isDevelopment) {
      const { id, phone_number, email } = response.data

      // identify user to sentry
      yield call(setUser, { id, username: phone_number, email })
    }

    if (isFirstTimeFetch) {
      // now fetch initial data
      yield all([
        call(emitFetchUserBalance, { refetch: true }),
        call(emitFetchGoldLatestPrice, { refetch: true }),
        call(emitFetchUserGoldSubscriptions, { refetch: true }),
        call(emitFetchUserBankAccount, { refetch: true })
      ])
    }
  } catch (err) {
    logger.error('Error in handleFetchUserProfile :- ', err)
  }
}

export function* handleFetchUserBalance(data: IEventData = {}) {
  const { refetch = false } = data

  try {
    if (refetch) {
      yield queryClient.invalidateQueries({
        queryKey: [dataKeys.FETCH_USER_BALANCE],
        exact: true
      })
    }

    const response: AxiosResponse = yield queryClient.fetchQuery(
      fetchUserBalance()
    )

    logger.log('user balance data response :- ', response)
  } catch (err) {
    logger.error('Error in handleFetchUserBalance :- ', err)
  }
}

export function* handleFetchGoldLatestPrice(data: IEventData = {}) {
  const { refetch = false } = data

  try {
    if (refetch) {
      yield queryClient.invalidateQueries({
        queryKey: [dataKeys.FETCH_GOLD_LATEST_PRICE],
        exact: true
      })
    }

    const response: AxiosResponse = yield queryClient.fetchQuery(
      fetchGoldLatestPrice()
    )

    logger.log('gold latest price response :- ', response)
  } catch (err) {
    logger.error('Error in handleFetchGoldLatestPrice :- ', err)
  }
}

export function* handleFetchUserBankAccount(data: IEventData = {}) {
  const { refetch = false } = data

  try {
    if (refetch) {
      yield queryClient.invalidateQueries({
        queryKey: [dataKeys.FETCH_USER_BANK_ACCOUNT],
        exact: true
      })
    }

    const response: AxiosResponse = yield queryClient.fetchQuery(
      fetchUserBankAccount()
    )

    logger.log('user bank account response :- ', response)
  } catch (err) {
    logger.error('Error in handleFetchUserBankAccount :- ', err)
  }
}

export function* handleFetchUserGoldSubscriptions(data: IEventData = {}) {
  const { refetch = false } = data

  try {
    if (refetch) {
      yield queryClient.invalidateQueries({
        queryKey: [dataKeys.FETCH_USER_GOLD_SUBSCRIPTIONS],
        exact: true
      })
    }

    const response: AxiosResponse = yield queryClient.fetchQuery(
      fetchUserGoldSubscriptions()
    )

    logger.log('user gold subscriptions response :- ', response)

    if (!isEmpty(response.data)) {
      // subscription active
      yield call(setUserState, USER_STATE_INFO.IS_SUBSCRIPTION_ACTIVE, true)
    } else {
      yield call(setUserState, USER_STATE_INFO.IS_SUBSCRIPTION_ACTIVE, false)
    }
  } catch (err) {
    logger.error('Error in handleFetchUserGoldSubscriptions :- ', err)
  }
}

export function* handleFetchUserTransactions(data: IEventData = {}) {
  const { refetch = false } = data

  try {
    if (refetch) {
      yield queryClient.invalidateQueries({
        queryKey: [dataKeys.FETCH_USER_TRANSACTIONS],
        exact: true
      })
    }

    const response: AxiosResponse = yield queryClient.fetchQuery(
      fetchUserTransactions()
    )

    logger.log('user transactions response :- ', response)
  } catch (err) {
    logger.error('Error in handleFetchUserTransactions :- ', err)
  }
}

export function* handleFetchUserUpiId(data: IEventData = {}) {
  const { refetch = false } = data

  try {
    if (refetch) {
      yield queryClient.invalidateQueries({
        queryKey: [dataKeys.FETCH_USER_UPI_ID],
        exact: true
      })
    }

    const response: AxiosResponse = yield queryClient.fetchQuery(
      fetchUserUpiId()
    )

    logger.log('user upi id response :- ', response)
  } catch (err) {
    logger.error('Error in handleFetchUserUpiId :- ', err)
  }
}

export function* handleFetchUserAkahuAccounts(data: IEventData = {}) {
  const { refetch = false } = data

  try {
    if (refetch) {
      yield queryClient.invalidateQueries({
        queryKey: [dataKeys.FETCH_USER_AKAHU_ACCOUNTS],
        exact: true
      })
    }

    const response: AxiosResponse = yield queryClient.fetchQuery(
      fetchUserAkahuAccounts()
    )

    logger.log('akahu user accounts response :- ', response)
  } catch (err) {
    logger.error('Error in handleFetchUserAkahuAccounts :- ', err)
  }
}
