import React from 'react'

import { SugarLogoWhiteImage } from 'assets/images'
import { ImageComponent } from 'components'

const WorldCupCampaign = () => {
  return (
    <div className="px-4 w-full flex-col mt-[40vh] items-center z-10">
      <div className="justify-center items-center mt-10 mb-2">
        <div className="w-full">
          <ImageComponent
            src={SugarLogoWhiteImage}
            alt="sugar logo white"
            style={{ width: '20vw' }}
          />
        </div>
      </div>
      <div className="text-3xl text-gold w-[80%] font-bold mt-[2vh] mb-[1vh] text-center justify-center">
        Who will win
      </div>

      <div className="justify-center text-xl mt-4 font-semibold font-octarine flex-wrap">
        Place your guess
      </div>

      <div className="text-md text-white mt-2 font-medium w-full justify-center">
        and double your money
      </div>
    </div>
  )
}

export { WorldCupCampaign }
