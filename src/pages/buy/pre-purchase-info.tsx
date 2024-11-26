import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ContainedButton } from '@sw-npm-packages/components'
import { getCountryCode } from '@sw-npm-packages/config'
import { Info, LimitedTimeBanner, PrePurchaseFAQ } from 'components'
import { fetchUserProfile } from 'config'
import { BottomNavigationLayout, PrimaryLayout } from 'layouts'
import { handleBuyGold } from 'store/actions/user-finance'
import { selectIsPaymentIntentProcessing } from 'store/selectors/payment'
import { HeaderVariant } from 'types'

const PrePurchaseInfo = () => {
  const t = useTranslations('BuyPage')
  const ct = useTranslations('Common')
  const isPaymentIntentProcessing = useSelector(selectIsPaymentIntentProcessing)
  const { data: userData } = useQuery(fetchUserProfile())
  const dispatch = useDispatch()
  const countryCode = getCountryCode()

  const { redirect } = userData || {}
  const isCampaignMode = Boolean(redirect)

  const onContinueClick = () => {
    dispatch(handleBuyGold())
  }

  // const seventhDecStart = dayjs('2023-12-07T00:00:00')
  // const userCreatedAt = dayjs(userData?.createdAt)

  return (
    <BottomNavigationLayout show={!isCampaignMode}>
      <PrimaryLayout headerVariant={HeaderVariant.SECONDARY} title="Buy Gold">
        <div className="flex-1 flex-col items-center">
          <div className="flex-col items-center pb-16">
            <div className="h-1 bg-semi-gray w-20 rounded-lg absolute top-14 z-10"></div>
            <h3 className="w-[90%] text-center">{t('beforeYouPurchase')}</h3>
            <LimitedTimeBanner />
            <PrePurchaseFAQ />
            {!['TR', 'NZ'].includes(countryCode) && (
              <>
                <div className="mt-8 w-full text-red flex-center">Notice</div>
                <Info className="mt-4 text-red">
                  {ct('minWaitingTimeForSell', {
                    day: 15
                  })}
                </Info>
              </>
            )}

            <ContainedButton
              onClick={onContinueClick}
              isLoading={isPaymentIntentProcessing}
              disabled={isPaymentIntentProcessing}
              className="btn-fixed-bottom btn-contained-black font-normal !bottom-[3.5em]"
            >
              {t('confirmPurchase')}
            </ContainedButton>
          </div>
        </div>
      </PrimaryLayout>
    </BottomNavigationLayout>
  )
}

export default PrePurchaseInfo
