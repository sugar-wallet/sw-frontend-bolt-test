/* eslint no-console: 0 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Sentry from '@sentry/nextjs'

import { isDevelopment } from '@sw-npm-packages/constants'

const composeMessage = (optionalParams: unknown[]) => {
  return optionalParams
    .map((param: unknown) => {
      return param instanceof Error ? param.message : JSON.stringify(param)
    })
    .join(', ')
}

class Logger {
  log(message: string, ...optionalParams: unknown[]) {
    if (isDevelopment) {
      console.log(message, ...optionalParams)
    } else {
      Sentry.captureMessage(
        `${message} ${composeMessage(optionalParams || [])}`
      )
    }
  }

  info(message: string, ...optionalParams: unknown[]) {
    if (isDevelopment) {
      console.info(message, ...optionalParams)
    } else {
      Sentry.captureMessage(
        `${message} ${composeMessage(optionalParams || [])}`
      )
    }
  }

  error(message: string, ...optionalParams: unknown[]) {
    console.error(message, ...optionalParams)
    // FIXME: will enable this after sentry activation
    // if (isDevelopment) {
    //   console.error(message, ...optionalParams)
    // } else {
    //   Sentry.captureException(
    //     `${message} ${composeMessage(optionalParams || [])}`
    //   )
    // }
  }
}

const logger = new Logger()

export { logger }
