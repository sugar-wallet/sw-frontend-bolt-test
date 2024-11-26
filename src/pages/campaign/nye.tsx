import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'

import { PosthogEvents } from '@constants'
import { OutlinedButton } from '@sw-npm-packages/components'
import { NewYearCampaignImage } from 'assets/images'
import { ImageComponent, NYECampaign } from 'components'
import { navigationPaths } from 'config'
import { appendQueryParams } from 'helpers'
import { emitTrackEvent } from 'helpers/events'
import { navigate } from 'helpers/navigation'

const NYECampaignPage = () => {
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
    <div className="-mx-4 flex-col bg-[#520C07] min-h-[100vh] w-screen text-white px-4 items-center">
      <ImageComponent
        src={NewYearCampaignImage}
        alt="New Year image"
        style={{ width: '100vw', height: 'auto', position: 'fixed', zIndex: 0 }}
      />
      <NYECampaign />
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

export default NYECampaignPage
