import type { AxiosInstance } from 'axios'
import axios from 'axios'

import { IAxiosInstanceCreator } from '@sw-npm-packages/types'

import { getApiURL } from './helpers'
import { createInterceptors } from './interceptors'

const createApiInstance = ({
  environment,
  getAccessToken,
  getHeaders,
  attachInterceptors = true,
  attachResponseInterceptors = false,
  responseErrorHandlers,
  version
}: IAxiosInstanceCreator): AxiosInstance => {
  const baseURL = getApiURL(environment, version)

  const apiInstance = axios.create({
    baseURL
  })

  if (attachInterceptors) {
    // attach both request and response interceptors
    const {
      requestSuccessInterceptor,
      requestErrorInterceptor,
      responseSuccessInterceptor,
      responseErrorInterceptor
    } = createInterceptors({
      getAccessToken,
      getHeaders,
      responseErrorHandlers
    })

    apiInstance.interceptors.request.use(
      requestSuccessInterceptor,
      requestErrorInterceptor
    )

    apiInstance.interceptors.response.use(
      responseSuccessInterceptor,
      responseErrorInterceptor
    )
  } else if (attachResponseInterceptors) {
    const {
      publicApiRequestSuccessInterceptor,
      responseSuccessInterceptor,
      responseErrorInterceptor
    } = createInterceptors({
      getHeaders,
      responseErrorHandlers
    })

    apiInstance.interceptors.request.use(publicApiRequestSuccessInterceptor)

    apiInstance.interceptors.response.use(
      responseSuccessInterceptor,
      responseErrorInterceptor
    )
  }

  return apiInstance
}

export { createApiInstance }
