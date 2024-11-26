import type {
  AxiosError,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig
} from 'axios'

import { IRequestInterceptor } from '@sw-npm-packages/types'
import { isFunction, logger } from '@sw-npm-packages/utils'

const appendCommonRequestHeaders = (
  headers: AxiosRequestHeaders,
  getHeaders: IRequestInterceptor['getHeaders']
): AxiosRequestHeaders => {
  let modifiedHeaders = { ...headers }

  if (!Object.prototype.hasOwnProperty.call(headers, 'Content-Type')) {
    modifiedHeaders = {
      ...modifiedHeaders,
      'Content-Type': 'application/json'
    }
  }

  if (isFunction(getHeaders)) {
    modifiedHeaders = {
      ...modifiedHeaders,
      ...(getHeaders() || {})
    }
  }

  return modifiedHeaders as AxiosRequestHeaders
}

const requestSuccessInterceptor =
  ({ getAccessToken, getHeaders }: IRequestInterceptor) =>
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    const modifiedConfig = { ...config }
    let modifiedHeaders = { ...modifiedConfig.headers }

    if (
      isFunction(getAccessToken) &&
      !Object.prototype.hasOwnProperty.call(modifiedHeaders, 'Authorization')
    ) {
      const accessToken = await getAccessToken()

      if (accessToken) {
        modifiedHeaders = {
          ...modifiedHeaders,
          Authorization: `Bearer ${accessToken}`
        }
      }
    }

    return {
      ...modifiedConfig,
      headers: appendCommonRequestHeaders(
        modifiedHeaders as AxiosRequestHeaders,
        getHeaders
      )
    }
  }

const publicApiRequestSuccessInterceptor =
  ({ getHeaders }: IRequestInterceptor) =>
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const modifiedConfig = { ...config }
    const modifiedHeaders = { ...modifiedConfig.headers }

    return {
      ...modifiedConfig,
      headers: appendCommonRequestHeaders(
        modifiedHeaders as AxiosRequestHeaders,
        getHeaders
      )
    }
  }

const requestErrorInterceptor = (error: AxiosError) => {
  logger.log('Error in request handling :- ', error)
  return Promise.reject(error)
}

export {
  requestSuccessInterceptor,
  requestErrorInterceptor,
  publicApiRequestSuccessInterceptor
}
