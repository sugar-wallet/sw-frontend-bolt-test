import React from 'react'

import { ContainedButton } from '@sw-npm-packages/components'
import { GiftWrapImage } from 'assets/images'
import { ImageComponent } from 'components'
import { CAMPAIGN_TYPE } from 'types'

interface IProps {
  onClose: () => void
  rewardType: CAMPAIGN_TYPE
}

const ReferralModal = ({ onClose, rewardType }: IProps) => {
  return (
    <div className="flex-col flex-1 justify-center items-center">
      <div className="text-2xxl text-pink font-semibold">Limited Offer</div>
      <div className="w-[40%] my-2">
        <ImageComponent src={GiftWrapImage} alt="Gift Wrap" />
      </div>
      <div className="text-lg font-semibold mt-4 text-center w-[80%] mb-2">
        Give friends a{' '}
        <span className="text-pink contents">
          {rewardType === CAMPAIGN_TYPE.EMPLOYER ? '₹101' : '₹25 - ₹10,000'}
        </span>{' '}
        Diwali gift
      </div>
      <div className="font-medium">Get ₹50 Gold for each friend</div>
      <div className="text-sm font-light my-4">
        You have 3 minutes to invite 3 friends!
      </div>
      <ContainedButton className="btn-contained-black w-full" onClick={onClose}>
        Start Offer
      </ContainedButton>
    </div>
  )
}

export { ReferralModal }
