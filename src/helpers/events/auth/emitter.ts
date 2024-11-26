import { createEventEmitter } from '@sw-npm-packages/utils'

import { authKeys } from './constants'

export const authEventEmitter = createEventEmitter()

export const emitHandleLogout = (data = {}) => {
  authEventEmitter.emit(authKeys.HANDLE_LOGOUT, data)
}

export const emitLoginSuccess = (data = {}) => {
  authEventEmitter.emit(authKeys.LOGIN_SUCCESS, data)
}

export const emitLogoutSuccess = (data = {}) => {
  authEventEmitter.emit(authKeys.LOGOUT_SUCCESS, data)
}
