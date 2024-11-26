import { HYDRATE } from 'next-redux-wrapper'
import type { AnyAction } from 'redux'

import {
  IApiRequestProcessing,
  IAutoInvestGoldData,
  IBuyGoldData,
  ISellGoldData
} from '@sw-npm-packages/types'
import { USER_FINANCE_STATE_KEYS } from 'store/constants/user-finance'

import * as types from '../types/user-finance'

export interface IInitialState {
  buyGoldData: IBuyGoldData | Record<string, never>
  autoInvestGoldData: IAutoInvestGoldData | Record<string, never>
  sellGoldData: ISellGoldData | Record<string, never>
  buyGoldStatus: IApiRequestProcessing
  investGoldStatus: IApiRequestProcessing
  cancelInvestGoldStatus: IApiRequestProcessing
  sellGoldStatus: IApiRequestProcessing
  userInfoStatus: IApiRequestProcessing
  userBankAccountStatus: IApiRequestProcessing
  resendOtp: IApiRequestProcessing
  verifyOtp: IApiRequestProcessing
}

const initialState: IInitialState = {
  buyGoldData: {},
  autoInvestGoldData: {},
  sellGoldData: {},
  buyGoldStatus: {
    status: null,
    errorMessage: ''
  },
  investGoldStatus: {
    status: null,
    errorMessage: ''
  },
  cancelInvestGoldStatus: {
    status: null,
    errorMessage: ''
  },
  sellGoldStatus: {
    status: null,
    errorMessage: ''
  },
  userInfoStatus: {
    status: null,
    errorMessage: ''
  },
  userBankAccountStatus: {
    status: null,
    errorMessage: ''
  },
  resendOtp: {
    status: null,
    errorMessage: ''
  },
  verifyOtp: {
    status: null,
    errorMessage: ''
  }
}

const handleUserFinanceState = (state: IInitialState, action: AnyAction) => {
  switch (action.key) {
    case USER_FINANCE_STATE_KEYS.BUY_GOLD:
      return {
        ...state,
        buyGoldStatus: {
          status: action.value?.status,
          errorMessage: action.value?.errorMessage
        }
      }

    case USER_FINANCE_STATE_KEYS.INVEST_GOLD:
      return {
        ...state,
        investGoldStatus: {
          status: action.value?.status,
          errorMessage: action.value?.errorMessage
        }
      }

    case USER_FINANCE_STATE_KEYS.CANCEL_INVEST_GOLD:
      return {
        ...state,
        cancelInvestGoldStatus: {
          status: action.value?.status,
          errorMessage: action.value?.errorMessage
        }
      }

    case USER_FINANCE_STATE_KEYS.SELL_GOLD:
      return {
        ...state,
        sellGoldStatus: {
          status: action.value?.status,
          errorMessage: action.value?.errorMessage
        }
      }

    case USER_FINANCE_STATE_KEYS.USER_INFO:
      return {
        ...state,
        userInfoStatus: {
          status: action.value?.status,
          errorMessage: action.value?.errorMessage
        }
      }

    case USER_FINANCE_STATE_KEYS.USER_BANK_ACCOUNT:
      return {
        ...state,
        userBankAccountStatus: {
          status: action.value?.status,
          errorMessage: action.value?.errorMessage
        }
      }

    case USER_FINANCE_STATE_KEYS.RESEND_OTP:
      return {
        ...state,
        resendOtp: {
          status: action.value?.status,
          errorMessage: action.value?.errorMessage
        }
      }

    case USER_FINANCE_STATE_KEYS.VERIFY_OTP:
      return {
        ...state,
        verifyOtp: {
          status: action.value?.status,
          errorMessage: action.value?.errorMessage
        }
      }

    default:
      return state
  }
}

const userFinanceReducer = (
  state: IInitialState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload }

    case types.UPDATE_BUY_GOLD_DATA:
      return {
        ...state,
        buyGoldData: action.value
      }

    case types.UPDATE_AUTO_INVEST_GOLD_DATA:
      return {
        ...state,
        autoInvestGoldData: action.value
      }

    case types.UPDATE_SELL_GOLD_DATA:
      return {
        ...state,
        sellGoldData: action.value
      }

    case types.UPDATE_USER_FINANCE_STATUS:
      return handleUserFinanceState(state, action)

    case types.RESET_USER_FINANCE_STATE:
      return initialState

    default:
      return state
  }
}

export { userFinanceReducer }
