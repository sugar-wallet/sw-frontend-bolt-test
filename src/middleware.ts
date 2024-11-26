// https://github.com/lodash/lodash/issues/5525#issuecomment-1518978206
export const config = {
  runtime: 'experimental-edge',
  unstable_allowDynamic: ['**/node_modules/lodash/**/*.js']
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { API_BASE_URL, getCountryCode } from '@sw-npm-packages/config'
import { COOKIE_KEYS, TOKENS, environment } from '@sw-npm-packages/constants'
import { isJWTValid, isURL, logger } from '@sw-npm-packages/utils'
import {
  navigationPaths,
  privateNavigationPaths,
  publicNavigationPaths
} from 'config'
import {
  extractQueryValueFromSearchParams,
  isAutoInvestIntermediateStep,
  isAutoInvestIntermediateStepWithRequiredInfo,
  isBuyGoldIntermediateStep,
  isBuyGoldIntermediateStepWithRequiredInfo,
  isInvestOnboardingCompleted,
  isSubscriptionActive,
  isUserRegistrationCompleted,
  removeAccessToken
} from 'helpers'

const privateRoutes = Object.values(privateNavigationPaths)
const publicRoutes = Object.values(publicNavigationPaths)

const isUserAuthenticated = (request: NextRequest) => {
  const accessToken = request.cookies.get(TOKENS.ACCESS_TOKEN)?.value as string

  const isValid = isJWTValid(accessToken)

  if (!isValid) {
    removeAccessToken()
  }

  return isValid
}

const getHostURL = (request: NextRequest) => {
  if (request.headers.get('x-forwarded-for')) {
    const host = request.headers.get('host')
    const protocol = request.headers.get('x-forwarded-proto') ?? 'http'
    const search = request.nextUrl.search ?? ''

    return `${protocol}://${host}${request.nextUrl.pathname}${search}`
  }

  return request.url
}

const redirectToOnboarding = (request: NextRequest) => {
  const url = new URL(request.url)
  const search = url.search
  const countryCode = getCountryCode()

  const urlToRedirect =
    countryCode === 'TR' ? navigationPaths.verification : navigationPaths.signup

  return NextResponse.redirect(
    new URL(`${urlToRedirect}${search}`, request.url)
  )
}

const checkIsRegistrationCompleted = async (request: NextRequest) => {
  const accessToken = request.cookies.get(TOKENS.ACCESS_TOKEN)?.value as string

  const userStateCookie = request.cookies.get(COOKIE_KEYS.USER_STATE)
    ?.value as string

  const isRegistrationCompletedValueFromCookie =
    isUserRegistrationCompleted(userStateCookie)

  if (!isRegistrationCompletedValueFromCookie) {
    try {
      const baseURL = API_BASE_URL[environment?.toUpperCase()]?.('v2')

      if (baseURL) {
        const response = await fetch(`${baseURL}/user/profile/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        const responseJSON = await response.json()

        return responseJSON?.registration_completed || false
      }
    } catch (err) {
      logger.error('Error in checkIsRegistrationCompleted :- ', err)
    }
  }

  return isRegistrationCompletedValueFromCookie
}

export const middleware = async (request: NextRequest) => {
  const { pathname, search } = request.nextUrl

  const userStateCookie = request.cookies.get(COOKIE_KEYS.USER_STATE)
    ?.value as string

  if (privateRoutes.includes(pathname)) {
    if (isUserAuthenticated(request)) {
      if (await checkIsRegistrationCompleted(request)) {
        /**
         * user is authenticated and registration completed
         * check if there is any pre-requisites needed to access current route
         **/

        if (pathname?.endsWith(privateNavigationPaths.invest)) {
          if (
            !isSubscriptionActive(userStateCookie) &&
            !isInvestOnboardingCompleted(userStateCookie)
          ) {
            // redirect to onboarding page
            const response = NextResponse.redirect(
              new URL(privateNavigationPaths.investOnboarding, request.url)
            )

            response.headers.set('x-middleware-cache', 'no-cache')

            return response
          }
        }

        // check for any pre-requisite info required for buy and auto invest intermediate page
        if (isBuyGoldIntermediateStep(pathname, search)) {
          const { isIntermediateStep, havePreRequisiteInfo } =
            isBuyGoldIntermediateStepWithRequiredInfo({
              pathname,
              search,
              userStateCookie
            })

          if (isIntermediateStep && !havePreRequisiteInfo) {
            // redirect to buy page
            return NextResponse.redirect(
              new URL(privateNavigationPaths.buy, request.url)
            )
          }
        } else if (isAutoInvestIntermediateStep(pathname, search)) {
          const { isIntermediateStep, havePreRequisiteInfo } =
            isAutoInvestIntermediateStepWithRequiredInfo({
              pathname,
              search,
              userStateCookie
            })

          if (isIntermediateStep && !havePreRequisiteInfo) {
            // redirect to auto invest page
            return NextResponse.redirect(
              new URL(privateNavigationPaths.invest, request.url)
            )
          }
        }
      } else {
        // FIXME: need to put more logic here
        // redirect to onboarding, if its not onboarding page
        if (
          !pathname?.endsWith(privateNavigationPaths.signup) &&
          !pathname?.endsWith(privateNavigationPaths.verification)
        ) {
          return redirectToOnboarding(request)
        }
      }
    } else {
      const callbackURL = encodeURIComponent(getHostURL(request))

      return NextResponse.redirect(
        new URL(
          `${publicNavigationPaths.login}?callback=${callbackURL}`,
          request.url
        )
      )
    }
  } else if (publicRoutes.includes(pathname)) {
    if (isUserAuthenticated(request)) {
      if (await checkIsRegistrationCompleted(request)) {
        // first check if callback query is available
        const callbackURL =
          (extractQueryValueFromSearchParams(
            request.nextUrl.searchParams,
            'callback'
          ) as string) || ''

        if (isURL(callbackURL)) {
          // redirect to callback url
          return NextResponse.redirect(new URL(callbackURL, request.url))
        } else {
          // redirect to homepage
          const retargetCode =
            extractQueryValueFromSearchParams(
              request.nextUrl.searchParams,
              'retargetCode'
            ) || ''
          let url = navigationPaths.home
          if (retargetCode) {
            url = `${url}?retargetCode=${retargetCode}`
          }
          return NextResponse.redirect(new URL(url, request.url))
        }
      } else {
        // navigate to onboarding
        return redirectToOnboarding(request)
      }
    }
  }
}
