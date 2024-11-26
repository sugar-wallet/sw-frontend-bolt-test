// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

import { environment, isDevelopment } from '@sw-npm-packages/constants'
import { isEmpty } from '@sw-npm-packages/utils'
import { SENTRY_DSN } from 'config'

const sentryDSN = SENTRY_DSN

if (!isDevelopment && !isEmpty(sentryDSN)) {
  Sentry.init({
    environment,

    dsn: sentryDSN,

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false
  })
}
