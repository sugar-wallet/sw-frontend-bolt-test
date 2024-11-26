import type { AxiosPromise, AxiosInstance } from 'axios'

import {
  TAxiosInstances,
  TStandardPayload,
  TStandardQueries
} from '@sw-npm-packages/types'

import { userFinanceEndpoints } from './endpoints'

class UserFinance {
  axiosInstanceV2: AxiosInstance

  constructor({ axiosInstanceV2 }: TAxiosInstances) {
    this.axiosInstanceV2 = axiosInstanceV2
  }

  fetchGoldTransactions = (queries: TStandardQueries): AxiosPromise => {
    return this.axiosInstanceV2.get(
      userFinanceEndpoints.goldTransactions,
      queries
    )
  }

  fetchUserBalance = (queries: TStandardQueries): AxiosPromise => {
    return this.axiosInstanceV2.get(userFinanceEndpoints.balance, queries)
  }

  collectUserFinanceInfo = (payload: TStandardPayload): AxiosPromise => {
    return this.axiosInstanceV2.post(
      userFinanceEndpoints.userFinanceInfo,
      payload
    )
  }

  collectUserBankAccount = (payload: TStandardPayload): AxiosPromise => {
    return this.axiosInstanceV2.post(
      userFinanceEndpoints.userBankAccount,
      payload
    )
  }

  collectUserUpiInfo = (payload: TStandardPayload): AxiosPromise => {
    return this.axiosInstanceV2.patch(userFinanceEndpoints.userUpiId, payload)
  }

  fetchUserBankAccount = (payload: TStandardPayload): AxiosPromise => {
    return this.axiosInstanceV2.get(
      userFinanceEndpoints.userBankAccount,
      payload
    )
  }

  fetchUserUpiId = (payload: TStandardPayload): AxiosPromise => {
    return this.axiosInstanceV2.get(userFinanceEndpoints.userUpiId, payload)
  }

  fetchPaymentSubscriptions = (payload: TStandardPayload): AxiosPromise => {
    return this.axiosInstanceV2.get(
      userFinanceEndpoints.paymentSubscriptions,
      payload
    )
  }

  cancelPaymentSubscription = (payload: TStandardPayload): AxiosPromise => {
    const { id, ...rest } = payload

    return this.axiosInstanceV2.delete(
      `${userFinanceEndpoints.paymentSubscriptions}${id}/`,
      rest
    )
  }

  akahuTokenExchange = (payload: TStandardPayload): AxiosPromise => {
    return this.axiosInstanceV2.post(
      userFinanceEndpoints.akahuTokenExchange,
      payload
    )
  }

  fetchUserAkahuAccounts = (payload: TStandardPayload): AxiosPromise => {
    return this.axiosInstanceV2.get(userFinanceEndpoints.akahuAccounts, payload)
  }
}

export { UserFinance }
