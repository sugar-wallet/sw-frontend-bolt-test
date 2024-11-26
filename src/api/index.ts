import { createApiInstance } from '@sw-npm-packages/api'
import { environment } from '@sw-npm-packages/constants'
import { getAccessToken } from 'helpers'
import { emitHandleLogout } from 'helpers/events'

const config = {
  environment: environment?.toUpperCase(),
  getAccessToken: async () => {
    return Promise.resolve(getAccessToken() as string)
  },
  getHeaders: () => {
    return {
      // put additional headers if required
    }
  },
  responseErrorHandlers: {
    Unauthorized: async () => {
      emitHandleLogout()
    }
  }
}

const { authApi, userApi, userFinanceApi, goldApi, paymentApi } =
  createApiInstance(config)

export { authApi, userApi, userFinanceApi, goldApi, paymentApi }
