import React, { useState } from 'react'

import { ContainedButton } from '@sw-npm-packages/components'
import { GiftInfo } from 'components'
import { navigationPaths } from 'config'
import { navigate } from 'helpers/navigation'

import JourneyInfo from './__JourneyInfo'
import JourneyProgressModal from './__JourneyProgressModal'

const JourneyCampaignModal = ({ onClose }: { onClose: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const buttonLabels = ['Next', 'Learn More', 'Got It!']

  const handleChangeStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    } else {
      navigate(navigationPaths.home)
      onClose()
    }
  }

  return (
    <div
      className={`w-full flex-col ${currentStep === 2 ? '' : 'items-center'}`}
    >
      {currentStep === 0 ? (
        <GiftInfo />
      ) : currentStep === 1 ? (
        <JourneyProgressModal />
      ) : currentStep === 2 ? (
        <JourneyInfo />
      ) : null}

      <div className="w-full flex-center mt-6">
        <ContainedButton
          className="btn-contained-black w-[50%]"
          onClick={handleChangeStep}
        >
          {buttonLabels[currentStep]}
        </ContainedButton>
      </div>
    </div>
  )

  //   return (
  //     <div className="w-full flex-col items-center">
  //       <div className="text-lg font-semibold text-center">
  //         Journey to Half a Gram
  //       </div>
  //       <div className="text-sm mt-4 text-center">
  //         Reach half a gram of transactions and redeem a voucher for physical
  //         gold!
  //       </div>
  //       <div className="w-full mt-8">
  //         <JourneyProgress />
  //       </div>
  //       <div className="w-[50%] mt-4">
  //         <ContainedButton className="btn-contained-black">
  //           Learn More
  //         </ContainedButton>
  //       </div>
  //     </div>
  //   )

  //   return (
  //     <div className="w-full flex-col items-center">

  //       <div className="w-[50%] mt-6">
  //         <ContainedButton className="btn-contained-black">Next</ContainedButton>
  //       </div>
  //     </div>
  //   )
}

export { JourneyCampaignModal }
