import { IInterceptor, IInterceptorCreator } from '@sw-npm-packages/types'

import {
  requestSuccessInterceptor,
  requestErrorInterceptor,
  publicApiRequestSuccessInterceptor
} from './request'
import {
  responseSuccessInterceptor,
  responseErrorInterceptor
} from './response'

const createInterceptors = ({
  getAccessToken,
  getHeaders,
  responseErrorHandlers
}: IInterceptor): IInterceptorCreator => {
  return {
    requestSuccessInterceptor: requestSuccessInterceptor({
      getAccessToken,
      getHeaders
    }),
    requestErrorInterceptor,
    responseSuccessInterceptor,
    responseErrorInterceptor: responseErrorInterceptor({
      responseErrorHandlers
    }),
    publicApiRequestSuccessInterceptor: publicApiRequestSuccessInterceptor({
      getHeaders
    })
  }
}

export { createInterceptors }
