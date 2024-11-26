import { isGlobalApp, isProduction } from '@sw-npm-packages/constants'

let POSTHOG_APP_ID
const POSTHOG_API_HOST = 'https://us.i.posthog.com'
const SENTRY_DSN =
  'https://549852f08fc41e928168797efdae9d23@o4505563267465216.ingest.sentry.io/4505962162225152'
let PIXEL_ID = ''
let GOOGLE_ANALYTICS_ID = ''
let GTM_ID = ''
let GLOBAL_PIXEL_ID = ''
let TURKEY_PIXEL_ID = ''

let NZ_PIXEL_ID = ''

if (isProduction) {
  PIXEL_ID = '927821261179224'
  GOOGLE_ANALYTICS_ID = 'G-7NT85KS0Q5'
  GTM_ID = 'GTM-PGDDSC9'
  GLOBAL_PIXEL_ID = '6268964946541547'
  TURKEY_PIXEL_ID = '276361258109791'
  NZ_PIXEL_ID = '927821261179224'

  if (isGlobalApp) {
    POSTHOG_APP_ID = 'phc_XLrvN2yOJScrsf01EvwZ5wFr3VlnUhCMnoH12nmuKdh'
  } else {
    POSTHOG_APP_ID = 'phc_XLrvN2yOJScrsf01EvwZ5wFr3VlnUhCMnoH12nmuKdh'
  }
} else {
  if (isGlobalApp) {
    POSTHOG_APP_ID = 'phc_XLrvN2yOJScrsf01EvwZ5wFr3VlnUhCMnoH12nmuKdh'
  } else {
    POSTHOG_APP_ID = 'phc_XLrvN2yOJScrsf01EvwZ5wFr3VlnUhCMnoH12nmuKdh'
  }
}

export {
  POSTHOG_APP_ID,
  POSTHOG_API_HOST,
  SENTRY_DSN,
  PIXEL_ID,
  GOOGLE_ANALYTICS_ID,
  GTM_ID,
  GLOBAL_PIXEL_ID,
  TURKEY_PIXEL_ID,
  NZ_PIXEL_ID
}
