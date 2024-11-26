// eslint-disable-next-line import/no-unresolved
import { NotUndefined } from '@redux-saga/types'
import { type EventChannel } from 'redux-saga'
import { call, cancelled, takeEvery } from 'redux-saga/effects'

import { IAnalyticsEvent } from '@sw-npm-packages/types'
import { logger } from '@sw-npm-packages/utils'
import { analyticsKeys } from 'helpers/events/analytics/constants'

import { createAnalyticsChannel } from '../channels/eventChannels/analytics'
import { handleTrackEvent } from '../handlers/analytics'

export function* watchAnalyticsEventChannel() {
  const channel: EventChannel<NotUndefined> = yield call(createAnalyticsChannel)

  function* handler(event: IAnalyticsEvent) {
    switch (event.type) {
      case analyticsKeys.TRACK_EVENT:
        yield handleTrackEvent(event.data)
        break

      default:
        break
    }
  }

  try {
    yield takeEvery(channel, handler)
  } catch (err) {
    logger.error('Error in watchAnalyticsEventChannel :- ', err)
  } finally {
    if ((yield cancelled()) as boolean) {
      channel.close()
      logger.info('watchAnalyticsEventChannel channel closed')
    }
  }
}
