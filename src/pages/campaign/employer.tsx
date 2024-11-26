import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'

import { PosthogEvents } from '@constants'
import { ContainedButton } from '@sw-npm-packages/components'
import { EmployerCampaign } from 'components'
import { navigationPaths } from 'config'
import { appendQueryParams } from 'helpers'
import { emitTrackEvent } from 'helpers/events'
import { navigate, openTab } from 'helpers/navigation'

const Employer = () => {
  const t = useTranslations('CampaignPage')
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
    <div className="-mx-4 flex-col bg-[#D85A58] min-h-[100vh] w-screen text-white px-4 items-center">
      <EmployerCampaign />
      <div className="mt-[4vh] flex-col items-center w-full">
        <ContainedButton
          className="btn-contained-black w-[50%]"
          onClick={navigateToOnboarding}
        >
          {t.rich('claimGold', {
            span: (content) => (
              <span className="text-primary-yellow ml-1">{content}</span>
            )
          })}
        </ContainedButton>
        <div
          className="mt-[4vh]"
          onClick={() => openTab('https://sugarwallet.com/diwali')}
        >
          {t('clickForTnC')}
        </div>
      </div>
    </div>
  )
}

export default Employer
