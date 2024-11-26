import React, { useState } from 'react'

import { ContainedButton } from '@sw-npm-packages/components'
import { GoldCoinsImage } from 'assets/images'
import { CustomModal, ImageComponent } from 'components'
import { SUGAR_WALLET_NUMBER } from 'config'

import { RepublicDayTnC } from '../RepublicDayTnC'

const RepublicDayBanner: React.FC = () => {
  const [isOpen, setOpen] = useState(true)
  const [isTnCOpen, setTnCOpen] = useState(false)
  return (
    <>
      <CustomModal
        open={isOpen}
        onClose={() => setOpen(false)}
        customStyle={{ backgroundColor: 'var(--black)' }}
        showCloseIcon
      >
        <div className="w-full flex-col flex-center">
          <div className="text-white text-2xl text-bold mt-2 text-center">
            Republic Day Offer
          </div>
          <ImageComponent
            src={GoldCoinsImage}
            className="w-[50%] my-4"
            alt="gold"
          />
          <div className="text-gold text-xl text-center">
            Give a Missed call on {SUGAR_WALLET_NUMBER} and get a chance to Win
            Free Gold*
          </div>
          <div className="justify-between w-full gap-4 mt-6">
            <ContainedButton
              className="btn-contained-gold w-full"
              onClick={() => {
                setOpen(false)
                setTnCOpen(true)
              }}
            >
              Know More
            </ContainedButton>
          </div>

          <div className="text-[0.5em] mt-4 text-white">
            *Terms and conditions apply
          </div>
        </div>
      </CustomModal>
      <RepublicDayTnC isOpen={isTnCOpen} setOpen={setTnCOpen} />
    </>
  )
}

export { RepublicDayBanner }
