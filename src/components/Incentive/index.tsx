import React from 'react'

import {
  ContainedButton,
  OutlinedButton,
  Title
} from '@sw-npm-packages/components'
import { Iphone15ProImage } from 'assets/images'
import { ImageComponent } from 'components'

const Incentive = ({
  onDoubleInvestment,
  onContinueInvestment
}: {
  onDoubleInvestment: () => void
  onContinueInvestment: () => void
}) => {
  return (
    <div className="flex-col items-center">
      <ImageComponent
        src={Iphone15ProImage}
        alt="IPHONE"
        className="rounded-lg mt-2"
      />
      <div className="mt-4 flex-center">
        <Title className="text-xxl w-[80%] text-center">
          2 lucky customers will win{' '}
          <span className="text-gold">iPhone 15 Pro</span>
        </Title>
      </div>
      <div className="flex-col my-10 w-full">
        <ContainedButton
          onClick={onDoubleInvestment}
          className="btn-contained-pink"
        >
          Buy ₹200 & Win iPhone
        </ContainedButton>

        <OutlinedButton
          onClick={onContinueInvestment}
          className="btn-outlined-pink mt-4"
        >
          Only Buy ₹100
        </OutlinedButton>
      </div>
    </div>
  )
}

export { Incentive }
