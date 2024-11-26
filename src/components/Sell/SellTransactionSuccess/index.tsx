import { useQuery } from '@tanstack/react-query'
import Lottie from 'lottie-react'
import { useTranslations } from 'next-intl'
import React from 'react'

import { SupportedCurrencySymbols } from '@sw-npm-packages/constants'
import { ConfettiAnimation } from 'assets/lottiefiles'
import { fetchUserBalance, navigationPaths } from 'config'
import { computeGoldBalance } from 'helpers'
import { navigate } from 'helpers/navigation'
import { SecondaryLayout } from 'layouts'

const SellTransactionSuccess = () => {
  const tc = useTranslations('Common')
  const t = useTranslations('SellTransactionSuccessPage')

  const { data: balance } = useQuery(fetchUserBalance())
  const { unit, weightUnits, currency } = balance || {}

  const goToHome = () => {
    navigate(navigationPaths.home)
  }
  return (
    <SecondaryLayout
      title={t('title')}
      subTitle={
        <div className="flex-col justify-center items-center">
          <div>{t('descTitle')}</div>
          {currency === SupportedCurrencySymbols.INR ? (
            <div className="mt-4">{t('descSubtitle')}</div>
          ) : null}
        </div>
      }
      footer={
        unit && weightUnits ? (
          <div className="bg-azure font-medium p-4 rounded-md text-center justify-center">
            {t('footerTitle', {
              unit: computeGoldBalance(unit, weightUnits)
            })}
          </div>
        ) : (
          <></>
        )
      }
      footerPrimaryBtnLabel={tc('returnHome')}
      footerPrimaryBtnOnClick={goToHome}
    >
      <div className="flex-col justify-center items-center px-10 max-xs:px-20 max-xs:mt-4 mt-4">
        <div className="h-[200px] justify-center">
          <Lottie animationData={ConfettiAnimation} />
        </div>
      </div>
    </SecondaryLayout>
  )
}

export { SellTransactionSuccess }
