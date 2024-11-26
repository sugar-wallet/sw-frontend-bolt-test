import React, { useState } from 'react'

import { GoldCoinsImage } from 'assets/images'
import { ImageComponent } from 'components'
import { SUGAR_WALLET_NUMBER } from 'config'

import { RepublicDayTnC } from '../RepublicDayTnC'

const LimitedTimeBanner: React.FC = () => {
  const [isOpen, setOpen] = useState(false)
  return <></>
  return (
    <>
      <div className="flex-1 mt-2 max-h-[8rem]" onClick={() => setOpen(true)}>
        <div className="flex-col items-center">
          <div className="flex-1 justify-between min-h-[6rem]">
            <div className="w-[30%] p-2 flex items-center justify-center text-center bg-light-pink text-white rounded-lg rounded-tr-none rounded-br-none">
              <ImageComponent src={GoldCoinsImage} alt="gold" />
            </div>
            <div className="flex-col items-center justify-center p-4 text-center text-md text-pink w-[70%] rounded-lg rounded-tl-none rounded-bl-none border border-solid border-light-pink">
              Give a Missed call On {SUGAR_WALLET_NUMBER} and get a chance to
              Win Free Gold*
              <div className="w-full text-[0.5em] justify-between mt-2">
                <div>*Click to know more</div>
                <div>*Terms and conditions apply</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RepublicDayTnC isOpen={isOpen} setOpen={setOpen} />
    </>
  )
}

export { LimitedTimeBanner }
