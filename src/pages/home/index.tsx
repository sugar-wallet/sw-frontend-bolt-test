import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { PosthogEvents } from '@constants'
import {
  // CustomModal,
  // JourneyCampaignModal,
  JourneyComponent,
  LimitedTimeBanner
} from 'components'
import {
  ActionBanners,
  ActionButtons,
  DashboardHeader,
  GoldHoldingBanner,
  LivePrice,
  WelcomeUser
} from 'components/Dashboard'
import { fetchUserProfile, navigationPaths } from 'config'
import { emitTrackEvent } from 'helpers/events'
import { navigate } from 'helpers/navigation'
import { BottomNavigationLayout } from 'layouts'
import { handleUpdateUser } from 'store/actions/user'
import { handleAkahuUserTokenRegistration } from 'store/actions/user-finance'

const Home = () => {
  const dispatch = useDispatch()
  const { data } = useQuery(fetchUserProfile())
  const { redirect, redirectionPage } = data || {}
  const router = useRouter()
  const { retargetCode } = router.query
  useEffect(() => {
    emitTrackEvent(PosthogEvents.HomePageViewed)
  }, [])

  useEffect(() => {
    dispatch(handleAkahuUserTokenRegistration())
  }, [])

  useEffect(() => {
    if (redirect) {
      if (redirectionPage === 'SUBSCRIPTION') navigate(navigationPaths.invest)
      else navigate(navigationPaths.buy)
    }
  }, [redirect])

  useEffect(() => {
    if (retargetCode) {
      dispatch(
        handleUpdateUser({ retarget_code_used: retargetCode?.toString() })
      )
      navigate(navigationPaths.home, true)
    }
  }, [retargetCode])
  return (
    <BottomNavigationLayout>
      <div className="flex-1 flex-col">
        <div className="pb-24 flex-col">
          <DashboardHeader />
          <WelcomeUser />
          <GoldHoldingBanner />
          <JourneyComponent />
          <LivePrice />
          <ActionButtons />
          <div className="mt-2">
            <LimitedTimeBanner />
          </div>
          <ActionBanners />
        </div>
      </div>
    </BottomNavigationLayout>
  )
}

export default Home
