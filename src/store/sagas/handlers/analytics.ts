/* eslint-disable @typescript-eslint/no-explicit-any */
import { call } from 'redux-saga/effects'

import { IAnalyticsEventData } from '@sw-npm-packages/types'
import { logger } from '@sw-npm-packages/utils'
import { getCurrencyByTz, getLanguageByTz, trackAnalyticsEvent } from 'helpers'

export function* handleTrackEvent(eventData: IAnalyticsEventData = {}) {
  const { eventName = '', data } = eventData
  try {
    const commonProperties = {
      currency: getCurrencyByTz(),
      language: getLanguageByTz()
    }
    if (data) {
      yield call(trackAnalyticsEvent, eventName, {
        ...commonProperties,
        ...data
      })
    } else {
      yield call(trackAnalyticsEvent, eventName, commonProperties)
    }
  } catch (err: any) {
    logger.log('Unable to log analytics events', err)
  }
}
