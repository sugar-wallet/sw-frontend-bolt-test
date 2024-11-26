import * as types from '../types/app'

export const updateIsOnboardingCompleted = (value: boolean) => ({
  type: types.UPDATE_IS_ONBOARDING_COMPLETED,
  value
})

export const resetAppState = () => ({
  type: types.RESET_APP_STATE
})
