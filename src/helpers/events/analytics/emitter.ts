import { IKeyValuePair } from '@sw-npm-packages/types'
import { createEventEmitter } from '@sw-npm-packages/utils'

import { analyticsKeys } from './constants'

export const analyticsEventEmitter = createEventEmitter()

export const emitTrackEvent = (
  eventName: string,
  data: IKeyValuePair<string | number | boolean> | null = null
) => {
  analyticsEventEmitter.emit(analyticsKeys.TRACK_EVENT, {
    eventName,
    data
  })
}
