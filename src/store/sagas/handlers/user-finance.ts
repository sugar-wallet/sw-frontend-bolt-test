import { type AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'
import { type AnyAction } from 'redux'
import { call, put, select, delay } from 'redux-saga/effects'

import { PosthogEvents } from '@constants'
import {
  REQUEST_RESPONSE_STATUS,
  PAYMENT_TYPES,
  PAYMENT_VENDORS,
  SupportedCurrencySymbols,
  COOKIE_KEYS
} from '@sw-npm-packages/constants'
import {
  IKeyValuePair,
  ISellGoldData,
  IBuyGoldData,
  IPaymentIntentCallback,
  IAutoInvestGoldData,
  ERRORS,
  IAkahuTokenState
} from '@sw-npm-packages/types'
import {
  isEmpty,
  logger,
  notifyError,
  queryClient,
  notifySuccess,
  generateUUID,
  getUserIdFromJWT
} from '@sw-npm-packages/utils'
import { goldApi, userFinanceApi } from 'api'
import {
  fetchUserGoldSubscriptions,
  fetchUserProfile,
  navigationPaths
} from 'config'
import {
  appendQueryParams,
  buildAkahuAuthURL,
  getAkahuRedirectURI,
  getAkahuState,
  gtmPushEvent,
  removeAkahuState,
  setAkahuState,
  toQueryParams
} from 'helpers'
import {
  emitFetchUserBalance,
  emitFetchUserGoldSubscriptions,
  emitFetchUserProfile,
  emitFetchUserTransactions,
  emitFetchUserUpiId,
  emitTrackEvent
} from 'helpers/events'
import { navigate } from 'helpers/navigation'
import translate from 'languages'
import { resetAuthStatus } from 'store/actions/auth'
import { handleTriggerModal } from 'store/actions/modal'
import { handlePaymentIntent } from 'store/actions/payment'
import {
  updateUserFinanceStatus,
  handleSellGold as handleSellGoldAction
} from 'store/actions/user-finance'
import { USER_FINANCE_STATE_KEYS } from 'store/constants/user-finance'
import {
  selectAutoInvestGoldData,
  selectBuyGoldData,
  selectSellGoldData
} from 'store/selectors/user-finance'
import { MODALS } from 'types/modal'

import * as types from '../../types/user-finance'

function* handleBuyGold() {
  try {
    yield put(
      updateUserFinanceStatus(USER_FINANCE_STATE_KEYS.BUY_GOLD, {
        status: REQUEST_RESPONSE_STATUS.PROCESSING
      })
    )

    const buyGoldData: IBuyGoldData = yield select(selectBuyGoldData)

    logger.info('buyGoldData :- ', buyGoldData)

    const { amount, isCampaignMode } = buyGoldData || {}

    if (amount > 0) {
      const { data: userData }: AxiosResponse = yield queryClient.fetchQuery(
        fetchUserProfile()
      )

      const callbackFn = ({
        success,
        code,
        vendor
      }: IPaymentIntentCallback) => {
        if (success) {
          const token = getCookie(COOKIE_KEYS.ACCESS_TOKEN)
          const userId = getUserIdFromJWT(token)
          gtmPushEvent('purchase', {
            ecommerce: {
              payment_type: 'one time', // one time / subscription,
              transaction_id: code,
              value: amount,
              tax: undefined,
              currency: 'NZD',
              items: [
                {
                  item_id: undefined,
                  item_name: 'gold',
                  index: 0,
                  item_brand: undefined,
                  item_category: undefined,
                  item_category2: undefined,
                  item_category3: undefined,
                  item_category4: undefined,
                  item_category5: undefined,
                  item_variant: undefined,
                  price: amount,
                  quantity: undefined,
                  currency: 'NZD'
                }
              ]
            },
            user_data: {
              id: userId, // Add the unique User ID here
              phone: userData?.phoneNumber,
              email: userData?.email,
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
          if (vendor === PAYMENT_VENDORS.AKAHU) {
            navigate(
              `${window.location.origin}${
                navigationPaths.paymentResponse
              }?${toQueryParams({
                pg_vendor: PAYMENT_VENDORS.AKAHU,
                payment_id: code
              })}`
            )
          } else {
            navigate(
              `${navigationPaths.payment}?${toQueryParams({
                type: PAYMENT_TYPES.ONE_TIME,
                code,
                vendor
              })}`
            )
          }
        }
      }
      emitTrackEvent(PosthogEvents.BuyGoldRequestSuccess)
      // initiate payment
      yield put(
        handlePaymentIntent({
          amount,
          paymentType: PAYMENT_TYPES.ONE_TIME,
          isCampaignMode,
          currency: buyGoldData.currency,
          callbackFn,
          ...(buyGoldData?.currency === SupportedCurrencySymbols.NZD
            ? { account_id: buyGoldData.account_id }
            : null)
        })
      )
    }
  } catch (err) {
    logger.error('Error in handleBuyGold :- ', err)
    emitTrackEvent(PosthogEvents.BuyGoldRequestError)

    yield put(
      updateUserFinanceStatus(USER_FINANCE_STATE_KEYS.BUY_GOLD, {
        status: REQUEST_RESPONSE_STATUS.ERROR,
        errorMessage: err.message
      })
    )
  }
}

function* handleAutoInvestGold() {
  try {
    yield put(
      updateUserFinanceStatus(USER_FINANCE_STATE_KEYS.INVEST_GOLD, {
        status: REQUEST_RESPONSE_STATUS.PROCESSING
      })
    )

    const autoInvestGoldData: IAutoInvestGoldData = yield select(
      selectAutoInvestGoldData
    )

    logger.info('autoInvestGoldData :- ', autoInvestGoldData)

    const { amount, frequency } = autoInvestGoldData || {}

    if (amount > 0) {
      const { data: userData }: AxiosResponse = yield queryClient.fetchQuery(
        fetchUserProfile()
      )
      const callbackFn = ({
        success,
        code,
        vendor
      }: IPaymentIntentCallback) => {
        if (success) {
          const token = getCookie(COOKIE_KEYS.ACCESS_TOKEN)
          const userId = getUserIdFromJWT(token)
          gtmPushEvent('purchase', {
            ecommerce: {
              payment_type: 'subscription', // one time / subscription,
              transaction_id: code,
              value: amount,
              tax: undefined,
              currency: 'NZD',
              items: [
                {
                  item_id: undefined,
                  item_name: 'gold subscription',
                  index: 0,
                  item_brand: undefined,
                  item_category: undefined,
                  item_category2: undefined,
                  item_category3: undefined,
                  item_category4: undefined,
                  item_category5: undefined,
                  item_variant: undefined,
                  price: amount,
                  quantity: undefined,
                  currency: 'NZD'
                }
              ]
            },
            user_data: {
              id: userId, // Add the unique User ID here
              phone: userData?.phoneNumber,
              email: userData?.email,
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

          if (vendor === PAYMENT_VENDORS.AKAHU) {
            navigate(
              `${window.location.origin}${
                navigationPaths.paymentResponse
              }?${toQueryParams({
                pg_vendor: PAYMENT_VENDORS.AKAHU,
                payment_id: code
              })}`
            )
          } else {
            navigate(
              `${navigationPaths.payment}?type=${PAYMENT_TYPES.SUBSCRIPTION}&code=${code}`
            )
          }
        }
      }

      // initiate payment
      yield put(
        handlePaymentIntent({
          amount,
          paymentType: PAYMENT_TYPES.SUBSCRIPTION,
          frequency,
          startDate: autoInvestGoldData.start_date,
          currency: autoInvestGoldData.currency,
          callbackFn,
          ...(autoInvestGoldData?.currency === SupportedCurrencySymbols.NZD
            ? { account_id: autoInvestGoldData.account_id }
            : null)
        })
      )
    }
  } catch (err) {
    logger.error('Error in handleAutoInvestGold :- ', err)

    yield put(
      updateUserFinanceStatus(USER_FINANCE_STATE_KEYS.INVEST_GOLD, {
        status: REQUEST_RESPONSE_STATUS.ERROR,
        errorMessage: err.message
      })
    )
  }
}

function* handleCancelAutoInvestGold() {
  try {
    yield put(
      updateUserFinanceStatus(USER_FINANCE_STATE_KEYS.CANCEL_INVEST_GOLD, {
        status: REQUEST_RESPONSE_STATUS.PROCESSING
      })
    )

    const response: AxiosResponse = yield queryClient.fetchQuery(
      fetchUserGoldSubscriptions()
    )

    const { id } = response.data || {}

    if (!isEmpty(id)) {
      yield call(userFinanceApi.cancelPaymentSubscription, { id })
      yield call(emitTrackEvent, PosthogEvents.RecurrenceTransactionCancelled)
      yield call(emitFetchUserTransactions, { refetch: true })
      yield call(emitFetchUserGoldSubscriptions, { refetch: true })
      yield put(
        updateUserFinanceStatus(USER_FINANCE_STATE_KEYS.CANCEL_INVEST_GOLD, {
          status: REQUEST_RESPONSE_STATUS.SUCCESS
        })
      )
      yield call(
        notifySuccess,
        translate('AutoInvestPage.subscriptionCancelled')
      )
    }
  } catch (err) {
    logger.error('Error in handleCancelAutoInvestGold :- ', err)

    yield put(
      updateUserFinanceStatus(USER_FINANCE_STATE_KEYS.CANCEL_INVEST_GOLD, {
        status: REQUEST_RESPONSE_STATUS.ERROR,
        errorMessage: err.message
      })
    )
  }
}

function* handleSellGold() {
  const sellGoldData: ISellGoldData = yield select(selectSellGoldData)
  try {
    yield put(
      updateUserFinanceStatus(USER_FINANCE_STATE_KEYS.SELL_GOLD, {
        status: REQUEST_RESPONSE_STATUS.PROCESSING
      })
    )

    const profileResponse: AxiosResponse = yield queryClient.fetchQuery(
      fetchUserProfile()
    )

    const response: AxiosResponse = yield call(goldApi.sellGold, {
      units: sellGoldData.quantity,
      weight_units: sellGoldData.unit,
      sell_all: sellGoldData.quantity === 0,
      ...(profileResponse?.data?.currency === SupportedCurrencySymbols.NZD
        ? { extra: { account_id: sellGoldData.account_id } }
        : null)
    })

    logger.info('SELL gold response :- ', response.data)

    yield put(
      updateUserFinanceStatus(USER_FINANCE_STATE_KEYS.SELL_GOLD, {
        status: REQUEST_RESPONSE_STATUS.SUCCESS
      })
    )
    if (sellGoldData.quantity === 0) {
      emitTrackEvent(PosthogEvents.SellAllGoldRequestSuccess)
    } else {
      emitTrackEvent(PosthogEvents.SellGoldRequestSuccess, {
        unit: sellGoldData.quantity
      })
    }
    yield call(emitTrackEvent, PosthogEvents.SellTransactionSuccessful)
    yield put(resetAuthStatus())
    yield call(emitFetchUserBalance, { refetch: true })
    yield call(emitFetchUserTransactions, { refetch: true })
    yield call(navigate, navigationPaths.sellTransactionSuccess, true)
  } catch (err) {
    logger.error('Error in handleSellGold :- ', err)
    if (sellGoldData.quantity === 0) {
      emitTrackEvent(PosthogEvents.SellAllGoldRequestError)
    } else {
      emitTrackEvent(PosthogEvents.SellGoldRequestError)
    }
    if (err.response?.data?.error_code === ERRORS.CANNOT_SELL_WITHIN_7_DAYS) {
      yield put(handleTriggerModal(MODALS.SELL_BLOCK_MODAL))
    } else if (
      err.response?.data?.error_code ===
      ERRORS.ACCOUNT_FLAGGED_FOR_SUSPICIOUS_ACTIVITY
    ) {
      yield put(handleTriggerModal(MODALS.ACCOUNT_FLAGGED_SELL_MODAL))
    }
  }
}

function* handleUserInfo(value: IKeyValuePair<string | boolean | null>) {
  try {
    yield put(
      updateUserFinanceStatus(USER_FINANCE_STATE_KEYS.USER_INFO, {
        status: REQUEST_RESPONSE_STATUS.PROCESSING
      })
    )

    const response: AxiosResponse = yield call(
      userFinanceApi.collectUserFinanceInfo,
      value
    )

    logger.info('User Info update response :- ', response.data)

    yield put(
      updateUserFinanceStatus(USER_FINANCE_STATE_KEYS.USER_INFO, {
        status: REQUEST_RESPONSE_STATUS.SUCCESS
      })
    )

    yield call(notifySuccess, translate('TaxPage.citizenIdUpdated'))
    yield call(
      navigate,
      appendQueryParams(navigationPaths.signup, [
        'campaignCode',
        'referralCode',
        'worldcupTeam',
        'retargetCode'
      ])
    )
  } catch (err) {
    logger.error('Error in User Info update :- ', err)
    yield call(notifyError, 'Unable to save information')
    yield put(
      updateUserFinanceStatus(USER_FINANCE_STATE_KEYS.USER_INFO, {
        status: REQUEST_RESPONSE_STATUS.ERROR,
        errorMessage: err.message
      })
    )
  }
}

function* handleUserBankAccount(value: IKeyValuePair<string | boolean | null>) {
  try {
    yield put(
      updateUserFinanceStatus(USER_FINANCE_STATE_KEYS.USER_BANK_ACCOUNT, {
        status: REQUEST_RESPONSE_STATUS.PROCESSING
      })
    )

    const response: AxiosResponse = yield call(
      userFinanceApi.collectUserBankAccount,
      value
    )

    logger.info('User Bank account update response :- ', response.data)

    yield put(
      updateUserFinanceStatus(USER_FINANCE_STATE_KEYS.USER_BANK_ACCOUNT, {
        status: REQUEST_RESPONSE_STATUS.SUCCESS
      })
    )

    // yield call(notifySuccess, 'Tax Info updated successfully')
    yield put(handleSellGoldAction())
    // yield call(navigate, navigationPaths.sellAddressDetails)
  } catch (err) {
    logger.error('Error in user bank account update :- ', err)
    yield call(notifyError, 'Unable to save information')
    yield put(
      updateUserFinanceStatus(USER_FINANCE_STATE_KEYS.USER_BANK_ACCOUNT, {
        status: REQUEST_RESPONSE_STATUS.ERROR,
        errorMessage: err.message
      })
    )
  }
}

function* handleUserUpiId(value: IKeyValuePair<string | boolean | null>) {
  try {
    yield put(
      updateUserFinanceStatus(USER_FINANCE_STATE_KEYS.USER_BANK_ACCOUNT, {
        status: REQUEST_RESPONSE_STATUS.PROCESSING
      })
    )

    const response: AxiosResponse = yield call(
      userFinanceApi.collectUserUpiInfo,
      value
    )

    logger.info('User UPI ID update response :- ', response.data)

    yield put(
      updateUserFinanceStatus(USER_FINANCE_STATE_KEYS.USER_BANK_ACCOUNT, {
        status: REQUEST_RESPONSE_STATUS.SUCCESS
      })
    )

    emitFetchUserUpiId({ refetch: true })

    // yield call(notifySuccess, 'Tax Info updated successfully')
    yield put(handleSellGoldAction())
    // yield call(navigate, navigationPaths.sellAddressDetails)
  } catch (err) {
    logger.error('Error in User UPI ID update :- ', err)
    yield call(notifyError, 'Unable to save information')
    yield put(
      updateUserFinanceStatus(USER_FINANCE_STATE_KEYS.USER_BANK_ACCOUNT, {
        status: REQUEST_RESPONSE_STATUS.ERROR,
        errorMessage: err.response?.data?.error_code
      })
    )
  }
}

export function* handleAkahuUserTokenRegistrationEvent(action) {
  const { forceConnect } = action
  try {
    if (!forceConnect) {
      yield delay(1000)
    }

    const response: AxiosResponse = yield queryClient.fetchQuery(
      fetchUserProfile()
    )

    if (response.data.currency === SupportedCurrencySymbols.NZD) {
      // handle akahu
      if (
        response.data.hasAkahuToken === false &&
        (forceConnect || isEmpty(getAkahuState()))
      ) {
        const state = generateUUID()

        const authUrl = buildAkahuAuthURL(state)

        // save in cookie
        setAkahuState(state)

        // navigate for oauth
        yield call(navigate, authUrl)
      }
    }
  } catch (err) {
    logger.error('Error in handleAkahuUserTokenRegistration :- ', err)
  }
}

export function* handleAkahuUserTokenExchangeEvent(data: IAkahuTokenState) {
  const { code, state, error } = data

  try {
    logger.log('akahu error :- ', error)
    if (!code) {
      throw new Error('Akahu authorization code not found.')
    }

    if (!state) {
      throw new Error('Akahu state not found.')
    }

    // verify state
    if (state !== getAkahuState()) {
      throw new Error('Akahu state mismatch.')
    }

    yield call(userFinanceApi.akahuTokenExchange, {
      redirect_uri: getAkahuRedirectURI(),
      token: code
    })

    yield call(emitFetchUserProfile, { refetch: true })

    yield call(navigate, navigationPaths.home)

    removeAkahuState()
  } catch (err) {
    logger.error('Failed to exchange authorization code:', err)
    yield call(navigate, navigationPaths.error)
  }
}

export function* handleUserFinanceEvents(action: AnyAction) {
  switch (action.type) {
    case types.HANDLE_BUY_GOLD:
      yield handleBuyGold()
      break

    case types.HANDLE_AUTO_INVEST_GOLD:
      yield handleAutoInvestGold()
      break

    case types.HANDLE_CANCEL_AUTO_INVEST_GOLD:
      yield handleCancelAutoInvestGold()
      break

    case types.HANDLE_SELL_GOLD:
      yield handleSellGold()
      break

    case types.HANDLE_USER_INFO:
      yield handleUserInfo(action.value)
      break
    case types.HANDLE_USER_BANK_ACCOUNT:
      yield handleUserBankAccount(action.value)
      break
    case types.HANDLE_USER_UPI_ID:
      yield handleUserUpiId(action.value)
      break

    case types.HANDLE_AKAHU_USER_TOKEN_REGISTRATION:
      yield handleAkahuUserTokenRegistrationEvent(action)
      break

    case types.HANDLE_AKAHU_USER_TOKEN_EXCHANGE:
      yield handleAkahuUserTokenExchangeEvent(action.data)
      break

    default:
      break
  }
}
