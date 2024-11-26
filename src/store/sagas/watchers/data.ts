// eslint-disable-next-line import/no-unresolved
import { NotUndefined } from '@redux-saga/types'
import { type EventChannel } from 'redux-saga'
import { call, cancelled, takeEvery } from 'redux-saga/effects'

import { IEvent } from '@sw-npm-packages/types'
import { logger } from '@sw-npm-packages/utils'
import { dataKeys } from 'helpers/events'

import { createDataFetchChannel } from '../channels/eventChannels/data'
import {
  handleFetchGoldLatestPrice,
  handleFetchUserAkahuAccounts,
  handleFetchUserBalance,
  handleFetchUserBankAccount,
  handleFetchUserGoldSubscriptions,
  handleFetchUserProfile,
  handleFetchUserTransactions,
  handleFetchUserUpiId
} from '../handlers/data'

export function* watchDataFetchEventChannel() {
  const channel: EventChannel<NotUndefined> = yield call(createDataFetchChannel)

  function* handler(event: IEvent) {
    switch (event.type) {
      case dataKeys.FETCH_USER_PROFILE:
        yield handleFetchUserProfile(event.data)
        break

      case dataKeys.FETCH_USER_BALANCE:
        yield handleFetchUserBalance(event.data)
        break

      case dataKeys.FETCH_GOLD_LATEST_PRICE:
        yield handleFetchGoldLatestPrice(event.data)
        break

      case dataKeys.FETCH_USER_BANK_ACCOUNT:
        yield handleFetchUserBankAccount(event.data)
        break

      case dataKeys.FETCH_USER_GOLD_SUBSCRIPTIONS:
        yield handleFetchUserGoldSubscriptions(event.data)
        break

      case dataKeys.FETCH_USER_TRANSACTIONS:
        yield handleFetchUserTransactions(event.data)
        break

      case dataKeys.FETCH_USER_UPI_ID:
        yield handleFetchUserUpiId(event.data)
        break

      case dataKeys.FETCH_USER_AKAHU_ACCOUNTS:
        yield handleFetchUserAkahuAccounts(event.data)
        break

      default:
        break
    }
  }

  try {
    yield takeEvery(channel, handler)
  } catch (err) {
    logger.error('Error in watchDataFetchEventChannel :- ', err)
  } finally {
    if ((yield cancelled()) as boolean) {
      channel.close()
      logger.info('watchDataFetchEventChannel channel closed')
    }
  }
}
