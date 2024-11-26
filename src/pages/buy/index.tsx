import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { useTranslations } from 'next-intl'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { PosthogEvents } from '@constants'
import { ContainedButton, FlatInput, Title } from '@sw-npm-packages/components'
import {
  CurrencySymbol,
  PAYMENT_TYPES,
  SupportedCurrencySymbols,
  Unit,
  currencyToSymbol,
  COOKIE_KEYS
} from '@sw-npm-packages/constants'
import { getUserIdFromJWT, isEmpty, round } from '@sw-npm-packages/utils'
import { Incentive, LimitedTimeBanner } from 'components'
import { BuyLivePrice, PurchaseQuantityMessage } from 'components/Buy'
import { fetchGoldLatestPrice, fetchUserProfile, navigationPaths } from 'config'
import {
  formatMoney,
  computePurchaseGoldQuantity,
  setUserBuyGoldData,
  toQueryParams,
  gtmPushEvent
} from 'helpers'
import { emitTrackEvent } from 'helpers/events'
import { navigate } from 'helpers/navigation'
import { BottomNavigationLayout, PrimaryLayout } from 'layouts'
import { updateBuyGoldData } from 'store/actions/user-finance'

const Buy = () => {
  const t = useTranslations('BuyPage')

  const { data: userData } = useQuery(fetchUserProfile())
  const { data: goldPriceData } = useQuery(fetchGoldLatestPrice())
  const [isCampaignMode, setCampaignMode] = useState(false)
  const [minPurchaseAmt, setMinPurchaseAmt] = useState(0)

  const [isIncentiveMode, setIncentiveMode] = useState(false)

  const [amount, setAmount] = React.useState('')

  const dispatch = useDispatch()

  const { currency, redirect, redirectionPage, minCampaignPurchaseAmount } =
    userData || {}
  const { formattedBuyRate, minPurchaseAmount: minimumPurchaseAmount = 1 } =
    goldPriceData || {}

  const purchaseAmount = Number(amount)

  const currencySymbol = currency
    ? currencyToSymbol[currency?.toUpperCase() as CurrencySymbol]
    : null

  useEffect(() => {
    emitTrackEvent(PosthogEvents.BuyPageViewed)
  }, [])

  useEffect(() => {
    if (redirect && redirectionPage === 'SUBSCRIPTION') {
      navigate(navigationPaths.invest)
    }
  }, [redirect, redirectionPage])

  useEffect(() => {
    if (redirect && minimumPurchaseAmount) {
      setCampaignMode(true)
      if (minCampaignPurchaseAmount) {
        setAmount(minCampaignPurchaseAmount.toString())
        setMinPurchaseAmt(minCampaignPurchaseAmount)
      } else {
        setAmount('50')
        setMinPurchaseAmt(50)
      }
    } else if (minimumPurchaseAmount) {
      setMinPurchaseAmt(minimumPurchaseAmount)
    }
  }, [redirect, minimumPurchaseAmount])

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target?.value?.length < 7) {
      setAmount(event.target?.value)
    }
  }

  const handleBuyGold = (amount: number) => {
    emitTrackEvent(PosthogEvents.BuyGoldClicked, {
      amount,
      rate: formattedBuyRate
    })

    const data = {
      amount,
      amountWithCurrency: formatMoney(amount),
      quantity: computePurchaseGoldQuantity({
        purchaseAmount: amount,
        perUnitAmount: formattedBuyRate as number
      }),
      unit: Unit.G, // FIXME: clarify G or MG
      perUnitBuyPrice: formattedBuyRate as number,
      currency: currency as string,
      isCampaignMode
    }

    // update buy gold data first
    dispatch(updateBuyGoldData(data))

    // save in cookie
    setUserBuyGoldData(data)

    const token = getCookie(COOKIE_KEYS.ACCESS_TOKEN)
    const userId = getUserIdFromJWT(token)
    gtmPushEvent('add_to_cart', {
      ecommerce: {
        payment_type: 'one time', // one time / subscription,
        value: amount,
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

    if (currency === SupportedCurrencySymbols.NZD) {
      // navigate to select bank account
      navigate(
        `${navigationPaths.paymentAkahu}?${toQueryParams({
          type: PAYMENT_TYPES.ONE_TIME
        })}`
      )
    } else {
      // then navigate to info page
      navigate(navigationPaths.prePurchaseInfo)
    }
  }

  const onContinueClick = () => {
    if (currency === SupportedCurrencySymbols.INR && amount === '100') {
      setIncentiveMode(true)
    } else {
      const amount = round(purchaseAmount, 2)
      handleBuyGold(amount)
    }
  }
  // for incentive mode
  const handleDoubleInvestment = () => {
    setAmount('200')
    handleBuyGold(200)
  }
  // for incentive mode
  const handleSameInvestment = () => {
    const amount = round(purchaseAmount, 2)
    handleBuyGold(amount)
  }

  const isAmountValid = currency ? purchaseAmount >= minPurchaseAmt : false

  if (isIncentiveMode) {
    return (
      <BottomNavigationLayout show={!isCampaignMode}>
        <PrimaryLayout title={t('buyGold')}>
          <Incentive
            onDoubleInvestment={handleDoubleInvestment}
            onContinueInvestment={handleSameInvestment}
          />
        </PrimaryLayout>
      </BottomNavigationLayout>
    )
  }

  return (
    <BottomNavigationLayout show={!isCampaignMode}>
      <PrimaryLayout title={t('buyGold')}>
        <div className="flex-1 flex-col">
          <div className="flex-col pb-56">
            <LimitedTimeBanner />
            <BuyLivePrice />
            <div className="flex-col justify-center items-center mt-20 max-xs:mt-10">
              <Title className="mb-4 font-medium">
                {t('howMuchDoYouWant')}
              </Title>
              <FlatInput
                type="number"
                value={amount}
                onChange={onChange}
                currency={currencySymbol || ' '}
                inputClassNames="!text-[3rem] max-xs:!text-3xl"
                currencyClassNames="text-[3rem] max-xs:text-3xl"
                {...(currencySymbol
                  ? {
                      placeholder: `0.00`
                    }
                  : null)}
              />
            </div>
            <PurchaseQuantityMessage
              purchaseAmount={purchaseAmount}
              perUnitAmount={formattedBuyRate as number}
              minPurchaseAmount={minPurchaseAmt}
              currencySymbol={currencySymbol}
              showMessage={!isEmpty(amount)}
            />
          </div>

          <ContainedButton
            onClick={onContinueClick}
            disabled={!isAmountValid || !formattedBuyRate}
            className="btn-fixed-bottom btn-contained-pink font-normal !bottom-[3.5em]"
          >
            {t('continue')}
          </ContainedButton>
        </div>
      </PrimaryLayout>
    </BottomNavigationLayout>
  )
}

export default Buy
