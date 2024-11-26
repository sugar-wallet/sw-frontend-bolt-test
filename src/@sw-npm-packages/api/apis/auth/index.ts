import type { AxiosPromise, AxiosInstance } from 'axios'

import { TAxiosInstances, TStandardPayload } from '@sw-npm-packages/types'

import { authEndpoints } from './endpoints'

class Auth {
  publicAxiosInstanceV2: AxiosInstance
  axiosInstanceV2: AxiosInstance

  constructor({ publicAxiosInstanceV2, axiosInstanceV2 }: TAxiosInstances) {
    this.publicAxiosInstanceV2 = publicAxiosInstanceV2
    this.axiosInstanceV2 = axiosInstanceV2
  }

  sendOTP = (payload: TStandardPayload): AxiosPromise => {
    return this.publicAxiosInstanceV2.post(authEndpoints.sendOTP, payload)
  }

  verifyOTP = (payload: TStandardPayload): AxiosPromise => {
    return this.publicAxiosInstanceV2.post(authEndpoints.verifyOTP, payload)
  }

  securityPinSendOTP = (): AxiosPromise => {
    return this.axiosInstanceV2.post(authEndpoints.securityPinSendOTP)
  }

  securityPinVerifyOTP = (payload: TStandardPayload): AxiosPromise => {
    return this.axiosInstanceV2.post(
      authEndpoints.securityPinVerifyOTP,
      payload
    )
  }
}

export { Auth }
