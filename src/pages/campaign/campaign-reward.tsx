import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React from 'react'

import { ContainedButton } from '@sw-npm-packages/components'
import { GoldCoinsImage } from 'assets/images'
import { ImageComponent } from 'components'
import { fetchUserProfile, navigationPaths } from 'config'
import { formatMoney } from 'helpers'
import { navigate } from 'helpers/navigation'

const CampaignReward = () => {
  const t = useTranslations('AutoInvestPage')
  const tc = useTranslations('CampaignPage')
  const { data } = useQuery(fetchUserProfile())
  const { rewardValue, rewardType } = data || {}

  const navigateToReferral = () => {
    navigate(
      `${
        navigationPaths.referCampaign
      }?rewardType=${rewardType?.toLowerCase()}`,
      true
    )
  }
  return (
    <div className="flex-col">
      <div className="px-4 flex-col">
        <div className="text-pink w-full mt-[10vh] justify-center font-semibold text-center text-2xxxl">
          {tc('amountGoldCredited', {
            amount: formatMoney(Number(rewardValue))
          })}
        </div>
        <div className="my-8 text-xl w-full text-center justify-center">
          {tc('youWillSeeYourFreeGold')}
        </div>
        <div className="w-full justify-center items-center">
          <ImageComponent
            src={GoldCoinsImage}
            alt="Gold Bar"
            style={{ width: '80%' }}
          />
        </div>
        <div className="mt-8 text-xl w-full justify-center text-center">
          {tc('moreFreeGoldIsComing')}{' '}
        </div>
      </div>
      <div className="w-full mt-[14vh]">
        <ContainedButton
          className="btn-contained-black"
          onClick={navigateToReferral}
        >
          {t('next')}
        </ContainedButton>
      </div>
    </div>
  )
}

export default CampaignReward
