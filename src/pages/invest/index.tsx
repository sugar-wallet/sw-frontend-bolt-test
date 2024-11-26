import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { useTranslations } from 'next-intl'
import React, { ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PosthogEvents } from '@constants'
import {
  Body,
  ContainedButton,
  FlatInput,
  FullScreenLoader,
  Input,
  Title
} from '@sw-npm-packages/components'
import {
  CurrencySymbol,
  SupportedCurrencySymbols,
  currencyToSymbol,
  COOKIE_KEYS
} from '@sw-npm-packages/constants'
import { getUserIdFromJWT, isEmpty, round } from '@sw-npm-packages/utils'
import { LimitedTimeBanner } from 'components'
import {
  AutoInvestMessage,
  CancelAutoInvest,
  PaymentFrequency
} from 'components/Invest'
import TermsAndConditionModal from 'components/TermsAndConditionModal'
import {
  fetchGoldLatestPrice,
  fetchUserGoldSubscriptions,
  fetchUserProfile,
  navigationPaths
} from 'config'
import {
  formatMoney,
  getAutoInvestDefaultFrequency,
  gtmPushEvent
} from 'helpers'
import { emitTrackEvent } from 'helpers/events'
import { navigate, navigateWithParams } from 'helpers/navigation'
import { BottomNavigationLayout, PrimaryLayout } from 'layouts'
import { selectIsPaymentIntentProcessing } from 'store/selectors/payment'

const Invest = () => {
  const t = useTranslations('AutoInvestPage')

  const [frequency, setFrequency] = React.useState(null)
  const isPaymentIntentProcessing = useSelector(selectIsPaymentIntentProcessing)

  const { data: userData } = useQuery(fetchUserProfile())
  const { data: goldPriceData } = useQuery(fetchGoldLatestPrice())
  const { minPurchaseAmount: minimumPurchaseAmount = 1 } = goldPriceData || {}
  const {
    data: subscriptionData,
    isLoading,
    isFetching
  } = useQuery(fetchUserGoldSubscriptions())

  const [amount, setAmount] = React.useState('')
  const [isTncAgreed, setIsTncAgreed] = React.useState(false)
  const [isCampaignMode, setCampaignMode] = React.useState(false)
  const [minPurchaseAmt, setMinPurchaseAmt] = React.useState(0)
  const [displayModal, setDisplayModal] = React.useState(false)

  const [isChangeInvestmentMode, setIsChangeInvestmentMode] =
    React.useState(false)

  const { currency, redirect, redirectionPage, minCampaignPurchaseAmount } =
    userData || {}

  const dispatch = useDispatch()

  React.useEffect(() => {
    emitTrackEvent(PosthogEvents.RecurrencePageViewed)
  }, [])

  useEffect(() => {
    if (redirect && minimumPurchaseAmount) {
      setCampaignMode(true)

      if (minCampaignPurchaseAmount) {
        setAmount(minCampaignPurchaseAmount.toString())
        setMinPurchaseAmt(minCampaignPurchaseAmount)
      } else {
        if (currency === SupportedCurrencySymbols.TRY) {
          setAmount('25')
          setMinPurchaseAmt(25)
        } else {
          setAmount('50')
          setMinPurchaseAmt(50)
        }
      }
    } else if (minimumPurchaseAmount) {
      setMinPurchaseAmt(minimumPurchaseAmount)
    }
  }, [redirect, minimumPurchaseAmount])

  React.useEffect(() => {
    setFrequency(getAutoInvestDefaultFrequency(currency as CurrencySymbol))
  }, [currency])

  const purchaseAmount = Number(amount)

  const currencySymbol = currency
    ? currencyToSymbol[currency?.toUpperCase() as CurrencySymbol]
    : null

  useEffect(() => {
    if (redirect && redirectionPage === 'BUY') {
      navigate(navigationPaths.buy)
    }
  }, [redirect, redirectionPage])

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target?.value?.length < 7) {
      setAmount(event.target?.value)
    }
  }

  const onFrequencyChange = (value: string) => {
    emitTrackEvent(PosthogEvents.PlanFrequencyChanged, {
      oldFrequency: frequency,
      newFrequency: value
    })
    setFrequency(value)
  }

  const onBlur = () => {
    emitTrackEvent(PosthogEvents.PlanAmountChanged, {
      amount
    })
  }

  const onChangeInvestmentMode = () => {
    setIsChangeInvestmentMode(true)
  }

  const onTermsAndConditionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked
    emitTrackEvent(PosthogEvents.PlanIAgreeCheckboxClicked, {
      checked: value
    })
    setIsTncAgreed(value)
  }

  const onContinueClick = () => {
    const amount = round(purchaseAmount, 2)

    const token = getCookie(COOKIE_KEYS.ACCESS_TOKEN)
    const userId = getUserIdFromJWT(token)
    gtmPushEvent('add_to_cart', {
      ecommerce: {
        payment_type: 'subscription', // one time / subscription,
        value: amount,
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

    emitTrackEvent(PosthogEvents.PlanPageSubmitClicked, {
      frequency,
      amount
    })

    const data = {
      amount,
      amountWithCurrency: formatMoney(amount),
      frequency,
      currency: currency as string
    }

    // // update buy gold data first
    // dispatch(updateAutoInvestGoldData(data))

    // // save data in cookie
    // setUserAutoInvestGoldData(data)

    navigateWithParams(navigationPaths.adjustDate, data)
    // navigate(
    //   `${navigationPaths.paymentAkahu}?${toQueryParams({
    //     type: PAYMENT_TYPES.SUBSCRIPTION
    //   })}`
    // )
  }

  // const redirectToTnc = () => {
  //   openTab(navigationPaths.investTnC)
  // }

  const isAmountValid = currency ? purchaseAmount >= minPurchaseAmt : false

  const isFetchingSubscriptions = isLoading || isFetching

  const isSubscriptionActive = !isEmpty(subscriptionData)

  return (
    <BottomNavigationLayout show={!isCampaignMode}>
      <PrimaryLayout title={t('autoInvest')}>
        {isFetchingSubscriptions ? (
          <FullScreenLoader />
        ) : (
          <>
            {isSubscriptionActive && !isChangeInvestmentMode ? (
              <CancelAutoInvest
                subscriptionData={subscriptionData}
                onChangeInvestmentMode={onChangeInvestmentMode}
              />
            ) : (
              <div className="flex-1 flex-col">
                <div className="flex-col pb-16">
                  <h3 className="text-center my-2 font-medium">
                    {t('setUpAutoInvest')}
                  </h3>
                  <LimitedTimeBanner />
                  <PaymentFrequency
                    isCampaignMode={isCampaignMode}
                    frequency={frequency}
                    currency={currency as CurrencySymbol}
                    onFrequencyChange={onFrequencyChange}
                  />
                  <div className="items-center mt-10 max-xs:mt-6 flex-col">
                    <Title className="mb-4 font-medium">
                      {t('howMuchInvest', {
                        currency: currencySymbol,
                        frequency: isCampaignMode ? t('weekly') : ''
                      })}
                    </Title>
                    <FlatInput
                      currency={currencySymbol || ' '}
                      type="number"
                      value={amount}
                      onChange={onChange}
                      onBlur={onBlur}
                      currencyClassNames="text-[3rem] max-xs:text-3xl"
                      inputClassNames="!text-[3rem] max-xs:!text-3xl"
                      {...(currencySymbol ? { placeholder: `0.00` } : null)}
                    />
                  </div>
                  <AutoInvestMessage
                    purchaseAmount={purchaseAmount}
                    minPurchaseAmount={minPurchaseAmt}
                    frequency={frequency}
                  />
                </div>

                <div
                  className={`${
                    isCampaignMode ? '' : 'fixed !bottom-[4em] pb-6 bg-white'
                  } w-[92vw] flex-col bg-white`}
                >
                  <div className="m-4">
                    <Input
                      type="checkbox"
                      checked={isTncAgreed}
                      onChange={onTermsAndConditionChange}
                    />
                    <Body className="ml-4 text-sm">
                      {t.rich('iAgreeTnC', {
                        span: (content) => (
                          <span
                            onClick={() => setDisplayModal(!displayModal)}
                            className="underline cursor-pointer"
                          >
                            {content}
                          </span>
                        )
                      })}
                    </Body>
                  </div>
                  <ContainedButton
                    onClick={onContinueClick}
                    isLoading={isPaymentIntentProcessing}
                    disabled={
                      !isAmountValid ||
                      isPaymentIntentProcessing ||
                      !isTncAgreed
                    }
                    className="btn-contained-pink font-normal"
                  >
                    {t('continue')}
                  </ContainedButton>
                </div>
                <TermsAndConditionModal
                  displayModal={displayModal}
                  setDisplayModal={setDisplayModal}
                />
              </div>
            )}
          </>
        )}
      </PrimaryLayout>
    </BottomNavigationLayout>
  )
}

export default Invest
