import React, { useEffect, useState } from 'react'

import { ContainedButton } from '@sw-npm-packages/components'
import { DiwaliLightsImage, GoldMatkaImage, LogoImage } from 'assets/images'
import { ImageComponent } from 'components'
import { navigationPaths } from 'config'
import { appendQueryParams, openExternalWhatsapp } from 'helpers'
import { navigate } from 'helpers/navigation'
const GetDoubleLanding = () => {
  const [timer, setTimer] = useState('')

  const navigateToLogin = () => {
    navigate(
      appendQueryParams(navigationPaths.login, [
        'campaignCode',
        'referralCode',
        'retargetCode'
      ])
    )
  }

  const openWhatsApp = () => {
    openExternalWhatsapp()
  }

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = new Date()
      const targetTime = new Date(now)

      // Set target time to the next "10:00pm"
      targetTime.setHours(22, 0, 0, 0)

      // If the target time has already passed for today, set it for tomorrow
      if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1)
      }

      const timeDifference = Number(targetTime) - Number(now)
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      )
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)
      const remainingTime = `${hours > 0 ? `${hours} hours ` : ''}${
        minutes > 0 ? `${minutes} minutes ` : ''
      }${seconds < 10 ? '0' : ''}${seconds} seconds`

      setTimer(remainingTime)
    }

    calculateRemainingTime()

    // Update the timer every second
    const timerInterval = setInterval(calculateRemainingTime, 1000)

    // Clear the interval on component unmount
    return () => clearInterval(timerInterval)
  }, [])

  return (
    <div className="-mx-4 flex-col bg-[#D85A58] min-h-[100vh] w-screen text-white px-4 items-center">
      <div className="px-4 flex-col items-center">
        <ImageComponent
          src={DiwaliLightsImage}
          className="fixed -top-[10vh] -right-10"
          style={{ width: '200px', height: 'auto' }}
          alt="Lights"
        />
        <div className="justify-center items-center mt-10 mb-4">
          <div className="w-20">
            <LogoImage />
          </div>
        </div>
        <div className="text-4xl text-white w-[80%] font-semibold mt-[2vh] mb-[2vh] text-center justify-center">
          Double Gold Dhamaka
        </div>
        <div className="justify-center items-center h-[32vh] -my-[6vh]">
          <ImageComponent
            src={GoldMatkaImage}
            alt="Gold Bar"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </div>

        <div className="justify-center text-2xl mt-4 font-bold font-octarine flex-wrap">
          <div className="text-primary-yellow text-center min-w-fit">
            Buy gold today and we will double it.
          </div>
        </div>

        <div className="text-xl text-center text-white w-full justify-center">
          Offer valid for next{' '}
          <span className="contents text-primary-yellow">{timer}</span>. If you
          purchase for ₹10 we will give you gold of ₹20.
        </div>
        <div className="text-md  text-center mt-4 text-white w-full justify-center">
          *Free Gold capped to ₹50
        </div>
      </div>
      <div className="mt-[4vh] flex-col items-center w-full">
        <ContainedButton
          className="btn-contained-black w-[50%]"
          onClick={navigateToLogin}
        >
          Claim
          <span className="text-primary-yellow ml-1">Free Gold*</span>
        </ContainedButton>
        <ContainedButton
          className="btn-contained-black !text-wa-green w-[70%] mt-4"
          onClick={openWhatsApp}
        >
          Whatsapp Support
        </ContainedButton>
      </div>
    </div>
  )
}

export default GetDoubleLanding
