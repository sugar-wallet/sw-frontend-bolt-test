import { IKeyValuePair } from '@sw-npm-packages/types'
import { MODALS } from 'types/modal'

import * as types from '../types/modal'

export const handleTriggerModal = (
  key: MODALS,
  data: IKeyValuePair<string | boolean | null> | null = null
) => ({
  type: types.TRIGGER_MODAL,
  payload: {
    key,
    data
  }
})

export const handleCloseModal = () => ({
  type: types.CLOSE_MODAL
})
