import React from 'react'

import { ContainedButton, OutlinedButton } from '@sw-npm-packages/components'
import { JourneyProgress } from 'components'

interface IProps {
  onContinue: () => void
  onClose: () => void
}

const SellConfirmModal = ({ onContinue, onClose }: IProps) => {
  return (
    <div className="flex-col justify-center items-center">
      <div className="text-lg text-pink font-semibold">
        Warning! You’ll lose progress
      </div>
      <div className="text-sm text-center mt-2">
        You’ll lose all progress and your voucher to redeem physical gold for
        half a gram!
      </div>
      <div className="my-8 w-full">
        <JourneyProgress />
      </div>
      <ContainedButton className="btn-contained-black w-full" onClick={onClose}>
        No, Go Back!
      </ContainedButton>
      <OutlinedButton
        className="w-full btn-outlined-black mt-2"
        onClick={onContinue}
      >
        Confirm Sell Gold
      </OutlinedButton>
    </div>
  )
}

export { SellConfirmModal }
