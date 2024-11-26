import { HYDRATE } from 'next-redux-wrapper'
import type { AnyAction } from 'redux'

import * as types from '../types/app'

export interface IInitialState {
  isOnboardingCompleted: boolean
}

const initialState: IInitialState = {
  isOnboardingCompleted: false
}

const appReducer = (state: IInitialState = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload }

    case types.UPDATE_IS_ONBOARDING_COMPLETED:
      return {
        ...state,
        isOnboardingCompleted: action.value
      }

    case types.RESET_APP_STATE:
      return initialState

    default:
      return state
  }
}

export { appReducer }
