import { IInitialState } from '../reducers/app'

interface IState {
  app: IInitialState
}

export const selectIsOnboardingCompleted = (state: IState) =>
  state.app.isOnboardingCompleted
