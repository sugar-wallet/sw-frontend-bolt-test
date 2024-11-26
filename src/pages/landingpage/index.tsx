import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { FullScreenLoader } from '@sw-npm-packages/components'
import { fetchLandingPage } from 'store/actions/user'

const Landing = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { referralCode = '', campaignCode = '' } = router.query
  useEffect(() => {
    if (referralCode || campaignCode) {
      dispatch(
        fetchLandingPage({
          referral_code: referralCode ? referralCode.toString() : undefined,
          campaign_code: campaignCode ? campaignCode.toString() : undefined
        })
      )
    }
  }, [referralCode, campaignCode])

  return <FullScreenLoader />
}

export default Landing
