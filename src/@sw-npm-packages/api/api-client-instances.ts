import type { AxiosInstance } from 'axios'

import { IAxiosInstanceCreator } from '@sw-npm-packages/types'

import { createApiInstance } from './request'

const createApiClientInstances = ({
  environment,
  getAccessToken,
  getHeaders,
  responseErrorHandlers
}: IAxiosInstanceCreator) => {
  const axiosInstance: AxiosInstance = createApiInstance({
    environment,
    getAccessToken,
    getHeaders,
    responseErrorHandlers
  })

  const axiosInstanceV2: AxiosInstance = createApiInstance({
    environment,
    getAccessToken,
    getHeaders,
    responseErrorHandlers,
    version: 'v2'
  })

  const publicAxiosInstance: AxiosInstance = createApiInstance({
    environment,
    getHeaders,
    attachInterceptors: false,
    attachResponseInterceptors: true,
    responseErrorHandlers
  })

  const publicAxiosInstanceV2: AxiosInstance = createApiInstance({
    environment,
    getHeaders,
    attachInterceptors: false,
    attachResponseInterceptors: true,
    responseErrorHandlers,
    version: 'v2'
  })

  return {
    axiosInstance,
    axiosInstanceV2,
    publicAxiosInstance,
    publicAxiosInstanceV2
  }
}

export { createApiClientInstances }
