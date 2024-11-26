import { type Stripe, type PaymentIntentResult } from '@stripe/stripe-js'
import { isAxiosError, type AxiosResponse } from 'axios'
// import ReactGA from 'react-ga4'
// import TagManager from 'react-gtm-module'
import { type AnyAction } from 'redux'
import { call, put, select } from 'redux-saga/effects'

import { PosthogEvents } from '@constants'
import {
  PAYMENT_ERRORS,
  PAYMENT_STATUS,
  PAYMENT_TYPES,
  PAYMENT_VENDORS,
  REQUEST_RESPONSE_STATUS,
  SupportedCurrencySymbols,
  isProduction
} from '@sw-npm-packages/constants'
import {
  IPaymentIntent,
  IConfirmPayment,
  IRetrievePayment,
  IKeyValuePair
} from '@sw-npm-packages/types'
import {
  Dayjs,
  isEmpty,
  isFunction,
  logger,
  notifyError,
  queryClient
} from '@sw-npm-packages/utils'
import { goldApi, paymentApi } from 'api'
import {
  GOOGLE_ANALYTICS_ID,
  GTM_ID,
  PIXEL_ID,
  navigationPaths,
  RAZORPAY_DEFAULT_CONFIG,
  fetchUserProfile
} from 'config'
import {
  removeAutoInvestGoldData,
  removeBuyGoldData,
  stripePromise,
  toQueryParams
} from 'helpers'
import {
  emitFetchUserBalance,
  emitFetchUserGoldSubscriptions,
  emitFetchUserTransactions,
  emitTrackEvent
} from 'helpers/events'
import { navigate } from 'helpers/navigation'
import translate from 'languages'
import { updatePaymentStatus } from 'store/actions/payment'
import {
  updateAutoInvestGoldData,
  updateBuyGoldData
} from 'store/actions/user-finance'
import { PAYMENT_STATE_KEYS } from 'store/constants/payment'
import {
  selectAutoInvestGoldData,
  selectBuyGoldData
} from 'store/selectors/user-finance'

import { getCountryCode } from '../../../@sw-npm-packages/config'
import * as types from '../../types/payment'

const facebookPixelId = PIXEL_ID
const googleAnalyticsId = GOOGLE_ANALYTICS_ID
const gtmId = GTM_ID

function importFbPixel() {
  return new Promise((resolve) => {
    import('react-facebook-pixel')
      .then((module) => module.default)
      .then((ReactPixel) => resolve(ReactPixel))
  })
}

function* trackFbGoogleAnalytics({
  transactionId,
  type
}: {
  transactionId: string
  type: string
}) {
  try {
    let data: IKeyValuePair<string | number> = {}

    if (type === PAYMENT_TYPES.ONE_TIME) {
      data = yield select(selectBuyGoldData)
    } else if (type === PAYMENT_TYPES.SUBSCRIPTION) {
      data = yield select(selectAutoInvestGoldData)
    }

    if (
      !isEmpty(data) &&
      facebookPixelId &&
      googleAnalyticsId &&
      gtmId &&
      getCountryCode() !== 'NZ'
    ) {
      const { amount, currency } = data
      const ReactPixel = yield importFbPixel()
      // Initialize analytics libraries
      ReactPixel.init(facebookPixelId) // Initialize ReactPixel
      // ReactGA.initialize(googleAnalyticsId) // Initialize ReactGA
      // TagManager.initialize({ gtmId })
      //
      // // Define data for TagManager
      // const tagManagerArgs = {
      //   dataLayer: {
      //     event: 'conversion',
      //     value: amount,
      //     currency,
      //     transaction_id: transactionId
      //   }
      // }

      // Send data to TagManager
      // TagManager.dataLayer(tagManagerArgs)

      // Send page view to ReactGA
      // ReactGA.send({
      //   hitType: 'pageview',
      //   page: window.location.pathname, // Use router.asPath to get the current URL
      //   title: 'Page View'
      // })

      // Send a custom event to ReactGA
      // ReactGA.event({
      //   category: 'User',
      //   action: 'Purchase'
      // })

      // Track a purchase event with ReactPixel
      ReactPixel.track('purchase', { currency, value: amount })
    }
  } catch (err) {
    logger.error('Error in trackFbGoogleAnalytics: ', err)
  }
}

function* handlePaymentIntent(data: IPaymentIntent) {
  try {
    const {
      amount,
      paymentType,
      frequency,
      currency,
      startDate,
      isCampaignMode,
      account_id,
      callbackFn
    } = data

    if (
      [PAYMENT_TYPES.ONE_TIME, PAYMENT_TYPES.SUBSCRIPTION].includes(paymentType)
    ) {
      yield put(
        updatePaymentStatus(PAYMENT_STATE_KEYS.PAYMENT_INTENT, {
          status: REQUEST_RESPONSE_STATUS.PROCESSING
        })
      )

      let response: AxiosResponse

      if (paymentType === PAYMENT_TYPES.ONE_TIME) {
        response = yield call(goldApi.buyGold, {
          amount: amount,
          ...(currency === SupportedCurrencySymbols.NZD
            ? { extra: { account_id } }
            : null)
        })
      } else {
        response = yield call(goldApi.startSubscription, {
          amount,
          start_date: startDate,
          frequency,
          currency,
          ...(currency === SupportedCurrencySymbols.NZD
            ? { extra: { account_id } }
            : null)
        })
      }

      logger.log('payment intent response :- ', response.data)

      const {
        client_secret,
        amount: amountInSmallestUnit,
        vendor,
        reward
      } = response.data

      const isCampaign = reward || isCampaignMode

      if (vendor === PAYMENT_VENDORS.AKAHU) {
        if (client_secret && isFunction(callbackFn)) {
          yield call(callbackFn, {
            success: true,
            code: client_secret,
            vendor
          })

          yield put(
            updatePaymentStatus(PAYMENT_STATE_KEYS.PAYMENT_INTENT, {
              status: REQUEST_RESPONSE_STATUS.SUCCESS
            })
          )
        }
      } else if (vendor === PAYMENT_VENDORS.STRIPE) {
        if (client_secret && isFunction(callbackFn)) {
          yield call(callbackFn, {
            success: true,
            code: client_secret,
            vendor
          })

          yield put(
            updatePaymentStatus(PAYMENT_STATE_KEYS.PAYMENT_INTENT, {
              status: REQUEST_RESPONSE_STATUS.SUCCESS
            })
          )
        }
      } else if (vendor === PAYMENT_VENDORS.RAZORPAY) {
        const isSubscription = client_secret?.startsWith('sub_')

        const { data: userData }: AxiosResponse = yield queryClient.fetchQuery(
          fetchUserProfile()
        )

        const {
          first_name,
          last_name,
          email,
          phone_number: contact
        } = userData || {}

        const name = `${first_name} ${last_name}`

        const options = {
          ...RAZORPAY_DEFAULT_CONFIG,
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
          amount: amountInSmallestUnit,
          ...(isSubscription
            ? { subscription_id: client_secret }
            : { order_id: client_secret }),
          handler: function (response) {
            logger.log('payment response :- ', response)
            navigate(
              `${window.location.origin}${
                navigationPaths.paymentResponse
              }?${toQueryParams({
                pg_vendor: PAYMENT_VENDORS.RAZORPAY,
                payment_id: response.razorpay_payment_id,
                ...(isCampaignMode ? { campaignMode: 'true' } : null)
              })}`
            )
          },
          prefill: {
            name,
            contact,
            ...(!isEmpty(email) ? { email } : null)
          }
        }

        const rzp1 = new Razorpay(options)
        rzp1.open()

        yield put(
          updatePaymentStatus(PAYMENT_STATE_KEYS.PAYMENT_INTENT, {
            status: REQUEST_RESPONSE_STATUS.SUCCESS
          })
        )
      }
    }
  } catch (err) {
    logger.error('Error in handlePaymentIntent :- ', err)

    yield put(
      updatePaymentStatus(PAYMENT_STATE_KEYS.PAYMENT_INTENT, {
        status: REQUEST_RESPONSE_STATUS.ERROR,
        errorMessage: err.message
      })
    )

    yield call(notifyError, err?.response?.data?.message || err?.message)
  }
}

function* handleConfirmPayment(data: IConfirmPayment) {
  const { elements, isCampaignMode } = data

  try {
    yield put(
      updatePaymentStatus(PAYMENT_STATE_KEYS.PAYMENT, {
        status: REQUEST_RESPONSE_STATUS.PROCESSING
      })
    )

    const stripe: Stripe = yield call(() => stripePromise)

    const queryParams = {
      pg_vendor: PAYMENT_VENDORS.STRIPE,
      ...(isCampaignMode ? { campaignMode: 'true' } : null)
    }

    const response: PaymentIntentResult = yield call(stripe.confirmPayment, {
      elements,
      confirmParams: {
        return_url: `${window.location.origin}${
          navigationPaths.paymentResponse
        }?${toQueryParams(queryParams)}`
      }
    })

    logger.log('payment confirm response :- ', response)

    const { error } = response

    if (error) {
      const errorMessage = Object.values(PAYMENT_ERRORS).includes(error?.type)
        ? error.message
        : 'An unexpected error occurred.'

      logger.error(errorMessage)
      notifyError(translate('FormValidationPage.stripeErrorMessage'), {
        autoClose: 20 * 1000
      })
      yield call(emitTrackEvent, PosthogEvents.StripePaymentFailed, {
        type: error?.type || '',
        message: error?.message || 'An unexpected error occurred.'
      })

      yield put(
        updatePaymentStatus(PAYMENT_STATE_KEYS.PAYMENT, {
          status: REQUEST_RESPONSE_STATUS.ERROR,
          errorMessage: errorMessage as string
        })
      )
    }
  } catch (err) {
    logger.error('Error in handleConfirmPayment :- ', err)

    yield put(
      updatePaymentStatus(PAYMENT_STATE_KEYS.PAYMENT, {
        status: REQUEST_RESPONSE_STATUS.ERROR,
        errorMessage: err.message
      })
    )
  }
}

function* handleRetrievePaymentIntent(data: IRetrievePayment) {
  const { pgVendor, paymentId, clientSecret, callback } = data

  try {
    yield put(
      updatePaymentStatus(PAYMENT_STATE_KEYS.PAYMENT, {
        status: REQUEST_RESPONSE_STATUS.PROCESSING
      })
    )

    let paymentIntent

    if (pgVendor === PAYMENT_VENDORS.STRIPE) {
      const stripe: Stripe = yield call(() => stripePromise)

      const response: PaymentIntentResult = yield call(
        stripe.retrievePaymentIntent,
        clientSecret
      )

      logger.log('retrieve payment intent response :- ', response)

      paymentIntent = response.paymentIntent
    } else {
      // compose paymentIntent for razorpay
      paymentIntent = {
        status: PAYMENT_STATUS.SUCCEEDED
      }
    }

    if (paymentIntent?.status === PAYMENT_STATUS.SUCCEEDED) {
      logger.info('Payment succeeded!')

      let paymentIntentResponse: AxiosResponse

      if (pgVendor === PAYMENT_VENDORS.STRIPE) {
        paymentIntentResponse = yield call(paymentApi.stripePaymentIntentInfo, {
          id: paymentIntent.id
        })
      } else if (pgVendor === PAYMENT_VENDORS.RAZORPAY) {
        paymentIntentResponse = yield call(
          paymentApi.razorpayPaymentIntentInfo,
          {
            id: paymentId
          }
        )
      } else if (pgVendor === PAYMENT_VENDORS.AKAHU) {
        paymentIntentResponse = yield call(paymentApi.akahuPaymentIntentInfo, {
          id: paymentId
        })
      }

      logger.log('payment intent response :- ', paymentIntentResponse.data)

      const { message, type, transaction_id, next_payment_date } =
        paymentIntentResponse.data

      const { status } = message || {}

      if (status === REQUEST_RESPONSE_STATUS.PROCESSING) {
        const { message: statusMessage } = message

        yield put(
          updatePaymentStatus(PAYMENT_STATE_KEYS.PAYMENT, {
            status: REQUEST_RESPONSE_STATUS.PROCESSING,
            data: {
              status,
              message: statusMessage
            }
          })
        )

        return
      }

      if (type) {
        emitTrackEvent(
          type === PAYMENT_TYPES.ONE_TIME
            ? PosthogEvents.BuyTransactionSuccessful
            : PosthogEvents.RecurrenceTransactionSuccessful
        )
      }

      if (isFunction(callback) && type) {
        callback({
          success: true,
          paymentType: type,
          next_payment_date: Dayjs(next_payment_date).format('DD MMM YYYY')
        })

        yield put(
          updatePaymentStatus(PAYMENT_STATE_KEYS.PAYMENT, {
            status: REQUEST_RESPONSE_STATUS.SUCCESS
          })
        )
        if (isProduction) {
          yield call(trackFbGoogleAnalytics, {
            transactionId: transaction_id,
            type
          })
        }

        if (type === PAYMENT_TYPES.ONE_TIME) {
          // reset buy gold data
          yield put(updateBuyGoldData({}))
          yield call(removeBuyGoldData)
        } else if (type === PAYMENT_TYPES.SUBSCRIPTION) {
          // reset auto invest data
          yield put(updateAutoInvestGoldData({}))
          yield call(removeAutoInvestGoldData)
        }
      }

      // refetch latest user balance and transactions
      yield call(emitFetchUserBalance, { refetch: true })
      yield call(emitFetchUserTransactions, { refetch: true })

      if (type === PAYMENT_TYPES.SUBSCRIPTION) {
        yield call(emitFetchUserGoldSubscriptions, { refetch: true })
      }
    } else if (paymentIntent?.status === PAYMENT_STATUS.PROCESSING) {
      logger.info('Your payment is processing.')

      yield put(
        updatePaymentStatus(PAYMENT_STATE_KEYS.PAYMENT, {
          status: REQUEST_RESPONSE_STATUS.PROCESSING
        })
      )
    } else if (paymentIntent?.status === PAYMENT_STATUS.PAYMENT_FAILED) {
      const errorMessage = 'Your payment was not successful, please try again.'

      logger.error(errorMessage)

      yield put(
        updatePaymentStatus(PAYMENT_STATE_KEYS.PAYMENT, {
          status: REQUEST_RESPONSE_STATUS.ERROR,
          errorMessage
        })
      )
    } else {
      const errorMessage = 'Something went wrong!'

      logger.error(errorMessage)

      yield put(
        updatePaymentStatus(PAYMENT_STATE_KEYS.PAYMENT, {
          status: REQUEST_RESPONSE_STATUS.ERROR,
          errorMessage
        })
      )
    }
  } catch (err) {
    logger.error('Error in handleRetrievePaymentIntent :- ', err)

    yield put(
      updatePaymentStatus(PAYMENT_STATE_KEYS.PAYMENT, {
        status: REQUEST_RESPONSE_STATUS.ERROR,
        errorMessage: isAxiosError(err)
          ? err.response?.data?.message
          : err.message
      })
    )
  }
}

export function* handlePaymentEvents(action: AnyAction) {
  switch (action.type) {
    case types.HANDLE_PAYMENT_INTENT:
      yield handlePaymentIntent(action.data)
      break

    case types.HANDLE_CONFIRM_PAYMENT:
      yield handleConfirmPayment(action.data)
      break

    case types.HANDLE_RETRIEVE_PAYMENT_INTENT:
      yield handleRetrievePaymentIntent(action.data)
      break

    default:
      break
  }
}
