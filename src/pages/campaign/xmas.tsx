import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'

import { PosthogEvents } from '@constants'
import { OutlinedButton } from '@sw-npm-packages/components'
import { XmasCampaignImage } from 'assets/images'
import { ImageComponent, XMasCampaign } from 'components'
import { navigationPaths } from 'config'
import { appendQueryParams } from 'helpers'
import { emitTrackEvent } from 'helpers/events'
import { navigate } from 'helpers/navigation'

const XMasCampaignPage = () => {
  const t = useTranslations('ProfilePage')
  useEffect(() => {
    emitTrackEvent(PosthogEvents.EmployerLandingPageViewed)
  }, [])

  const navigateToOnboarding = () => {
    navigate(
      appendQueryParams(navigationPaths.onboarding, [
        'campaignCode',
        'referralCode',
        'retargetCode'
      ])
    )
  }
  return (
    <div className="-mx-4 flex-col bg-[#000] min-h-[100vh] w-screen text-white px-4 items-center">
      <ImageComponent
        src={XmasCampaignImage}
        alt="Xmas image"
        style={{ width: '100vw', height: 'auto', position: 'fixed', zIndex: 0 }}
      />
      <XMasCampaign />
      <div className="mt-[4vh] flex-col items-center w-full z-10">
        <OutlinedButton
          className="btn-outlined-white w-[50%]"
          onClick={navigateToOnboarding}
        >
          {t('continue')}
        </OutlinedButton>
      </div>
    </div>
  )
}

export default XMasCampaignPage
