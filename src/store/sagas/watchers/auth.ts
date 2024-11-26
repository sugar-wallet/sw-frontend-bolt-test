// eslint-disable-next-line import/no-unresolved
import { NotUndefined } from '@redux-saga/types'
import { type EventChannel } from 'redux-saga'
import { call, cancelled, takeEvery } from 'redux-saga/effects'

import { IEvent } from '@sw-npm-packages/types'
import { logger } from '@sw-npm-packages/utils'
import { authKeys } from 'helpers/events'

import * as types from '../../types/auth'
import { createAuthChannel } from '../channels/eventChannels/auth'
import {
  handleAuthEvents,
  handleLoginSuccess,
  handleLogoutSuccess,
  handleLogoutEvent
} from '../handlers/auth'

export function* watchAuthEventsChannel() {
  const channel: EventChannel<NotUndefined> = yield call(createAuthChannel)

  function* handler(event: IEvent) {
    switch (event.type) {
      case authKeys.HANDLE_LOGOUT:
        yield handleLogoutEvent()
        break

      case authKeys.LOGIN_SUCCESS:
        yield handleLoginSuccess()
        break

      case authKeys.LOGOUT_SUCCESS:
        yield handleLogoutSuccess()
        break

      default:
        break
    }
  }

  try {
    yield takeEvery(channel, handler)
  } catch (err) {
    logger.error('Error in watchAuthEventsChannel :- ', err)
  } finally {
    if ((yield cancelled()) as boolean) {
      channel.close()
      logger.info('watchAuthEventsChannel channel closed')
    }
  }
}

export function* watchAuthEvents() {
  yield takeEvery(
    [
      types.HANDLE_SEND_OTP,
      types.HANDLE_RESEND_OTP,
      types.HANDLE_VERIFY_OTP,
      types.HANDLE_LOGOUT,
      types.HANDLE_SECURITY_PIN_VERIFY,
      types.HANDLE_SECURITY_PIN_SEND_OTP,
      types.HANDLE_SECURITY_PIN_RESEND_OTP,
      types.HANDLE_SECURITY_PIN_VERIFY_OTP
    ],
    handleAuthEvents
  )
}
