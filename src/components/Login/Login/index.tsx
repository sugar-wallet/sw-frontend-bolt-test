import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PosthogEvents } from '@constants'
import { ContainedButton, PhoneNumberInput } from '@sw-npm-packages/components'
import { REQUEST_RESPONSE_STATUS } from '@sw-npm-packages/constants'
import { LOGIN_METHODS } from '@sw-npm-packages/types/login'
import { defaultCountryCode } from 'config'
import { emitTrackEvent } from 'helpers/events'
import { handleSendOtp } from 'store/actions/auth'
import {
  selectIsPhoneNumberValid,
  selectLoginMethod,
  selectSendOTPStatus
} from 'store/selectors/auth'

const LoginComponent = () => {
  const isPhoneNumberValid = useSelector(selectIsPhoneNumberValid)
  const sendOTPStatus = useSelector(selectSendOTPStatus)
  const loginMethod = useSelector(selectLoginMethod)
  const [country, setCountry] = useState(defaultCountryCode)
  const t = useTranslations('PhoneInputPage')
  const tc = useTranslations('LandingPage')
  const dispatch = useDispatch()

  const router = useRouter()
  const { campaignCode, referralCode, retargetCode } = router.query

  useEffect(() => {
    emitTrackEvent(PosthogEvents.PhoneNumberInputPageViewed)
  }, [])

  const onPhoneInputContinueClick = (type: LOGIN_METHODS) => {
    dispatch(
      handleSendOtp({
        type,
        // isOtpless: true,
        campaignCode: campaignCode?.toString(),
        referralCode: referralCode?.toString(),
        retargetCode: retargetCode?.toString()
      })
    )
  }

  const isSMS = loginMethod === LOGIN_METHODS.SMS
  // const isWhatsapp = loginMethod === LOGIN_METHODS.WHATSAPP

  const isLoading = sendOTPStatus.status === REQUEST_RESPONSE_STATUS.PROCESSING
  const isDisabled = !isPhoneNumberValid || isLoading

  return (
    <div className="flex-1 flex-col justify-between pb-4">
      <h3 className="text-black flex self-center absolute mt-10 font-medium">
        {t('enterPhone')}
      </h3>
      <div className="flex-1 justify-center items-center">
        <PhoneNumberInput country={country} setCountry={setCountry} />
      </div>
      <div className="flex-col">
        {/* <ContainedButton
          onClick={() => onPhoneInputContinueClick(LOGIN_METHODS.SMS)}
          disabled={isDisabled}
          className={'btn-contained-pink'}
          isLoading={isSMS && isLoading}
        >
          {t('textSmsVerification')}
        </ContainedButton> */}
        <ContainedButton
          onClick={() => onPhoneInputContinueClick(LOGIN_METHODS.SMS)}
          disabled={isDisabled}
          className={'btn-contained-wa-green mt-2'}
          isLoading={isSMS && isLoading}
        >
          {tc('login')}
          {/* {t('whatsappVerification')} */}
        </ContainedButton>
      </div>
    </div>
  )
}

export { LoginComponent }
