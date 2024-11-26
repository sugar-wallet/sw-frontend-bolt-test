import type { AxiosPromise, AxiosInstance } from 'axios'

import {
  TAxiosInstances,
  TStandardPayload,
  TStandardQueries
} from '@sw-npm-packages/types'

import { goldEndpoints } from './endpoints'

class Gold {
  axiosInstanceV2: AxiosInstance

  constructor({ axiosInstanceV2 }: TAxiosInstances) {
    this.axiosInstanceV2 = axiosInstanceV2
  }

  fetchGoldPrice = (queries: TStandardQueries): AxiosPromise => {
    return this.axiosInstanceV2.get(goldEndpoints.goldPrice, queries)
  }

  sellGold = (payload: TStandardPayload): AxiosPromise => {
    return this.axiosInstanceV2.post(goldEndpoints.goldSell, payload)
  }

  buyGold = (payload: TStandardPayload): AxiosPromise => {
    return this.axiosInstanceV2.post(goldEndpoints.buyGold, payload)
  }

  startSubscription = (payload: TStandardPayload): AxiosPromise => {
    return this.axiosInstanceV2.post(goldEndpoints.subscription, payload)
  }

  cancelSubscription = (payload: TStandardPayload): AxiosPromise => {
    return this.axiosInstanceV2.delete(goldEndpoints.subscription, payload)
  }
}

export { Gold }
