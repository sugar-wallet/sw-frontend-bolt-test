import { IInitialState } from '../reducers/modal'

interface IState {
  modal: IInitialState
}

export const selectActiveModal = (state: IState) => state.modal.activeModal
