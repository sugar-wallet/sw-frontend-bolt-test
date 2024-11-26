import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'

import { PosthogEvents } from '@constants'
import { CreateSecurityPin } from 'components'
import { navigationPaths } from 'config'
import { getSellGoldData } from 'helpers'
import { emitTrackEvent } from 'helpers/events'
import { navigate } from 'helpers/navigation'
import { BottomNavigationLayout, PrimaryLayout } from 'layouts'

const SellSecurityPinPage = () => {
  const t = useTranslations('SellPage')

  useEffect(() => {
    emitTrackEvent(PosthogEvents.CreateSecurityPinPageViewed)
    const sellGoldData = getSellGoldData()
    if (!sellGoldData) navigate(navigationPaths.sell, true)
  }, [])

  return (
    <BottomNavigationLayout>
      <PrimaryLayout title={t('sellGold')}>
        <CreateSecurityPin />
      </PrimaryLayout>
    </BottomNavigationLayout>
  )
}

export default SellSecurityPinPage
