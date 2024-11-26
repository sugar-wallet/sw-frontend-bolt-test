import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React, { SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PosthogEvents } from '@constants'
import { ContainedButton, OutlinedButton } from '@sw-npm-packages/components'
import { PAYMENT_TYPES } from '@sw-npm-packages/constants'
import { fetchUserProfile } from 'config'
import { emitTrackEvent } from 'helpers/events'
import { goBack } from 'helpers/navigation'
import { handleConfirmPayment } from 'store/actions/payment'
import { selectIsPaymentProcessing } from 'store/selectors/payment'

interface IProps {
  type: string
}

const PaymentCheckoutForm: React.FC<IProps> = ({ type }: IProps) => {
  const t = useTranslations('PaymentPage')
  const isPaymentProcessing = useSelector(selectIsPaymentProcessing)
  const { data } = useQuery(fetchUserProfile())
  const { redirect } = data || {}

  const stripe = useStripe()
  const elements = useElements()

  const dispatch = useDispatch()

  const [isPaymentElementLoading, setIsPaymentElementLoading] =
    React.useState(true)

  const isCampaignMode = Boolean(redirect)

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (type === PAYMENT_TYPES.ONE_TIME) {
      emitTrackEvent(PosthogEvents.BuyStripePagePaymentSubmitClicked)
    } else if (type === PAYMENT_TYPES.SUBSCRIPTION) {
      emitTrackEvent(PosthogEvents.RecurrenceStripePagePaymentSubmitClicked)
    }
    dispatch(handleConfirmPayment({ elements, isCampaignMode }))
  }

  const onPaymentElementReady = () => {
    setIsPaymentElementLoading(false)
  }

  const onCancelPaymentClicked = () => {
    if (type === PAYMENT_TYPES.ONE_TIME) {
      emitTrackEvent(PosthogEvents.BuyStripePagePaymentCancelled)
    } else if (type === PAYMENT_TYPES.SUBSCRIPTION) {
      emitTrackEvent(PosthogEvents.RecurrenceStripePagePaymentCancelled)
    }
    goBack()
  }

  const disabled =
    isPaymentElementLoading || isPaymentProcessing || !stripe || !elements

  return (
    <div>
      <form
        className="flex flex-col flex-1"
        id="payment-form"
        onSubmit={handleSubmit}
      >
        <div className="flex-1 justify-center items-center">
          <div className="flex-col">
            <PaymentElement
              id="payment-element"
              className="pt-4"
              onReady={onPaymentElementReady}
            />
          </div>
        </div>

        <div className="flex-1 mt-10 flex-col mb-20">
          <ContainedButton
            id="submit"
            disabled={disabled}
            className={`flex-initial btn-contained-pink`}
            isLoading={isPaymentProcessing}
          >
            {t('confirm')}
          </ContainedButton>
          <OutlinedButton
            type="button"
            primaryColor="pink"
            onClick={onCancelPaymentClicked}
            className="my-2 border-pink flex-initial"
          >
            {t('cancel')}
          </OutlinedButton>
        </div>
      </form>
    </div>
  )
}

export { PaymentCheckoutForm }
