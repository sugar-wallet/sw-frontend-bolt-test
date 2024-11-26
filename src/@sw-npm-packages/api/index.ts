import { IAxiosInstanceCreator } from '@sw-npm-packages/types'

import { createApiClientInstances } from './api-client-instances'
import { Auth, User, UserFinance, Gold, Payment } from './apis'

const createApiInstance = ({
  environment,
  getAccessToken,
  getHeaders,
  responseErrorHandlers
}: IAxiosInstanceCreator) => {
  const { axiosInstanceV2, publicAxiosInstance, publicAxiosInstanceV2 } =
    createApiClientInstances({
      environment,
      getAccessToken,
      getHeaders,
      responseErrorHandlers
    })

  // create api instances
  const authApi = new Auth({
    publicAxiosInstance,
    publicAxiosInstanceV2,
    axiosInstanceV2
  })
  const userApi = new User({ axiosInstanceV2 })
  const userFinanceApi = new UserFinance({ axiosInstanceV2 })
  const goldApi = new Gold({ axiosInstanceV2 })
  const paymentApi = new Payment({ axiosInstanceV2 })

  return {
    authApi,
    userApi,
    userFinanceApi,
    goldApi,
    paymentApi
  }
}

export { createApiInstance }
