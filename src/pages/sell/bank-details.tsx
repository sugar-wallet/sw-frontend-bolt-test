import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'

import {
  BankDetails,
  BankDetailsIndia,
  LimitedTimeBanner,
  ShareBankDetails
} from 'components'
import { fetchUserProfile, navigationPaths } from 'config'
import { getSellGoldData, isGlobalUser } from 'helpers'
import { navigate } from 'helpers/navigation'
import { BottomNavigationLayout, PrimaryLayout } from 'layouts'

const BankDetailsPage = () => {
  const t = useTranslations('SellPage')
  const { data } = useQuery(fetchUserProfile())
  const { currency } = data || {}

  useEffect(() => {
    const sellGoldData = getSellGoldData()
    if (!sellGoldData) navigate(navigationPaths.sell, true)
  }, [])

  return (
    <BottomNavigationLayout>
      <PrimaryLayout title={t('sellGold')}>
        <div className="flex-col">
          <div className="max-h-[10rem]">
            <LimitedTimeBanner />
          </div>
          {currency === SupportedCurrencySymbols.INR ? (
            <BankDetailsIndia />
          ) : isGlobalUser ? (
            <ShareBankDetails />
          ) : (
            <BankDetails />
          )}
        </div>
      </PrimaryLayout>
    </BottomNavigationLayout>
  )
}

export default BankDetailsPage
