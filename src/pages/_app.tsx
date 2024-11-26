import { QueryClientProvider } from '@tanstack/react-query'
import dayjs from 'dayjs'
import tr from 'dayjs/locale/tr'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
// eslint-disable-next-line import/no-named-as-default
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import React, { useEffect, useState } from 'react'
import { isBrowser } from 'react-device-detect'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { FullScreenLoader } from '@sw-npm-packages/components'
import { getCountryCode } from '@sw-npm-packages/config'
import { isGlobalApp } from '@sw-npm-packages/constants'
import { lexend } from '@sw-npm-packages/fonts'
import { isNull, logger, merge, queryClient } from '@sw-npm-packages/utils'
import {
  ErrorBoundary as ErrorBoundaryComponent,
  GenericCountryNotAllowed
} from 'components'
// import { DesktopSupport } from 'components/DesktopSupport'
import { GLOBAL_PIXEL_ID, TURKEY_PIXEL_ID } from 'config'
import { initPosthog, isGlobalUser, isUserAuthenticated } from 'helpers'
import { emitLoginSuccess } from 'helpers/events'
import { MainLayout } from 'layouts'
import { wrapper } from 'store'

import 'styles/reset.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import 'react-toastify/dist/ReactToastify.css'
import 'styles/globals.css'

initPosthog()

export default function SWApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const [messages, setMessages] = useState<AbstractIntlMessages | null>(null)
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)
  const countryCode = getCountryCode()

  const updateLocale = async () => {
    let langMessages
    if (isGlobalApp) {
      langMessages = (await import(`../languages/en.json`)).default
    } else {
      langMessages = (
        await import(`../languages/${countryCode.toLowerCase()}.json`)
      ).default
    }
    const defaultMessages = (await import(`../languages/en.json`)).default
    setMessages(merge(defaultMessages, langMessages))
    if (countryCode === 'TR') dayjs.locale(tr)
  }

  const logError = (error: Error, info: { componentStack: string }) => {
    logger.log('Error in ErrorBoundary :- ', {
      error,
      componentStack: info.componentStack
    })
  }

  const router = useRouter()

  useEffect(() => {
    if (isGlobalApp) {
      import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.init(GLOBAL_PIXEL_ID || '') // facebookPixelId
          ReactPixel.pageView()

          router.events.on('routeChangeComplete', () => {
            ReactPixel.pageView()
          })
        })
    } else {
      if (getCountryCode() === 'TR') {
        logger.log('TR Pixel ID')
        import('react-facebook-pixel')
          .then((x) => x.default)
          .then((ReactPixel) => {
            ReactPixel.init(TURKEY_PIXEL_ID || '') // facebookPixelId
            ReactPixel.pageView()

            router.events.on('routeChangeComplete', () => {
              ReactPixel.pageView()
            })
          })
      }
    }
  }, [router.events])

  React.useEffect(() => {
    setIsDesktop(isBrowser)

    updateLocale()
  }, [])

  React.useEffect(() => {
    if (isDesktop === false) {
      if (isUserAuthenticated()) {
        // FIXME: add additional condition for is registration completed
        emitLoginSuccess()
      }
    }
  }, [isDesktop])

  if (isNull(isDesktop)) return null

  if (!messages) return <FullScreenLoader />

  // if (isDesktop) {
  //   return (
  //     <NextIntlClientProvider messages={messages}>
  //       <style jsx global>{`
  //         html,
  //         body {
  //           font-family: ${lexend.style.fontFamily} !important;
  //         }
  //       `}</style>
  //       <DesktopSupport />
  //     </NextIntlClientProvider>
  //   )
  // }

  // console.log({ isGlobalApp, isGlobalUser })

  if (isGlobalApp && !isGlobalUser) {
    // user is trying to access the global app but has their own web app
    return (
      <NextIntlClientProvider messages={messages}>
        <style jsx global>{`
          html,
          body {
            font-family: ${lexend.style.fontFamily} !important;
          }
        `}</style>

        <GenericCountryNotAllowed />
      </NextIntlClientProvider>
    )
  }

  if (!isGlobalApp && isGlobalUser) {
    // user is trying to access another country's web app
    return (
      <NextIntlClientProvider messages={messages}>
        <style jsx global>{`
          html,
          body {
            font-family: ${lexend.style.fontFamily} !important;
          }
        `}</style>

        <GenericCountryNotAllowed isGlobal />
      </NextIntlClientProvider>
    )
  }

  return (
    <Provider store={store}>
      <style jsx global>{`
        html,
        body {
          font-family: ${lexend.style.fontFamily} !important;
        }
      `}</style>
      <QueryClientProvider client={queryClient}>
        <PostHogProvider client={posthog}>
          <NextIntlClientProvider messages={messages}>
            <MainLayout>
              <ErrorBoundary
                FallbackComponent={ErrorBoundaryComponent}
                onError={logError}
              >
                <Component {...props.pageProps} />
              </ErrorBoundary>
            </MainLayout>
            <ToastContainer limit={1} newestOnTop />
          </NextIntlClientProvider>
        </PostHogProvider>
      </QueryClientProvider>
    </Provider>
  )
}
