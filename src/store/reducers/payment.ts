import { HYDRATE } from 'next-redux-wrapper'
import type { AnyAction } from 'redux'

import { IApiRequestProcessing } from '@sw-npm-packages/types'
import { PAYMENT_STATE_KEYS } from 'store/constants/payment'

import * as types from '../types/payment'

export interface IInitialState {
  paymentIntentStatus: IApiRequestProcessing
  paymentStatus: IApiRequestProcessing
}

const initialState: IInitialState = {
  paymentIntentStatus: {
    status: null,
    errorMessage: ''
  },
  paymentStatus: {
    status: null,
    errorMessage: ''
  }
}

const handlePaymentState = (state: IInitialState, action: AnyAction) => {
  switch (action.key) {
    case PAYMENT_STATE_KEYS.PAYMENT_INTENT:
      return {
        ...state,
        paymentIntentStatus: {
          status: action.value?.status,
          errorMessage: action.value?.errorMessage
        }
      }

    case PAYMENT_STATE_KEYS.PAYMENT:
      return {
        ...state,
        paymentStatus: {
          status: action.value?.status,
          data: action.value?.data,
          errorMessage: action.value?.errorMessage
        }
      }

    default:
      return state
  }
}

const paymentReducer = (
  state: IInitialState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload }

    case types.UPDATE_PAYMENT_STATUS:
      return handlePaymentState(state, action)

    case types.RESET_PAYMENT_STATE:
      return initialState

    default:
      return state
  }
}

export { paymentReducer }
