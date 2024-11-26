import { REQUEST_RESPONSE_STATUS } from '@sw-npm-packages/constants'

import { IInitialState } from '../reducers/user'

interface IState {
  user: IInitialState
}

export const selectUserCurrency = (state: IState) => state.user.currency

export const selectIsRegisteringUser = (state: IState) =>
  state.user.registerUserStatus?.status === REQUEST_RESPONSE_STATUS.PROCESSING
