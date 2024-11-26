import { Elements } from '@stripe/react-stripe-js'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useSelector } from 'react-redux'

import { PosthogEvents } from '@constants'
import { Body, FullScreenLoader } from '@sw-npm-packages/components'
import {
  PAYMENT_FREQUENCY,
  PAYMENT_FREQUENCY_LABEL_SHORT,
  PAYMENT_TYPES,
  PAYMENT_VENDORS
} from '@sw-npm-packages/constants'
import { isEmpty } from '@sw-npm-packages/utils'
import { PaymentCheckoutForm } from 'components'
import { fetchUserProfile } from 'config'
import { extractQueryValueFromSearchParams, stripePromise } from 'helpers'
import { emitTrackEvent } from 'helpers/events'
import { BottomNavigationLayout, PrimaryLayout } from 'layouts'
import {
  selectAutoInvestGoldData,
  selectBuyGoldData
} from 'store/selectors/user-finance'

const appearance = {
  theme: 'stripe'
}

const Payment = () => {
  const t = useTranslations('PaymentPage')

  const buyGoldData = useSelector(selectBuyGoldData)
  const autoInvestGoldData = useSelector(selectAutoInvestGoldData)

  const [clientSecret, setClientSecret] = React.useState('')
  const [paymentType, setPaymentType] = React.useState('')
  const [vendor, setVendor] = React.useState('')

  const { data: userData } = useQuery(fetchUserProfile())
  const { redirect } = userData || {}

  const { amountWithCurrency, quantity } = buyGoldData
  const { frequency, amountWithCurrency: autoInvestAmountWithCurrency } =
    autoInvestGoldData

  React.useEffect(() => {
    const code = extractQueryValueFromSearchParams(
      window.location.search,
      'code'
    )

    const type = extractQueryValueFromSearchParams(
      window.location.search,
      'type'
    )

    const vendor = extractQueryValueFromSearchParams(
      window.location.search,
      'vendor'
    )

    if (code) {
      setClientSecret(code)
    }

    if (type) {
      setPaymentType(type)
    }

    if (
      !isEmpty(vendor) &&
      Object.values(PAYMENT_VENDORS).includes(vendor as string)
    ) {
      setVendor(vendor as string)
    }

    if (type === PAYMENT_TYPES.ONE_TIME) {
      emitTrackEvent(PosthogEvents.BuyStripePageViewed)
    } else if (type === PAYMENT_TYPES.SUBSCRIPTION) {
      emitTrackEvent(PosthogEvents.RecurrenceStripePageViewed)
    }
  }, [])

  const options = {
    clientSecret,
    appearance
  }

  const isCampaignMode = Boolean(redirect)

  const isOneTimePayment = paymentType === PAYMENT_TYPES.ONE_TIME
  const isSubscription = paymentType === PAYMENT_TYPES.SUBSCRIPTION

  const title = isOneTimePayment
    ? t('buyGold')
    : isSubscription
    ? t('autoInvest')
    : ' '

  if (isEmpty(vendor)) return null

  return (
    <BottomNavigationLayout show={!isCampaignMode}>
      <PrimaryLayout title={title}>
        {isOneTimePayment || isSubscription ? (
          <div className="flex-1 flex-col">
            <div className="flex-col items-center my-4">
              <h2>{t('payNow')}</h2>
              {isSubscription ? (
                <Body className="text-center">
                  {t.rich('startingToday', {
                    // todo translate per and every or fix styling
                    amount: autoInvestAmountWithCurrency,
                    frequency:
                      frequency === PAYMENT_FREQUENCY.DAILY
                        ? t('per')
                        : t('every'),
                    frequencyLabel: t(
                      PAYMENT_FREQUENCY_LABEL_SHORT[frequency as string]
                    ),
                    br: () => <br />,
                    span: (content) => (
                      <span className="text-pink">{content}</span>
                    )
                  })}
                </Body>
              ) : (
                <Body className="text-center">
                  {t.rich('youArePurchasing', {
                    amount: amountWithCurrency,
                    quantity,
                    span: (content) => (
                      <span className="text-pink">{content}</span>
                    ),
                    br: () => <br />
                  })}
                </Body>
              )}
            </div>

            {clientSecret && vendor === PAYMENT_VENDORS.STRIPE && (
              <Elements options={options} stripe={stripePromise}>
                <PaymentCheckoutForm type={paymentType} />
              </Elements>
            )}
          </div>
        ) : (
          <FullScreenLoader />
        )}
      </PrimaryLayout>
    </BottomNavigationLayout>
  )
}

export default Payment
