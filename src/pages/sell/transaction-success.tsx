import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'

import { PosthogEvents } from '@constants'
import { SellTransactionSuccess } from 'components'
import { navigationPaths } from 'config'
import {
  getSellGoldData,
  removeCreateSecurityPin,
  removeSellGoldData
} from 'helpers'
import { emitTrackEvent } from 'helpers/events'
import { navigate } from 'helpers/navigation'
import { BottomNavigationLayout, PrimaryLayout } from 'layouts'

const SellPaymentSuccessPage = () => {
  const t = useTranslations('SellPage')

  useEffect(() => {
    const sellGoldData = getSellGoldData()
    if (!sellGoldData) navigate(navigationPaths.sell, true)
    emitTrackEvent(PosthogEvents.SellSuccessPageViewed)
    return () => {
      removeSellGoldData()
      removeCreateSecurityPin()
    }
  }, [])

  return (
    <BottomNavigationLayout>
      <PrimaryLayout title={t('sellGold')}>
        <SellTransactionSuccess />
      </PrimaryLayout>
    </BottomNavigationLayout>
  )
}

export default SellPaymentSuccessPage
