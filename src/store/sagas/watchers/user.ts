import { takeEvery } from 'redux-saga/effects'

import * as types from '../../types/user'
import { handleUserEvents } from '../handlers/user'

export function* watchUserEvents() {
  yield takeEvery(
    [
      types.HANDLE_REGISTER_USER,
      types.HANDLE_UPDATE_USER,
      types.FETCH_LANDING_PAGE
    ],
    handleUserEvents
  )
}
