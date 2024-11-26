import type { AxiosError, AxiosResponse } from 'axios'

import { IResponseHandlers } from '@sw-npm-packages/types'
import { isFunction, logger } from '@sw-npm-packages/utils'

const responseSuccessInterceptor = (response: AxiosResponse) => {
  return response
}

const responseErrorInterceptor =
  ({ responseErrorHandlers }: IResponseHandlers) =>
  async (error: AxiosError) => {
    if (error.response) {
      logger.log('error.response.data :- ', error.response.data)

      const { status: errorStatusCode } = error.response

      if (errorStatusCode === 500) {
        if (
          responseErrorHandlers &&
          isFunction(responseErrorHandlers.ServerError)
        ) {
          await responseErrorHandlers.ServerError()
        }
      } else if (errorStatusCode === 401) {
        if (
          responseErrorHandlers &&
          isFunction(responseErrorHandlers.Unauthorized)
        ) {
          await responseErrorHandlers.Unauthorized()
        }
      } else if (errorStatusCode === 502) {
        if (
          responseErrorHandlers &&
          isFunction(responseErrorHandlers.BadGateway)
        ) {
          await responseErrorHandlers.BadGateway()
        }
      } else if (errorStatusCode === 503) {
        if (
          responseErrorHandlers &&
          isFunction(responseErrorHandlers.ServerUnavailable)
        ) {
          await responseErrorHandlers.ServerUnavailable()
        }
      }
    } else if (error.request) {
      // network error
      logger.error('no response received :- ', error)
      if (
        responseErrorHandlers &&
        isFunction(responseErrorHandlers.NetworkError)
      ) {
        await responseErrorHandlers.NetworkError()
      }
      return Promise.reject(new Error('Network Error'))
    } else {
      logger.error('Unexpected error occured :- ', error.message)
    }

    return Promise.reject(error)
  }

export { responseSuccessInterceptor, responseErrorInterceptor }
