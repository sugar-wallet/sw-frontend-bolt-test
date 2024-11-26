import type { AxiosPromise, AxiosInstance } from 'axios'

import { TAxiosInstances, TStandardPayload } from '@sw-npm-packages/types'

import { paymentEndpoints } from './endpoints'

class Payment {
  axiosInstanceV2: AxiosInstance

  constructor({ axiosInstanceV2 }: TAxiosInstances) {
    this.axiosInstanceV2 = axiosInstanceV2
  }

  stripePaymentIntentInfo = (payload: TStandardPayload): AxiosPromise => {
    const { id, ...rest } = payload

    return this.axiosInstanceV2.get(
      `${paymentEndpoints.stripePaymentIntentInfo}${id}/`,
      rest
    )
  }

  razorpayPaymentIntentInfo = (payload: TStandardPayload): AxiosPromise => {
    const { id, ...rest } = payload

    return this.axiosInstanceV2.get(
      `${paymentEndpoints.razorpayPaymentIntentInfo}${id}/`,
      rest
    )
  }

  akahuPaymentIntentInfo = (payload: TStandardPayload): AxiosPromise => {
    const { id, ...rest } = payload

    return this.axiosInstanceV2.get(
      `${paymentEndpoints.akahuPaymentIntentInfo}${id}/`,
      rest
    )
  }
}

export { Payment }
