import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PosthogEvents } from '@constants'
import {
  Body,
  ContainedButton,
  Loader,
  Lottie,
  CountDown,
  Title,
  SubTitle
} from '@sw-npm-packages/components'
import {
  PAYMENT_TYPES,
  PAYMENT_VENDORS,
  REQUEST_RESPONSE_STATUS,
  isGlobalApp
} from '@sw-npm-packages/constants'
import { IRetrievePaymentCallback } from '@sw-npm-packages/types'
import { isEmpty } from '@sw-npm-packages/utils'
import { SuccessImage, CoinImage } from 'assets/images'
import { ClappingAnimation, ConfettiAnimation } from 'assets/lottiefiles'
import { Error } from 'components'
import { NextPaymentDetails } from 'components/Invest'
import { extractQueryValueFromSearchParams } from 'helpers'
import { emitTrackEvent } from 'helpers/events'
import { openTab } from 'helpers/navigation'
import { BottomNavigationLayout, PrimaryLayout } from 'layouts'
import { handleRetrievePaymentIntent } from 'store/actions/payment'
import { selectPaymentStatus } from 'store/selectors/payment'
import { Info } from 'components'

const PaymentResponse: React.FC = () => {
  // const tc = useTranslations('Common')
  const t = useTranslations('AutoInvestPage')
  const tc = useTranslations('Common')
  const paymentStatusState = useSelector(selectPaymentStatus)
  const [paymentType, setPaymentType] = React.useState('')
  const [isPaymentStatusProcessing, setIsPaymentStatusProcessing] =
    React.useState(false)
  const [messageState, setMessageState] = React.useState('')
  const [isWaitingTimeCompleted, setIsWaitingTimeCompleted] =
    React.useState(false)
  const router = useRouter()
  const { campaignMode } = router.query
  const isCampaignMode = campaignMode === 'true'
  const [nextPaymentDate, setNextPaymentDate] = React.useState(null)

  const dispatch = useDispatch()

  const { status, data: paymentStatusData, errorMessage } = paymentStatusState

  const { status: paymentStatus } = paymentStatusData || {}

  React.useEffect(() => {
    const { status: paymentStatus, message } = paymentStatusData || {}

    if (
      !isEmpty(paymentStatusData) &&
      paymentStatus === REQUEST_RESPONSE_STATUS.PROCESSING
    ) {
      setIsPaymentStatusProcessing(true)
      setMessageState(message)
    }
  }, [paymentStatusData])

  const fetchPaymentDetails = () => {
    const pgVendor = extractQueryValueFromSearchParams(
      window.location.search,
      'pg_vendor'
    ) as string

    if (Object.values(PAYMENT_VENDORS).includes(pgVendor)) {
      const callback = ({
        success,
        paymentType,
        next_payment_date
      }: IRetrievePaymentCallback) => {
        if (success && paymentType) {
          setPaymentType(paymentType)
        }

        if (paymentType === PAYMENT_TYPES.SUBSCRIPTION) {
          setNextPaymentDate(next_payment_date)
        }
      }

      if (pgVendor === PAYMENT_VENDORS.STRIPE) {
        const code = extractQueryValueFromSearchParams(
          window.location.search,
          'payment_intent_client_secret'
        ) as string

        // FIXME: how are we accessing paymentType here , ask Sourav
        if (paymentType === PAYMENT_TYPES.ONE_TIME) {
          emitTrackEvent(PosthogEvents.BuySuccessPageViewed)
        } else if (paymentType === PAYMENT_TYPES.SUBSCRIPTION) {
          emitTrackEvent(PosthogEvents.RecurrenceSuccessPageViewed)
        }

        dispatch(
          handleRetrievePaymentIntent({
            pgVendor,
            clientSecret: code,
            callback
          })
        )
      } else if (
        [PAYMENT_VENDORS.RAZORPAY, PAYMENT_VENDORS.AKAHU].includes(pgVendor)
      ) {
        const paymentId = extractQueryValueFromSearchParams(
          window.location.search,
          'payment_id'
        ) as string

        dispatch(
          handleRetrievePaymentIntent({
            pgVendor,
            paymentId,
            callback
          })
        )
      }
    }
  }

  React.useEffect(() => {
    fetchPaymentDetails()
  }, [])

  const callback = () => {
    if (paymentStatus === REQUEST_RESPONSE_STATUS.PROCESSING) {
      fetchPaymentDetails()
    }
  }

  const onComplete = () => {
    setIsWaitingTimeCompleted(true)
  }

  // const onBackToHomeClick = () => {
  //   if (isCampaignMode) {
  //     emitFetchUserProfile({ refetch: true })
  //     navigate(navigationPaths.campaignReward)
  //   } else {
  //     navigate(navigationPaths.home)
  //   }
  // }

  const isOneTimePayment = paymentType === PAYMENT_TYPES.ONE_TIME
  const isSubscription = paymentType === PAYMENT_TYPES.SUBSCRIPTION

  const title = isOneTimePayment
    ? t('buyGold')
    : isSubscription
    ? t('autoInvest')
    : ' '

  return (
    <BottomNavigationLayout show={!isCampaignMode}>
      <PrimaryLayout title={title}>
        <div className="flex-1 flex-col">
          <div className="flex-col min-h-[50vh]">
            {status === REQUEST_RESPONSE_STATUS.SUCCESS ? (
              <div className="flex-1 flex-col pb-40">
                <div className="self-center">
                  <div className="flex-col items-center justify-center">
                    <div className="text-3xl ml-2 text-center font-semibold mt-2">
                      {isSubscription
                        ? `${t('autoInvestStarted')}!`
                        : t('purchaseSuccessFull')}
                      {/* {!isSubscription && (
                        <div className="h-[40px] ml-2">
                          <Image
                            src={SuccessImage}
                            alt="success"
                            className="w-full"
                          />
                        </div>
                      )} */}
                    </div>
                    <Body className="mt-4">{t('youWillReceiveEmail')}</Body>
                    {/* <div
                      className={`${
                        isOneTimePayment ? 'h-[150px]' : 'h-[120px]'
                      } justify-center ${isOneTimePayment ? 'mt-6' : 'mt-2'}`}
                    > */}
                    {/* <Lottie
                        animationData={
                          isGlobalApp ? ClappingAnimation : ConfettiAnimation
                        }
                      /> */}
                    <Image
                      src={CoinImage}
                      alt="success"
                      className="w-full h-full"
                    />
                    {/* </div> */}
                    {!isSubscription && (
                      <div className="mt-2 w-full justify-center">
                        <Info className="w-full items-center my-6 px-6">
                          <Title className="font-medium text-sm">
                            {t('purchaseInProcess')}
                          </Title>
                          {/* <SubTitle className="text-base my-2 font-semibold">
                  {getDateUserDisplayFormatString(nextPaymentDate)}
                </SubTitle> */}
                          <Body className="font-light text-center text-xs mx-4 my-2 w-[80%]">
                            {t('allowWorkingDaysProcess')}
                          </Body>
                          <Body className="font-light text-center text-xs mx-4 w-[80%]">
                            {t('checkStatusInTransaction')}
                          </Body>
                        </Info>
                      </div>
                    )}
                    

                    {/* {isGlobalApp ? (
                      <>
                        <Title className="my-2 text-center font-semibold text-2xl">
                          {t('whatsNext')}
                        </Title>
                        <div className="w-full bg-black shadow-sm p-8 flex-col items-center rounded-lg">
                          <div className="font-medium text-center text-white">
                            {t.rich('didYouKnow?', {
                              span: (content) => (
                                <span className="contents text-gold font-semibold">
                                  {content}
                                </span>
                              )
                            })}
                          </div>
                          <ContainedButton
                            className="mt-4 btn-contained-wa-green !text-black w-full"
                            onClick={() => {
                              openTab(
                                'https://chat.whatsapp.com/FeGC10bZkyLAGVDwAnOlsX'
                              )
                            }}
                          >
                            {t('joinCashbackGroup')}
                          </ContainedButton>
                        </div>
                      </>
                    ) : (
                      <div className="mt-10 w-full">
                        <ContainedButton
                          onClick={() => {
                            router.push('/home')
                          }}
                          className="btn-contained-pink font-normal w-[80%]"
                        >
                          {tc('returnHome')}
                        </ContainedButton>
                      </div>
                    )} */}
                  </div>
                </div>
                {isSubscription && nextPaymentDate ? (
                  <div className="mt-2 justify-center">
                    <NextPaymentDetails nextPaymentDate={nextPaymentDate} />
                  </div>
                ) : null}
                {isGlobalApp && (
                      <div className="mt-5 w-full">
                        <ContainedButton
                          onClick={() => {
                            router.push('/home')
                          }}
                          className="btn-contained-pink font-normal w-[80%]"
                        >
                          {tc(!isSubscription ? 'returnHome' : 'dashboard')}
                        </ContainedButton>
                      </div>
                    )}
              </div>
            ) : (
              <div className="flex-1 justify-center items-center">
                {status === REQUEST_RESPONSE_STATUS.PROCESSING &&
                !isPaymentStatusProcessing &&
                !isWaitingTimeCompleted ? (
                  <Loader />
                ) : status === REQUEST_RESPONSE_STATUS.ERROR ||
                  isPaymentStatusProcessing ? (
                  <div className="flex-col items-center">
                    {isPaymentStatusProcessing && !isWaitingTimeCompleted ? (
                      <CountDown callback={callback} onComplete={onComplete} />
                    ) : null}

                    <Error
                      message={
                        (isPaymentStatusProcessing
                          ? messageState
                          : errorMessage) as string
                      }
                    />
                  </div>
                ) : null}
              </div>
            )}
          </div>
          {/* <div className="w-full">
            <ContainedButton
              onClick={onBackToHomeClick}
              className={`${
                isCampaignMode ? '' : '!bottom-[3em] btn-fixed-bottom'
              } btn-contained-pink font-normal`}
            >
              {isCampaignMode ? t('next') : tc('returnHome')}
            </ContainedButton>
          </div> */}
        </div>
      </PrimaryLayout>
    </BottomNavigationLayout>
  )
}

export default PaymentResponse
