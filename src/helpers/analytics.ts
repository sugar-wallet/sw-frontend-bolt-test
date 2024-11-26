// eslint-disable-next-line import/no-named-as-default
import posthog from 'posthog-js'

import { IKeyValuePair } from '@sw-npm-packages/types'
import { POSTHOG_API_HOST, POSTHOG_APP_ID } from 'config'

import { environment } from '../@sw-npm-packages/constants'

export const initPosthog = () => {
  if (typeof window !== 'undefined') {
    posthog.init(POSTHOG_APP_ID || '', {
      api_host: POSTHOG_API_HOST,
      persistence: 'localStorage',
      autocapture: false,
      opt_in_site_apps: true
    })
  }
}

export const trackAnalyticsEvent = (
  eventName = '',
  data: IKeyValuePair<number | string | boolean> = {}
) => {
  posthog.capture(eventName, data)
}

export const identifyUser = (
  uid: string,
  data: IKeyValuePair<string | number | boolean> | null = null
) => {
  if (data) {
    posthog.identify(uid, data)
  } else {
    posthog.identify(uid)
  }
}

export const gtmPushEvent = (eventName: string, data: any) => {
  if (environment !== 'production') {
    console.log('gtmPushEvent:')
    console.dir({
      event: 'gtm_custom_event',
      datalayer_event_name: eventName,
      ...data
    })

    return
  }

  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'gtm_custom_event',
      datalayer_event_name: eventName,
      ...data
    })
  }
}

declare global {
  interface Window {
    dataLayer: {
      push: (data: any) => void
    }
  }
}
