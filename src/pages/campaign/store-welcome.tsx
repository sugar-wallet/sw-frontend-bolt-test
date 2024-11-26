import { useTranslations } from 'next-intl'
import React from 'react'

import { ContainedButton } from '@sw-npm-packages/components'
import { StoreWelcome } from 'components'
import { navigationPaths } from 'config'
import { navigate } from 'helpers/navigation'

const StoreWelcomeComponent = () => {
  const t = useTranslations('CampaignPage')

  const navigateToPlay = () => navigate(navigationPaths.campaignStorePlay)

  return (
    <div className="-mx-4 flex-col bg-black min-h-[100vh] w-screen text-white px-4">
      <StoreWelcome />
      <div className="mt-[10vh]">
        <ContainedButton
          className="btn-contained-pink"
          onClick={navigateToPlay}
        >
          {t('storeWelcomePlayNow')}
        </ContainedButton>
      </div>
    </div>
  )
}

export default StoreWelcomeComponent
