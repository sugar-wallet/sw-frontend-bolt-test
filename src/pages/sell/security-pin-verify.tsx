import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'

import { PosthogEvents } from '@constants'
import { SecurityOTPComponent } from 'components'
import { navigationPaths } from 'config'
import { getSellGoldData } from 'helpers'
import { emitTrackEvent } from 'helpers/events'
import { navigate } from 'helpers/navigation'
import { BottomNavigationLayout, PrimaryLayout } from 'layouts'

const SellSecurityPinVerifyPage = () => {
  const t = useTranslations('SellPage')
  useEffect(() => {
    emitTrackEvent(PosthogEvents.CreateSecurityPinOtpPageViewed)
    const sellGoldData = getSellGoldData()
    if (!sellGoldData) navigate(navigationPaths.sell, true)
  }, [])

  return (
    <BottomNavigationLayout>
      <PrimaryLayout title={t('sellGold')}>
        <SecurityOTPComponent />
      </PrimaryLayout>
    </BottomNavigationLayout>
  )
}

export default SellSecurityPinVerifyPage
