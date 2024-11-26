import { type AxiosResponse } from 'axios'
// eslint-disable-next-line import/no-named-as-default
import posthog from 'posthog-js'
import { type Value } from 'react-phone-number-input'
import { type AnyAction } from 'redux'
import { all, call, put, select } from 'redux-saga/effects'

import { PosthogEvents } from '@constants'
import { getCountryCode } from '@sw-npm-packages/config'
import {
  REQUEST_RESPONSE_STATUS,
  USER_STATE_INFO,
  USER_TRANSACTION_DATA
} from '@sw-npm-packages/constants'
import {
  ERRORS,
  ISellGoldData,
  IAutoInvestGoldData,
  IBuyGoldData,
  ISendOtpPayload
} from '@sw-npm-packages/types'
import { LOGIN_METHODS } from '@sw-npm-packages/types/login'
import {
  isURL,
  logger,
  notifySuccess,
  isEmpty,
  queryClient,
  notifyError,
  getUserIdFromJWT
} from '@sw-npm-packages/utils'
import { authApi } from 'api'
import { navigationPaths } from 'config'
import {
  appendQueryParams,
  extractQueryValueFromSearchParams,
  getAutoInvestGoldData,
  getBuyGoldData,
  getCreateSecurityPin,
  getSellGoldData,
  gtmPushEvent,
  identifyUser,
  removeAccessToken,
  removeUserState,
  setAccessToken,
  setUserCookieData,
  setUserState
} from 'helpers'
import {
  emitFetchUserProfile,
  emitLoginSuccess,
  emitLogoutSuccess,
  emitTrackEvent
} from 'helpers/events'
import { navigate } from 'helpers/navigation'
import translate from 'languages'
import { resetAppState } from 'store/actions/app'
import {
  resetAuthState,
  updateAuthStatus,
  handleLogout as handleLogoutAction,
  handleSendOtp as handleSendOtpAction
} from 'store/actions/auth'
import { resetPaymentState } from 'store/actions/payment'
import { resetUserState } from 'store/actions/user'
import {
  resetUserFinanceState,
  updateAutoInvestGoldData,
  updateBuyGoldData,
  updateSellGoldData
} from 'store/actions/user-finance'
import { AUTH_STATE_KEYS } from 'store/constants/auth'
import {
  selectCountry,
  selectEmail,
  selectLoginMethod,
  selectOtpOrderId,
  selectPhoneNumber,
  selectSecurityPin
} from 'store/selectors/auth'

import * as types from '../../types/auth'

function* handleVerifyOtpSuccess(response: AxiosResponse) {
  yield put(
    updateAuthStatus(AUTH_STATE_KEYS.VERIFY_OTP, {
      status: REQUEST_RESPONSE_STATUS.SUCCESS
    })
  )

  const { access, user_exists: userExists, phone_number } = response.data
  const countryCode = getCountryCode()
  if (phone_number) {
    setUserState(USER_STATE_INFO.PHONE_NUMBER, phone_number)
  }
  emitTrackEvent(PosthogEvents.CorrectOtpEntered)
  if (access) {
    // store in cookie
    yield call(setAccessToken, access)
  }

  if (userExists) {
    // emit login success event now
    const userId = getUserIdFromJWT(access)
    const phoneNumber: string = yield select(selectPhoneNumber)
    const email: string = yield select(selectEmail)
    gtmPushEvent('user_login', {
      user_data: {
        id: userId, // Add the unique User ID here
        phone: phoneNumber,
        email: email,
        address: {
          city: undefined,
          gender: undefined,
          address: undefined,
          state: undefined,
          country: undefined,
          postal_code: undefined,
          first_name: undefined,
          last_name: undefined
        }
      }
    })
    yield call(emitLoginSuccess)
  } else {
    // collect info
    if (countryCode !== 'TR') {
      yield call(
        navigate,
        appendQueryParams(navigationPaths.signup, [
          'campaignCode',
          'referralCode',
          'worldcupTeam',
          'retargetCode'
        ])
      )
    } else {
      yield call(
        navigate,
        appendQueryParams(navigationPaths.verification, [
          'campaignCode',
          'referralCode',
          'worldcupTeam',
          'retargetCode'
        ])
      )
    }
  }
}

export function* handleSendOtp(
  key = AUTH_STATE_KEYS.SEND_OTP,
  value?: ISendOtpPayload
) {
  try {
    yield put(
      updateAuthStatus(key, {
        status: REQUEST_RESPONSE_STATUS.PROCESSING
      })
    )
    const dryRun = value?.dryRun
    let type
    let isOtpless = false
    let campaignCode = null
    let referralCode = null
    let retargetCode = null
    const method: LOGIN_METHODS = yield select(selectLoginMethod)
    if (value) {
      type = value.type
      isOtpless = Boolean(value.isOtpless)
      campaignCode = value.campaignCode
      referralCode = value.referralCode
      retargetCode = value.retargetCode
    }
    const loginMethod = type || method

    yield put(updateAuthStatus(AUTH_STATE_KEYS.SET_LOGIN_METHOD, loginMethod))

    const phoneNumber: Value = yield select(selectPhoneNumber)
    const email: string = yield select(selectEmail)
    const country: Value = yield select(selectCountry)
    const countryCode = getCountryCode()
    const otpOrderId: string = yield select(selectOtpOrderId)

    setUserState(USER_STATE_INFO.COUNTRY, country || countryCode)

    const response: AxiosResponse = yield call(authApi.sendOTP, {
      phone_number: [LOGIN_METHODS.WHATSAPP, LOGIN_METHODS.SMS].includes(
        loginMethod
      )
        ? phoneNumber
        : undefined,
      email: loginMethod === LOGIN_METHODS.EMAIL ? email : undefined,
      type: loginMethod,
      order_id:
        key === AUTH_STATE_KEYS.RESEND_OTP && otpOrderId
          ? otpOrderId
          : undefined,
      campaign_code: campaignCode || undefined,
      referral_code: referralCode || undefined,
      retarget_code: retargetCode || undefined,
      dry_run: dryRun || undefined
    })

    if (dryRun && loginMethod === LOGIN_METHODS.EMAIL) {
      const { user_exists: userExists } = response.data
      yield put(
        updateAuthStatus(AUTH_STATE_KEYS.EMAIL_ALREADY_EXISTS, userExists)
      )
      if (!userExists) {
        yield
        yield
        yield all([
          put(
            updateAuthStatus(
              AUTH_STATE_KEYS.SET_LOGIN_METHOD,
              LOGIN_METHODS.SMS
            )
          ),
          put(updateAuthStatus(AUTH_STATE_KEYS.EMAIL, '')),
          put(
            updateAuthStatus(key, {
              status: REQUEST_RESPONSE_STATUS.ERROR,
              errorMessage: ''
            })
          ),
          call(
            notifyError,
            translate('OtpVerificationPage.noUserAccountFound')
          ),
          call(setUserState, USER_STATE_INFO.EMAIL, '')
        ])
        return
      } else {
        yield put(
          handleSendOtpAction({
            ...value,
            dryRun: false
          })
        )
      }
    }

    logger.info('OTP sent response :- ', response.data)
    if (process.env.NEXT_PUBLIC_SKIP_OTP === 'true') {
      // set this to true to bypass otpless
      yield call(handleVerifyOtpSuccess, response)
      return
    }
    const { destination_uri: redirectionUrl, order_id: orderId } = response.data
    if (isOtpless) {
      let url = navigationPaths.otpless
      if (redirectionUrl) {
        url += `?redirect=${redirectionUrl}`
      }
      navigate(url)
    } else {
      yield put(
        updateAuthStatus(key, {
          status: REQUEST_RESPONSE_STATUS.SUCCESS,
          otpOrderId: orderId
        })
      )
    }

    emitTrackEvent(
      loginMethod === LOGIN_METHODS.SMS
        ? PosthogEvents.LoginUsingSms
        : PosthogEvents.LoginUsingWhatsapp,
      {
        country,
        phone: phoneNumber
      }
    )

    // notify user if otp is resent
    if (key === AUTH_STATE_KEYS.RESEND_OTP) {
      yield call(
        notifySuccess,
        translate('OtpVerificationPage.otpResendSuccess')
      )
    }
  } catch (err) {
    logger.error('Error in handleSendOtp :- ', err)

    yield put(
      updateAuthStatus(key, {
        status: REQUEST_RESPONSE_STATUS.ERROR,
        errorMessage: err.response?.data?.error_code
      })
    )
  }
}

function* handleVerifyOtp(action: AnyAction) {
  const { otp, isOtpless } = action.value

  try {
    yield put(
      updateAuthStatus(AUTH_STATE_KEYS.VERIFY_OTP, {
        status: REQUEST_RESPONSE_STATUS.PROCESSING
      })
    )

    const phoneNumber: Value = yield select(selectPhoneNumber)
    const email: string = yield select(selectEmail)
    const loginMethod: LOGIN_METHODS = yield select(selectLoginMethod)
    const otpOrderId: string | null = yield select(selectOtpOrderId)

    if (phoneNumber) {
      identifyUser(phoneNumber.toString())
    }
    if (email) {
      identifyUser(email)
      setUserState(USER_STATE_INFO.EMAIL, email)
    }
    emitTrackEvent(PosthogEvents.OtpSubmitClicked, {
      isWhatsapp: loginMethod === LOGIN_METHODS.WHATSAPP,
      otp
    })

    const response: AxiosResponse = yield call(authApi.verifyOTP, {
      phone_number: [LOGIN_METHODS.WHATSAPP, LOGIN_METHODS.SMS].includes(
        loginMethod
      )
        ? phoneNumber
        : undefined,
      email: loginMethod === LOGIN_METHODS.EMAIL ? email : undefined,
      otp,
      type: loginMethod,
      is_otpless: isOtpless || false,
      order_id: otpOrderId
    })

    logger.info('verify OTP response :- ', response.data)
    yield call(handleVerifyOtpSuccess, response)
  } catch (err) {
    logger.error('Error in handleVerifyOtp :- ', err)

    if (err.response?.data?.error_code === ERRORS.INVALID_OTP) {
      emitTrackEvent(PosthogEvents.IncorrectOtpEntered)
    }
    yield put(
      updateAuthStatus(AUTH_STATE_KEYS.VERIFY_OTP, {
        status: REQUEST_RESPONSE_STATUS.ERROR,
        errorMessage: err.response?.data?.error_code
      })
    )

    // notify error to user
    // yield call(notifyError, 'Something went wrong!')
  }
}

function* handleSecurityPinSendOtp(
  key = AUTH_STATE_KEYS.RESEND_OTP,
  action?: AnyAction
) {
  const { securityPin } = action || { securityPin: '' }
  try {
    yield put(
      updateAuthStatus(key, {
        status: REQUEST_RESPONSE_STATUS.PROCESSING
      })
    )

    yield put(
      updateAuthStatus(AUTH_STATE_KEYS.SECURITY_PIN, {
        securityPin
      })
    )
    yield call(
      setUserState,
      USER_TRANSACTION_DATA.CREATE_SECURITY_PIN,
      securityPin
    )

    const response: AxiosResponse = yield call(authApi.securityPinSendOTP)

    logger.info('Security Pin OTP sent response :- ', response.data)

    yield put(
      updateAuthStatus(key, {
        status: REQUEST_RESPONSE_STATUS.SUCCESS
      })
    )

    // notify user if otp is resent
    if (key === AUTH_STATE_KEYS.RESEND_OTP) {
      yield call(notifySuccess, 'Security Pin OTP resent successfully')
    }
  } catch (err) {
    logger.error('Error in handleSecurityPinSendOtp :- ', err)

    yield put(
      updateAuthStatus(key, {
        status: REQUEST_RESPONSE_STATUS.ERROR,
        errorMessage: err.response?.data?.error_code
      })
    )
  }
}

function* handleSecurityPinVerifyOtp(action: AnyAction) {
  const { otp } = action
  const securityPin: string = yield select(selectSecurityPin)

  try {
    yield put(
      updateAuthStatus(AUTH_STATE_KEYS.VERIFY_OTP, {
        status: REQUEST_RESPONSE_STATUS.PROCESSING
      })
    )

    const response: AxiosResponse = yield call(authApi.securityPinVerifyOTP, {
      security_pin: securityPin,
      otp
    })

    logger.info('verify OTP response :- ', response.data)

    yield put(
      updateAuthStatus(AUTH_STATE_KEYS.VERIFY_OTP, {
        status: REQUEST_RESPONSE_STATUS.SUCCESS
      })
    )

    yield call(setUserCookieData, {
      security_pin_set: true
    })

    emitTrackEvent(PosthogEvents.CreateSecurityPinCorrectOtpEntered, {
      pin: securityPin,
      otp
    })

    yield call(navigate, navigationPaths.sellBankDetails, true)
  } catch (err) {
    logger.error('Error in handleSecurityPinVerifyOtp :- ', err)
    emitTrackEvent(PosthogEvents.CreateSecurityPinIncorrectOtpEntered, {
      pin: securityPin,
      otp
    })
    yield put(
      updateAuthStatus(AUTH_STATE_KEYS.VERIFY_OTP, {
        status: REQUEST_RESPONSE_STATUS.ERROR,
        errorMessage: err.response?.data?.error_code
      })
    )

    // notify error to user
    // yield call(notifyError, 'Something went wrong!')
  }
}

function* handleSecurityPinVerify(action: AnyAction) {
  const { securityPin } = action

  try {
    yield put(
      updateAuthStatus(AUTH_STATE_KEYS.VERIFY_PIN, {
        status: REQUEST_RESPONSE_STATUS.PROCESSING
      })
    )

    const response: AxiosResponse = yield call(authApi.securityPinVerifyOTP, {
      security_pin: securityPin
    })

    logger.info('verify security pin response :- ', response.data)

    yield put(
      updateAuthStatus(AUTH_STATE_KEYS.VERIFY_PIN, {
        status: REQUEST_RESPONSE_STATUS.SUCCESS
      })
    )
    emitTrackEvent(PosthogEvents.EnterSecurityPinCorrectPinEntered, {
      pin: securityPin
    })
    yield call(navigate, navigationPaths.sellBankDetails, true)
  } catch (err) {
    logger.error('Error in handleSecurityPinVerify :- ', err)
    emitTrackEvent(PosthogEvents.EnterSecurityPinIncorrectPinEntered, {
      pin: securityPin
    })
    yield put(
      updateAuthStatus(AUTH_STATE_KEYS.VERIFY_PIN, {
        status: REQUEST_RESPONSE_STATUS.ERROR,
        errorMessage: err.response?.data?.error_code
      })
    )

    // notify error to user
    // yield call(notifyError, 'Something went wrong!')
  }
}

function* handleLogout() {
  try {
    // first, clear cookie
    yield call(removeAccessToken)
    yield call(removeUserState)
    // emit logout success event
    yield call(emitLogoutSuccess)
  } catch (err) {
    logger.error('Error in handleLogout :- ', err)
  }
}

function* handleCookieData() {
  try {
    // handle buy gold data
    const buyGoldData: IBuyGoldData = getBuyGoldData()
    if (!isEmpty(buyGoldData)) {
      yield put(updateBuyGoldData(buyGoldData))
    }

    // handle auto invest data
    const autoInvestGoldData: IAutoInvestGoldData = getAutoInvestGoldData()
    if (!isEmpty(autoInvestGoldData)) {
      yield put(updateAutoInvestGoldData(autoInvestGoldData))
    }

    // handle sell data
    const sellGoldData: ISellGoldData = getSellGoldData()
    if (sellGoldData) {
      yield put(updateSellGoldData(sellGoldData))
    }

    // handle security pin
    const createSecurityPin = getCreateSecurityPin()
    if (createSecurityPin) {
      yield put(
        updateAuthStatus(AUTH_STATE_KEYS.SECURITY_PIN, {
          securityPin: createSecurityPin
        })
      )
    }
  } catch (err) {
    logger.error('Error in handleCookieData :- ', err)
  }
}

export function* handleLogoutEvent() {
  try {
    yield put(handleLogoutAction())
  } catch (err) {
    logger.error('Error in handleLogoutEvent :- ', err)
  }
}

export function* handleLoginSuccess() {
  try {
    // fetch profile data first
    yield call(emitFetchUserProfile, { refetch: true, isFirstTimeFetch: true })

    yield handleCookieData()

    // now check if callback query is available
    const callbackURL = extractQueryValueFromSearchParams(
      window.location.search,
      'callback'
    ) as string

    if (isURL(callbackURL)) {
      // now navigate to callback url
      yield call(navigate, callbackURL)
    } else {
      // get current pathname
      const { pathname } = window.location

      if (
        pathname?.endsWith(navigationPaths.login) ||
        pathname?.endsWith(navigationPaths.otpless)
      ) {
        // now navigate to homepage
        yield call(navigate, navigationPaths.home)
      }
    }
  } catch (err) {
    logger.error('Error in handleLoginSuccess :-', err)
  }
}

export function* handleLogoutSuccess() {
  try {
    // reset all states
    yield all([
      put(resetAuthState()),
      put(resetAppState()),
      put(resetUserState()),
      put(resetUserFinanceState()),
      put(resetPaymentState())
    ])

    // reset posthog
    posthog.reset(true)

    // clear all cache queries
    yield queryClient.clear()

    // redirect to login page
    yield call(navigate, navigationPaths.login)

    yield call(notifySuccess, translate('ProfilePage.logoutSuccessMessage'))
  } catch (err) {
    logger.error('Error in handleLogoutSuccess :-', err)
  }
}

export function* handleAuthEvents(action: AnyAction) {
  switch (action.type) {
    case types.HANDLE_SEND_OTP:
      yield handleSendOtp(AUTH_STATE_KEYS.SEND_OTP, action.value)
      break

    case types.HANDLE_RESEND_OTP:
      yield handleSendOtp(AUTH_STATE_KEYS.RESEND_OTP)
      break

    case types.HANDLE_VERIFY_OTP:
      yield handleVerifyOtp(action)
      break

    case types.HANDLE_LOGOUT:
      yield handleLogout()
      break

    case types.HANDLE_SECURITY_PIN_VERIFY:
      yield handleSecurityPinVerify(action.value)
      break

    case types.HANDLE_SECURITY_PIN_SEND_OTP:
      yield handleSecurityPinSendOtp(AUTH_STATE_KEYS.SEND_OTP, action.value)
      break

    case types.HANDLE_SECURITY_PIN_RESEND_OTP:
      yield handleSecurityPinSendOtp(AUTH_STATE_KEYS.RESEND_OTP)
      break

    case types.HANDLE_SECURITY_PIN_VERIFY_OTP:
      yield handleSecurityPinVerifyOtp(action.value)
      break

    default:
      break
  }
}
