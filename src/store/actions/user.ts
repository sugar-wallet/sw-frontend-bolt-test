import { CurrencySymbol } from '@sw-npm-packages/constants'
import { IKeyValuePair } from '@sw-npm-packages/types'

import * as types from '../types/user'

export const updateUserStatus = (
  key: string,
  value: string | IKeyValuePair<string | boolean | null>
) => ({
  type: types.UPDATE_USER_STATUS,
  key,
  value
})

export const handleRegisterUser = (
  value: IKeyValuePair<string | boolean | undefined>
) => ({
  type: types.HANDLE_REGISTER_USER,
  value
})

export const handleUpdateUser = (
  value: IKeyValuePair<string | boolean | undefined>
) => ({
  type: types.HANDLE_UPDATE_USER,
  value
})

export const updateCurrency = (value: CurrencySymbol) => ({
  type: types.UPDATE_CURRENCY,
  value
})

export const fetchLandingPage = (
  value: IKeyValuePair<string | boolean | undefined>
) => ({
  type: types.FETCH_LANDING_PAGE,
  value
})

export const resetUserState = () => ({
  type: types.RESET_USER_STATE
})
