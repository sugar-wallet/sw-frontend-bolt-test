import { logger } from '@sw-npm-packages/utils'
import { WHATSAPP_NUMBER, HELLO_MESSAGE } from 'config'

import { openTab } from './navigation'

export const onSupportClick = () => {
  if (typeof window !== 'undefined') {
    // openTab(
    //   `https://wa.me/${WHATSAPP_NUMBER}/?text=${encodeURIComponent(
    //     HELLO_MESSAGE
    //   )}`
    // )
    openTab('mailto:hello@sugarwallet.com?subject=Support')
  }
}

export const openExternalWhatsapp = (message = '') => {
  if (message) {
    openTab(
      `https://wa.me/${WHATSAPP_NUMBER}/?text=${encodeURIComponent(message)}`
    )
  } else {
    openTab(
      `https://wa.me/${WHATSAPP_NUMBER}/?text=${encodeURIComponent(
        HELLO_MESSAGE
      )}`
    )
  }
}

export function autoReadSMS(cb: (key: string) => void) {
  // used AbortController with setTimeout so that WebOTP API (Autoread sms) will get disabled after 1min
  const signal = new AbortController()
  setTimeout(
    () => {
      signal.abort()
    },
    1 * 60 * 1000
  )
  async function main() {
    if ('OTPCredential' in window) {
      try {
        if (navigator.credentials) {
          try {
            await navigator.credentials
              .get({ abort: signal, otp: { transport: ['sms'] } })
              .then((content) => {
                if (content && content.code) {
                  cb(content.code)
                }
              })
              .catch((e) => logger.log(e))
          } catch (e) {
            return
          }
        }
      } catch (err) {
        logger.log(err)
      }
    }
  }
  main()
}

export function openExternalShare({
  title,
  url
}: {
  title: string
  url: string
}) {
  // Fallback, Tries to use API only
  // if navigator.share function is
  // available
  if (navigator.share) {
    navigator
      .share({
        // Title that occurs over
        // web share dialog
        title,

        // URL to share
        url
      })
      .then(() => {
        logger.log('Thanks for sharing!')
      })
      .catch((err) => {
        // Handle errors, if occurred
        logger.log('Error while using Web share API:')
        logger.log(err)
      })
  } else {
    // Alerts user if API not available
    alert("Browser doesn't support this API !")
  }
}
