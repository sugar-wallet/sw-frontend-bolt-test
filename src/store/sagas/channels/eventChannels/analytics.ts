import { eventChannel } from 'redux-saga'

import { IEvent } from '@sw-npm-packages/types'
import { analyticsKeys } from 'helpers/events/analytics/constants'
import { analyticsEventEmitter } from 'helpers/events/analytics/emitter'

export function createAnalyticsChannel() {
  return eventChannel((emitter) => {
    const trackEventHandler = (data: unknown) => {
      emitter({ type: analyticsKeys.TRACK_EVENT, data } as IEvent)
    }
    analyticsEventEmitter.addListener(
      analyticsKeys.TRACK_EVENT,
      trackEventHandler
    )
    return () => {
      analyticsEventEmitter.removeListener(
        analyticsKeys.TRACK_EVENT,
        trackEventHandler
      )
    }
  })
}
