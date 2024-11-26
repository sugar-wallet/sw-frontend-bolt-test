import { HYDRATE } from 'next-redux-wrapper'
import type { AnyAction } from 'redux'

import { IKeyValuePair } from '@sw-npm-packages/types'
import { MODALS } from 'types/modal'

import * as types from '../types/modal'

export interface IInitialState {
  activeModal: {
    modal: MODALS
    data: IKeyValuePair<string | number | boolean>
  } | null
}

const initialState: IInitialState = {
  activeModal: null
}

const modalReducer = (
  state: IInitialState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload }

    case types.TRIGGER_MODAL:
      return {
        activeModal: {
          modal: action.payload?.key,
          data: action.payload?.data
        }
      }

    case types.CLOSE_MODAL:
      return {
        activeModal: null
      }

    default:
      return state
  }
}

export { modalReducer }
