import React from 'react'

import { ContainedButton, SubTitle } from '@sw-npm-packages/components'
import { navigationPaths } from 'config'
import { navigate } from 'helpers/navigation'

const ReferralTimeupModal = () => {
  const navigateToHome = () => {
    navigate(`${navigationPaths.home}?campaignMode=true`)
  }
  return (
    <div className="flex-col flex-1 justify-center items-center">
      <div className="text-2xxl text-pink font-semibold">Time’s Up!</div>
      <SubTitle className="mt-6 text-center">
        Sorry, you ran out of time.
      </SubTitle>
      <SubTitle className="mt-4 mb-6 text-center">
        You can still earn free gold through referrals found on the dashboard
      </SubTitle>
      <ContainedButton
        className="btn-contained-black w-full"
        onClick={navigateToHome}
      >
        Dashboard
      </ContainedButton>
    </div>
  )
}

export { ReferralTimeupModal }
