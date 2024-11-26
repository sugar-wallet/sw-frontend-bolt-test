import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React from 'react'

import { ContainedButton } from '@sw-npm-packages/components'
import { EmployerWelcome } from 'components'
import { fetchUserProfile, navigationPaths } from 'config'
import { navigate } from 'helpers/navigation'

const EmployerWelcomeComponent = () => {
  const t = useTranslations('CampaignPage')
  const { data } = useQuery(fetchUserProfile())
  const { redirectionPage } = data || {}
  const navigateToTransaction = () => {
    if (redirectionPage === 'SUBSCRIPTION') {
      navigate(navigationPaths.invest)
    } else {
      navigate(navigationPaths.buy)
    }
  }

  return (
    <div className="-mx-4 flex-col bg-black min-h-[100vh] w-screen text-white px-4">
      <EmployerWelcome />
      <div className="mt-8">
        <ContainedButton
          className="btn-contained-pink"
          onClick={navigateToTransaction}
        >
          {t('claimNow')}
        </ContainedButton>
      </div>
    </div>
  )
}

export default EmployerWelcomeComponent
