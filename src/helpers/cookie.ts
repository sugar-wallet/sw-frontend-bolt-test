import {
  deleteCookie,
  getCookie,
  setCookie as setCookieNext
} from 'cookies-next'
import { Base64 } from 'js-base64'

import {
  COOKIE_KEYS,
  USER_STATE_INFO,
  USER_TRANSACTION_DATA
} from '@sw-npm-packages/constants'
import { IKeyValuePair } from '@sw-npm-packages/types'
import { Dayjs, isEmpty, isJWTValid, logger } from '@sw-npm-packages/utils'

const defaultOptions = {
  expires: Dayjs().add(1, 'month').toDate(),
  path: '/'
}

export const setCookie = (key: string, value: string, options: any = {}) => {
  setCookieNext(key, value, {
    ...options,
    ...defaultOptions
  })
}

export const setAccessToken = (token: string) => {
  setCookie(COOKIE_KEYS.ACCESS_TOKEN, token)
}

export const getAccessToken = () => {
  return getCookie(COOKIE_KEYS.ACCESS_TOKEN)
}

export const removeAccessToken = () => {
  deleteCookie(COOKIE_KEYS.ACCESS_TOKEN)
}

export const setAkahuState = (state: string) => {
  // setCookie(COOKIE_KEYS.AKAHU_STATE, state)
  sessionStorage.setItem(COOKIE_KEYS.AKAHU_STATE, state)
}

export const getAkahuState = () => {
  // return getCookie(COOKIE_KEYS.AKAHU_STATE)
  return sessionStorage.getItem(COOKIE_KEYS.AKAHU_STATE)
}

export const removeAkahuState = () => {
  // deleteCookie(COOKIE_KEYS.AKAHU_STATE)
  sessionStorage.removeItem(COOKIE_KEYS.AKAHU_STATE)
}

export const setUserState = (key: string, value: boolean | string | number) => {
  // first get cookie
  const currentUserState = getUserState() || ''

  // decode string
  const decodedValue = Base64.decode(currentUserState)

  try {
    // parse json string
    const parsedJSON = !isEmpty(decodedValue) ? JSON.parse(decodedValue) : {}

    const modifiedValue = {
      ...parsedJSON,
      [key]: value
    }

    setCookie(
      COOKIE_KEYS.USER_STATE,
      Base64.encode(JSON.stringify(modifiedValue))
    )
  } catch (err) {
    logger.error('Error in parsing user state json string :- ', err)
  }
}

export const getUserState = () => {
  return getCookie(COOKIE_KEYS.USER_STATE)
}

export const getUserStateKeyValue = (key: string, userStateCookie?: string) => {
  // first get cookie
  const currentUserState = !isEmpty(userStateCookie)
    ? (userStateCookie as string)
    : getUserState() || ''

  // decode string
  const decodedValue = Base64.decode(currentUserState)

  try {
    // parse json string
    const parsedJSON = !isEmpty(decodedValue) ? JSON.parse(decodedValue) : {}

    return parsedJSON[key]
  } catch (err) {
    logger.error(`Error in getting ${key} value :- `, err)
  }
}

export const removeUserState = () => {
  deleteCookie(COOKIE_KEYS.USER_STATE)
}

export const isUserAuthenticated = () => {
  const accessToken = getAccessToken() as string

  const isValid = isJWTValid(accessToken)

  if (!isValid) {
    removeAccessToken()
  }

  return isValid
}

export const isUserRegistrationCompleted = (userStateCookie = '') => {
  return (
    getUserStateKeyValue(
      USER_STATE_INFO.IS_REGISTRATION_COMPLETED,
      userStateCookie
    ) === true
  )
}

export const isUserSecurityPinSet = (userStateCookie = '') => {
  return (
    getUserStateKeyValue(
      USER_STATE_INFO.IS_SECURITY_PIN_SET,
      userStateCookie
    ) === true
  )
}

export const isSubscriptionActive = (userStateCookie = '') => {
  return (
    getUserStateKeyValue(
      USER_STATE_INFO.IS_SUBSCRIPTION_ACTIVE,
      userStateCookie
    ) === true
  )
}

export const isInvestOnboardingCompleted = (userStateCookie = '') => {
  return (
    getUserStateKeyValue(
      USER_STATE_INFO.IS_INVEST_ONBOARDING_COMPLETED,
      userStateCookie
    ) === true
  )
}

export const setUserCookieData = (
  data: IKeyValuePair<string | boolean | number>
) => {
  const { registration_completed, security_pin_set, phone_number } = data // user profile response

  // set cookies first
  if (registration_completed) {
    setUserState(USER_STATE_INFO.IS_REGISTRATION_COMPLETED, true)
  }

  if (security_pin_set) {
    setUserState(USER_STATE_INFO.IS_SECURITY_PIN_SET, true)
  }

  if (phone_number) {
    setUserState(USER_STATE_INFO.PHONE_NUMBER, phone_number)
  }
}

export const setUserTransactionCookieData = (data: {
  sellGoldData?: IKeyValuePair<string | number | boolean>
}) => {
  const { sellGoldData } = data // user profile response

  // set cookies first
  if (sellGoldData) {
    setUserState(
      USER_TRANSACTION_DATA.SELL_GOLD_DATA,
      JSON.stringify(sellGoldData)
    )
  }
}

export const getUserPhoneNumber = () => {
  return getUserStateKeyValue(USER_STATE_INFO.PHONE_NUMBER)
}

export const getUserEmail = () => {
  return getUserStateKeyValue(USER_STATE_INFO.EMAIL)
}

export const getSellGoldData = () => {
  const sellGoldData = getUserStateKeyValue(
    USER_TRANSACTION_DATA.SELL_GOLD_DATA
  )
  if (sellGoldData) return JSON.parse(sellGoldData)
  return null
}

export const removeSellGoldData = () => {
  setUserState(USER_TRANSACTION_DATA.SELL_GOLD_DATA, '')
}

export const getCreateSecurityPin = () => {
  const createSecurityPin = getUserStateKeyValue(
    USER_TRANSACTION_DATA.CREATE_SECURITY_PIN
  )
  if (createSecurityPin) return createSecurityPin
  return null
}

export const removeCreateSecurityPin = () => {
  setUserState(USER_TRANSACTION_DATA.CREATE_SECURITY_PIN, '')
}

export const setUserBuyGoldData = (
  buyGoldData: IKeyValuePair<string | number | boolean>
) => {
  if (buyGoldData) {
    setUserState(
      USER_TRANSACTION_DATA.BUY_GOLD_DATA,
      JSON.stringify(buyGoldData)
    )
  }
}

export const getBuyGoldData = (userStateCookie = '') => {
  const buyGoldData = getUserStateKeyValue(
    USER_TRANSACTION_DATA.BUY_GOLD_DATA,
    userStateCookie
  )

  if (!isEmpty(buyGoldData)) return JSON.parse(buyGoldData)

  return {}
}

export const removeBuyGoldData = () => {
  setUserState(USER_TRANSACTION_DATA.BUY_GOLD_DATA, '')
}

export const setUserAutoInvestGoldData = (
  autoInvestData: IKeyValuePair<string | number | boolean>
) => {
  if (autoInvestData) {
    setUserState(
      USER_TRANSACTION_DATA.AUTO_INVEST_DATA,
      JSON.stringify(autoInvestData)
    )
  }
}

export const getAutoInvestGoldData = (userStateCookie = '') => {
  const autoInvestData = getUserStateKeyValue(
    USER_TRANSACTION_DATA.AUTO_INVEST_DATA,
    userStateCookie
  )

  if (!isEmpty(autoInvestData)) return JSON.parse(autoInvestData)

  return {}
}

export const removeAutoInvestGoldData = () => {
  setUserState(USER_TRANSACTION_DATA.AUTO_INVEST_DATA, '')
}
