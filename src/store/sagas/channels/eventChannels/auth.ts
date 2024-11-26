import { eventChannel } from 'redux-saga'

import { IEvent } from '@sw-npm-packages/types'
import { authKeys, authEventEmitter } from 'helpers/events'

export function createAuthChannel() {
  return eventChannel((emitter) => {
    const handleLogoutHandler = (data: unknown) => {
      emitter({ type: authKeys.HANDLE_LOGOUT, data } as IEvent)
    }

    const loginSuccessHandler = (data: unknown) => {
      emitter({ type: authKeys.LOGIN_SUCCESS, data } as IEvent)
    }

    const logoutSuccessHandler = (data: unknown) => {
      emitter({ type: authKeys.LOGOUT_SUCCESS, data } as IEvent)
    }

    authEventEmitter.addListener(authKeys.HANDLE_LOGOUT, handleLogoutHandler)
    authEventEmitter.addListener(authKeys.LOGIN_SUCCESS, loginSuccessHandler)
    authEventEmitter.addListener(authKeys.LOGOUT_SUCCESS, logoutSuccessHandler)

    return () => {
      authEventEmitter.removeListener(
        authKeys.HANDLE_LOGOUT,
        handleLogoutHandler
      )

      authEventEmitter.removeListener(
        authKeys.LOGIN_SUCCESS,
        loginSuccessHandler
      )

      authEventEmitter.removeListener(
        authKeys.LOGOUT_SUCCESS,
        logoutSuccessHandler
      )
    }
  })
}
