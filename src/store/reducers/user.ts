import { HYDRATE } from 'next-redux-wrapper'
import type { AnyAction } from 'redux'

import { CurrencySymbol } from '@sw-npm-packages/constants'
import { IApiRequestProcessing } from '@sw-npm-packages/types'
import { USER_STATE_KEYS } from 'store/constants/user'

import * as types from '../types/user'

export interface IInitialState {
  currency: CurrencySymbol | null
  registerUserStatus: IApiRequestProcessing
  fetchLandingPageStatus: IApiRequestProcessing
}

const initialState: IInitialState = {
  currency: null,
  registerUserStatus: {
    status: null,
    errorMessage: ''
  },
  fetchLandingPageStatus: {
    status: null,
    errorMessage: ''
  }
}

const handleUserState = (state: IInitialState, action: AnyAction) => {
  switch (action.key) {
    case USER_STATE_KEYS.REGISTER_USER:
      return {
        ...state,
        registerUserStatus: {
          status: action.value?.status,
          errorMessage: action.value?.errorMessage
        }
      }

    case USER_STATE_KEYS.FETCH_LANDING_PAGE:
      return {
        ...state,
        fetchLandingPageStatus: {
          status: action.value?.status,
          errorMessage: action.value?.errorMessage
        }
      }

    default:
      return state
  }
}

const userReducer = (
  state: IInitialState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload }

    case types.UPDATE_CURRENCY:
      return {
        ...state,
        currency: action.value
      }

    case types.UPDATE_USER_STATUS:
      return handleUserState(state, action)

    case types.RESET_USER_STATE:
      return initialState

    default:
      return state
  }
}

export { userReducer }
