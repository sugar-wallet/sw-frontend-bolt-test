import React from 'react'

import { JourneyProgress } from '..'
import { JourneyTitle } from '../JourneyTitle'

const JourneyComponent = () => {
  return (
    <>
      <div className="mt-6 all-sides-shadow p-4 rounded-lg flex-col">
        <JourneyTitle />
        <JourneyProgress />
      </div>
      {/* <CustomModal open={isOpen} onClose={() => setOpen(false)}>
        <div className={`w-full flex-col`}>
          <JourneyInfo />
          <div className="w-full flex-center mt-6">
            <ContainedButton
              className="btn-contained-black w-[50%]"
              onClick={() => setOpen(false)}
            >
              Got It!
            </ContainedButton>
          </div>
        </div>
      </CustomModal> */}
    </>
  )
}

export { JourneyComponent }
