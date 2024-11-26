import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'

import { PosthogEvents } from '@constants'
import { OutlinedButton } from '@sw-npm-packages/components'
import { StoreCampaign } from 'components'
import { navigationPaths } from 'config'
import { appendQueryParams } from 'helpers'
import { emitTrackEvent } from 'helpers/events'
import { navigate } from 'helpers/navigation'

const Store = () => {
  const ct = useTranslations('Common')

  useEffect(() => {
    emitTrackEvent(PosthogEvents.StoreLandingPageViewed)
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
    <div className="-mx-4 flex-col bg-black min-h-[100vh] w-screen text-white px-4 items-center">
      <StoreCampaign />
      <div className="mt-[8vh] justify-center w-[50%]">
        <OutlinedButton
          className="btn-outlined-white"
          onClick={navigateToOnboarding}
        >
          {ct('signUp')}
        </OutlinedButton>
      </div>
    </div>
  )
}

export default Store
