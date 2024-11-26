import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

import { ContainedButton, SubTitle, Title } from '@sw-npm-packages/components'
import { ReferralCard, ReferralTimer } from 'components'
import { REFER_CAMPAIGN, navigationPaths } from 'config'
import { getCurrencyByTz } from 'helpers'
import { navigate } from 'helpers/navigation'
import { PrimaryLayout } from 'layouts'
import { CAMPAIGN_TYPE } from 'types'

const config = REFER_CAMPAIGN[getCurrencyByTz() as string] || {
  referrerAmount: 0,
  refereeAmount: 0,
  maxLimit: 0
}

const ReferFromCampaign = () => {
  const t = useTranslations('ReferCampaignPage')
  const [isCopied, setCopied] = useState(false)
  const [isShared, setShared] = useState(false)

  const router = useRouter()
  const { rewardType } = router.query

  const navigateToHome = () => {
    navigate(`${navigationPaths.home}?campaignMode=true`, true)
  }

  // write a null function onTimerStop
  const onTimerStop = () => {
    // do nothing
  }

  return (
    <div>
      <PrimaryLayout title="Limited Offer">
        <div className="flex-col w-full items-center">
          {/* <ReferralLeaderboard /> */}
          {/* {countryCode.toUpperCase() === 'IN' && (
            <>
              <ReferralTimer onTimerStop={onTimerStop} />
              <Title className="text-2xxl font-medium text-center justify-center w-[80%]">
                Win Gold Worth <span className="text-gold">₹101</span>
              </Title>
              <div className="flex-col mt-4 mb-20 w-full">
                <ReferralCardFOMO
                  isCopied={isCopied}
                  setShared={setShared}
                  setCopied={setCopied}
                />
              </div>
              <div className="mt-10 w-full">
                <ContainedButton
                  disabled={!isCopied || !isShared}
                  className="w-full btn-contained-pink"
                  onClick={navigateToHome}
                >
                  {t('finish')}
                </ContainedButton>
              </div>
            </>
          )} */}

          <ReferralTimer onTimerStop={onTimerStop} />
          <Title className="text-2xxl font-medium text-center justify-center w-[80%]">
            {t.rich('heading', {
              amount:
                rewardType === CAMPAIGN_TYPE.EMPLOYER
                  ? config.referrerAmount
                  : '',
              limit: config.maxLimit,
              span: (content) => (
                <span className="text-pink contents">{content}</span>
              )
            })}
          </Title>
          <SubTitle className="my-4">
            {t.rich('message', {
              amount: config.refereeAmount,
              span: (content) => (
                <span className="font-semibold">{content}</span>
              )
            })}
          </SubTitle>
          <SubTitle className="my-2 w-[80%] text-center">
            {t.rich('sendInvite', {
              limit: config.maxLimit
            })}
          </SubTitle>
          <div className="flex-col mt-4 w-full">
            <ReferralCard
              isCopied={isCopied}
              setShared={setShared}
              setCopied={setCopied}
            />
          </div>
          <div className="mt-10 w-full">
            <ContainedButton
              disabled={!isCopied || !isShared}
              className="w-full btn-contained-pink"
              onClick={navigateToHome}
            >
              {t('finish')}
            </ContainedButton>
          </div>
          <div className="text-center text-xs mt-2 text-pink">
            This button will activate after you share this with friends - using
            the share and copy button above
          </div>
        </div>
      </PrimaryLayout>
    </div>
  )
}

export default ReferFromCampaign
