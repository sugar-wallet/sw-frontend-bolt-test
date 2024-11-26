import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import React from 'react'

import { getCountryCode } from '@sw-npm-packages/config'
import { DoubleGoldBarImage, LogoImage } from 'assets/images'
import { ImageComponent } from 'components'
import { REWARD_AMOUNT } from 'config'
import { CAMPAIGN_TYPE } from 'types'

const ReferralCampaign = () => {
  const t = useTranslations('CampaignPage')
  const router = useRouter()
  const { rewardType } = router.query
  const referredUserCampaignType = rewardType || CAMPAIGN_TYPE.REFERRAL

  const rewardAmount = REWARD_AMOUNT[getCountryCode()]

  if (!rewardAmount) return null

  return (
    <div className="px-4 flex-col">
      <div className="justify-center items-center my-10">
        <div className="w-20">
          <LogoImage />
        </div>
      </div>
      <div className="text-2xxl text-white font-semibold mt-[6vh] mb-[4vh] w-full justify-center">
        {t('youAreInvitedToJoin')}
      </div>
      <div className="w-full justify-center items-center">
        <ImageComponent
          src={DoubleGoldBarImage}
          alt="Gold Bar"
          style={{ width: 'calc(30% + 25vh)' }}
        />
      </div>

      <div className="justify-center text-3xxl mt-4 font-bold font-octarine flex-wrap">
        <div className="gold-text min-w-fit">{t('24kGold')}</div>
        <div className="ml-3 min-w-fit">{t('gift')}</div>
      </div>

      <div className="text-2xxl text-white w-full justify-center">
        {referredUserCampaignType === CAMPAIGN_TYPE.STORE
          ? t('staticAmountGoldForYou')
          : t('amountGoldForYou', {
              amount: rewardAmount
            })}
      </div>
    </div>
  )
}

export { ReferralCampaign }
