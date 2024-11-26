import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  ContainedButton,
  OutlinedButton,
  SubTitle,
  Title
} from '@sw-npm-packages/components'
import {
  PAYMENT_FREQUENCY,
  PAYMENT_FREQUENCY_LABEL_SHORT,
  REQUEST_RESPONSE_STATUS
} from '@sw-npm-packages/constants'
import { IUserGoldSubscription } from '@sw-npm-packages/types'
import { NextPaymentDetails } from 'components/Invest'
import { handleCancelAutoInvestGold } from 'store/actions/user-finance'
import { selectCancelInvestGoldStatus } from 'store/selectors/user-finance'

import { AutoInvestCancelled } from '../AutoInvestCancelled'

interface ICancelAutoInvest {
  subscriptionData: IUserGoldSubscription
  onChangeInvestmentMode: () => void
}

const CancelAutoInvest: React.FC<ICancelAutoInvest> = ({
  subscriptionData,
  onChangeInvestmentMode
}) => {
  const t = useTranslations('AutoInvestPage')

  const [isCancelConfirmMode, setIsCancelConfirmMode] = useState(false)
  // const [isModalOpen, setModalOpen] = useState(false)

  const cancelInvestGoldStatus = useSelector(selectCancelInvestGoldStatus)
  // const { data: userData } = useQuery(fetchUserProfile())
  // const { showWarning = true } = userData || {}

  const dispatch = useDispatch()

  const { frequency, amountWithCurrency, nextPaymentDate } = subscriptionData
  const { status } = cancelInvestGoldStatus

  const onChangeInvestmentClick = () => {
    onChangeInvestmentMode()
  }

  const onCancelInvestmentClick = () => {
    setIsCancelConfirmMode(true)
  }

  const onGoBack = () => {
    setIsCancelConfirmMode(false)
  }

  // const onConfirmCancellationClick = () => {
  //   dispatch(handleCancelAutoInvestGold())
  // }

  const onClickCancel = () => {
    // if (showWarning) {
    //   setModalOpen(true)
    // } else {
    dispatch(handleCancelAutoInvestGold())
    //   setModalOpen(false)
    // }
  }

  const isCancelInProgress = status === REQUEST_RESPONSE_STATUS.PROCESSING
  const isCancelSuccess = status === REQUEST_RESPONSE_STATUS.SUCCESS

  return (
    <div className="flex-1 flex-col pt-4">
      {isCancelSuccess ? (
        <AutoInvestCancelled />
      ) : (
        <div className="flex-1 flex-col">
          {isCancelConfirmMode ? (
            <h3 className="text-center">{t('areYouSureCancel')}</h3>
          ) : (
            <div className="h-20"></div>
          )}

          <Title className="text-center text-base mt-8">
            {t('currentlyYouAreInvesting')}
          </Title>
          <SubTitle className="text-center text-2xl mt-2">
            {t.rich('autoInvestFrequency', {
              // todo fix per and every or change styling
              amount: amountWithCurrency,
              frequency:
                frequency === PAYMENT_FREQUENCY.DAILY ? t('per') : t('every'),
              frequencyLabel: t(
                PAYMENT_FREQUENCY_LABEL_SHORT[frequency as string]
              ),
              span: (content) => <span className="text-pink">{content}</span>
            })}
          </SubTitle>

          {/* {isGlobalApp && showWarning ? (
            <>
              <SubTitle className="text-red-2 text-lg font-semibold mt-[5vh] text-center w-full mb-[5vh]">
                You will lose your progress to redeem half a gram physical gold
              </SubTitle>
              {isCancelConfirmMode && <JourneyProgress />}
            </>
          ) : null} */}

          <div className="flex-1 flex-col justify-end mb-[3.5em]">
            {isCancelConfirmMode ? (
              <>
                <ContainedButton
                  onClick={onClickCancel}
                  disabled={isCancelInProgress}
                  isLoading={isCancelInProgress}
                  className={`flex-initial btn-contained-pink`}
                >
                  {t('confirmCancel')}
                </ContainedButton>
                <OutlinedButton
                  primaryColor="pink"
                  onClick={onGoBack}
                  className="my-2 border-pink flex-initial"
                >
                  {t('noGoBack')}
                </OutlinedButton>
              </>
            ) : (
              <>
                <NextPaymentDetails nextPaymentDate={nextPaymentDate} />
                <ContainedButton
                  onClick={onChangeInvestmentClick}
                  className={`flex-initial btn-contained-pink`}
                >
                  {t('changeInvestment')}
                </ContainedButton>
                <OutlinedButton
                  primaryColor="pink"
                  onClick={onCancelInvestmentClick}
                  className="my-2 border-pink flex-initial"
                >
                  {t('cancelInvestment')}
                </OutlinedButton>
              </>
            )}
          </div>
        </div>
      )}
      {/* <CustomModal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <SellConfirmModal
          onContinue={onConfirmCancellationClick}
          onClose={() => setModalOpen(false)}
        />
      </CustomModal> */}
    </div>
  )
}

export { CancelAutoInvest }
