import React from 'react'

import { JourneyProgress } from '..'

const JourneyProgressModal = () => {
  return (
    <>
      <div className="text-lg font-semibold text-center">
        Journey to Half a Gram
      </div>
      <div className="text-sm mt-4 text-center">
        Reach half a gram of transactions and redeem a voucher for physical
        gold!
      </div>
      <div className="w-full mt-8">
        <JourneyProgress />
      </div>
    </>
  )
}

export default JourneyProgressModal
