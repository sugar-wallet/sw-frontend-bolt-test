import { eventChannel } from 'redux-saga'

import { IEvent } from '@sw-npm-packages/types'
import { dataKeys, dataEventEmitter } from 'helpers/events'

export function createDataFetchChannel() {
  return eventChannel((emitter) => {
    const userProfileHandler = (data: unknown) => {
      emitter({ type: dataKeys.FETCH_USER_PROFILE, data } as IEvent)
    }

    const userBalanceHandler = (data: unknown) => {
      emitter({ type: dataKeys.FETCH_USER_BALANCE, data } as IEvent)
    }

    const userUpiIdHandler = (data: unknown) => {
      emitter({ type: dataKeys.FETCH_USER_UPI_ID, data } as IEvent)
    }

    const goldLatestPriceHandler = (data: unknown) => {
      emitter({ type: dataKeys.FETCH_GOLD_LATEST_PRICE, data } as IEvent)
    }

    const userBankAccountHandler = (data: unknown) => {
      emitter({ type: dataKeys.FETCH_USER_BANK_ACCOUNT, data } as IEvent)
    }

    const userGoldSubscriptionsHandler = (data: unknown) => {
      emitter({ type: dataKeys.FETCH_USER_GOLD_SUBSCRIPTIONS, data } as IEvent)
    }

    const userTransactionsHandler = (data: unknown) => {
      emitter({ type: dataKeys.FETCH_USER_TRANSACTIONS, data } as IEvent)
    }

    const userAkahuAccountsHandler = (data: unknown) => {
      emitter({ type: dataKeys.FETCH_USER_AKAHU_ACCOUNTS, data } as IEvent)
    }

    dataEventEmitter.addListener(
      dataKeys.FETCH_USER_PROFILE,
      userProfileHandler
    )

    dataEventEmitter.addListener(
      dataKeys.FETCH_USER_BALANCE,
      userBalanceHandler
    )

    dataEventEmitter.addListener(dataKeys.FETCH_USER_UPI_ID, userUpiIdHandler)

    dataEventEmitter.addListener(
      dataKeys.FETCH_GOLD_LATEST_PRICE,
      goldLatestPriceHandler
    )

    dataEventEmitter.addListener(
      dataKeys.FETCH_USER_BANK_ACCOUNT,
      userBankAccountHandler
    )

    dataEventEmitter.addListener(
      dataKeys.FETCH_USER_GOLD_SUBSCRIPTIONS,
      userGoldSubscriptionsHandler
    )

    dataEventEmitter.addListener(
      dataKeys.FETCH_USER_TRANSACTIONS,
      userTransactionsHandler
    )

    dataEventEmitter.addListener(
      dataKeys.FETCH_USER_AKAHU_ACCOUNTS,
      userAkahuAccountsHandler
    )

    return () => {
      dataEventEmitter.removeListener(
        dataKeys.FETCH_USER_PROFILE,
        userProfileHandler
      )

      dataEventEmitter.removeListener(
        dataKeys.FETCH_USER_BALANCE,
        userBalanceHandler
      )

      dataEventEmitter.removeListener(
        dataKeys.FETCH_USER_UPI_ID,
        userUpiIdHandler
      )

      dataEventEmitter.removeListener(
        dataKeys.FETCH_GOLD_LATEST_PRICE,
        goldLatestPriceHandler
      )

      dataEventEmitter.removeListener(
        dataKeys.FETCH_USER_BANK_ACCOUNT,
        userBankAccountHandler
      )

      dataEventEmitter.removeListener(
        dataKeys.FETCH_USER_GOLD_SUBSCRIPTIONS,
        userGoldSubscriptionsHandler
      )

      dataEventEmitter.removeListener(
        dataKeys.FETCH_USER_TRANSACTIONS,
        userTransactionsHandler
      )

      dataEventEmitter.removeListener(
        dataKeys.FETCH_USER_AKAHU_ACCOUNTS,
        userAkahuAccountsHandler
      )
    }
  })
}
