import { createEventEmitter } from '@sw-npm-packages/utils'

import { dataKeys } from './constants'

export const dataEventEmitter = createEventEmitter()

export const emitFetchUserProfile = (data = {}) => {
  dataEventEmitter.emit(dataKeys.FETCH_USER_PROFILE, data)
}

export const emitFetchUserBalance = (data = {}) => {
  dataEventEmitter.emit(dataKeys.FETCH_USER_BALANCE, data)
}

export const emitFetchUserUpiId = (data = {}) => {
  dataEventEmitter.emit(dataKeys.FETCH_USER_UPI_ID, data)
}

export const emitFetchGoldLatestPrice = (data = {}) => {
  dataEventEmitter.emit(dataKeys.FETCH_GOLD_LATEST_PRICE, data)
}

export const emitFetchUserBankAccount = (data = {}) => {
  dataEventEmitter.emit(dataKeys.FETCH_USER_BANK_ACCOUNT, data)
}

export const emitFetchUserGoldSubscriptions = (data = {}) => {
  dataEventEmitter.emit(dataKeys.FETCH_USER_GOLD_SUBSCRIPTIONS, data)
}

export const emitFetchUserTransactions = (data = {}) => {
  dataEventEmitter.emit(dataKeys.FETCH_USER_TRANSACTIONS, data)
}

export const emitFetchUserAkahuAccounts = (data = {}) => {
  dataEventEmitter.emit(dataKeys.FETCH_USER_AKAHU_ACCOUNTS, data)
}
