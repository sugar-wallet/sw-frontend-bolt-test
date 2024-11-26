import { useQuery } from '@tanstack/react-query'
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
  Lottie,
  OutlinedButton,
  SubTitle,
  Title
} from '@sw-npm-packages/components'
import {
  CurrencySymbol,
  PAYMENT_TYPES,
  SupportedCurrencySymbols,
  currencyToSymbol
} from '@sw-npm-packages/constants'
import {
  getDateUserDisplayFormatString,
  isEmpty,
  round
} from '@sw-npm-packages/utils'
import { Info, LimitedTimeBanner } from 'components'
import {
  AutoInvestMessage,
  CancelAutoInvest,
  PaymentFrequency
} from 'components/Invest'
import {
  fetchGoldLatestPrice,
  fetchUserGoldSubscriptions,
  fetchUserProfile,
  navigationPaths
} from 'config'
import {
  formatMoney,
  getAutoInvestDefaultFrequency,
  setUserAutoInvestGoldData,
  toQueryParams
} from 'helpers'
import { emitTrackEvent } from 'helpers/events'
import { navigate } from 'helpers/navigation'
import { BottomNavigationLayout, PrimaryLayout } from 'layouts'
import { updateAutoInvestGoldData } from 'store/actions/user-finance'
import { selectIsPaymentIntentProcessing } from 'store/selectors/payment'
import { ConfettiAnimation } from 'assets/lottiefiles'
import { DatePicker } from 'antd'
import TermsAndConditionModal from 'components/TermsAndConditionModal'
import { useRouter } from 'next/router'
import InvestTermsAndConditions from '../terms-and-conditions'
import moment from 'moment'

const Invest = () => {
  const t = useTranslations('AutoInvestPage')
  const router = useRouter()
  const investData = router.query

  console.log('investData', investData)

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
  const [adjustDate, setAdjustDate] = React.useState(new Date())
  const [displayModal, setDisplayModal] = React.useState(false)

  const date:any = new Date(adjustDate)

  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear() % 100

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  const month = monthNames[monthIndex]

  const selectedDate =
    day <= 9
      ? '0' + day + ' ' + month + ' ' + year
      : day + ' ' + month + ' ' + year

  console.log('selectedDate', selectedDate)

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
    emitTrackEvent(PosthogEvents.PlanPageSubmitClicked, {
      frequency,
      amount
    })

    const data = {
      ...investData,
      start_date: moment(date).format('YYYY-MM-DD')
    }

    // update buy gold data first
    dispatch(updateAutoInvestGoldData(data))

    // save data in cookie
    setUserAutoInvestGoldData(data)

    console.log('adjust date>>>>>>>', moment(date).format('YYYY-MM-DD'))
    console.log('data adjust', data)

    navigate(
      `${navigationPaths.paymentAkahu}?${toQueryParams({
        type: PAYMENT_TYPES.SUBSCRIPTION
      })}`
    )
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
            {/* {isSubscriptionActive && !isChangeInvestmentMode ? (
              <CancelAutoInvest
                subscriptionData={subscriptionData}
                onChangeInvestmentMode={onChangeInvestmentMode}
              />
            ) : ( */}
            <div className="flex-1 flex-col pb-36">
              <div className="flex-col">
                <h3 className="text-center my-2 font-medium">
                  {/* {t('setUpAutoInvest')} */}
                  Choose Starting Date
                </h3>
              </div>
              <div className="d-flex gap-4 w-full justify-center align-center">
                <span className="text-4xl font-extralight border-b border-solid border-gray-400">
                  {day <= 9 ? '0' + day : day}
                </span>{' '}
                <span className="text-4xl font-extralight border-b border-solid border-gray-400">
                  {month}
                </span>{' '}
                <span className="text-4xl font-extralight border-b border-solid border-gray-400">
                  {year}
                </span>
              </div>
              <OutlinedButton
                primaryColor="pink"
                // onClick={onCancelInvestmentClick}
                className="my-2 border-pink flex-initial w-9/12 self-center mt-6"
              >
                <span className="z-0">{t('adjustDate')}</span>
                <div className="absolute z-10 w-8/12">
                  {/* <DatePicker
                      selected={adjustDate}
                      onChange={(date:any) => setAdjustDate(date)}
                    /> */}
                  <DatePicker
                    className="adjust-date-picker w-full"
                    onChange={(date: any, dateString) => {
                      setAdjustDate(date)
                    }}
                  />
                </div>
              </OutlinedButton>
              <div
                style={{
                  boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.50)',
                  borderRadius: '5px',
                  alignSelf: 'center'
                }}
                className="d-flex flex-col w-[90vw] justify-center my-6 px-6 py-6"
              >
                <Title className="font-light text-sm font-semibold text-center">
                  {t('yourFirstInvestmentWillBeMade')} <br />
                  <span className="text-pink font-semibold">
                    {' '}
                    {selectedDate}
                  </span>
                </Title>
                <div className={`${'h-[120px]'} justify-center`}>
                  <Lottie animationData={ConfettiAnimation} />
                </div>
              </div>
              <Info className="items-center self-center w-[90vw] mb-20 px-6">
                <Title className="font-light text-sm font-semibold">
                  {t('YouWillBeInvesting')}
                  <span className="text-pink">
                    {' '}
                    {investData?.amountWithCurrency} {investData?.frequency}
                  </span>
                </Title>
                {/* <SubTitle className="text-base my-2 font-semibold">
                    {getDateUserDisplayFormatString(nextPaymentDate)}
                  </SubTitle> */}
                {/* <Body className="font-light text-center text-xs mx-4 w-[60%]">
                    {t('youCanPause')}
                  </Body> */}
              </Info>

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
                  disabled={!selectedDate || !isTncAgreed}
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
            {/* )} */}
          </>
        )}
      </PrimaryLayout>
    </BottomNavigationLayout>
  )
}

export default Invest
