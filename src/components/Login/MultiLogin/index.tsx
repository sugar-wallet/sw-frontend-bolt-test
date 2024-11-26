import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PosthogEvents } from '@constants'
import {
  ContainedButton,
  PhoneNumberInput,
  TextInput
} from '@sw-npm-packages/components'
import { REQUEST_RESPONSE_STATUS } from '@sw-npm-packages/constants'
import { LOGIN_METHODS } from '@sw-npm-packages/types/login'
import { EMAIL_REGEX, defaultCountryCode } from 'config'
import { emitTrackEvent } from 'helpers/events'
import { handleSendOtp, updateAuthStatus } from 'store/actions/auth'
import { AUTH_STATE_KEYS } from 'store/constants/auth'
import {
  selectEmail,
  selectEmailAlreadyExists,
  selectIsPhoneNumberValid,
  selectLoginMethod,
  selectSendOTPStatus
} from 'store/selectors/auth'

const MultiLoginComponent = () => {
  const isPhoneNumberValid = useSelector(selectIsPhoneNumberValid)
  const [isEmailValid, setEmailValid] = useState(false)
  const email = useSelector(selectEmail)
  const existingUser = useSelector(selectEmailAlreadyExists)
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

  useEffect(() => {
    if (email) {
      setEmailValid(EMAIL_REGEX.test(email))
    }
  }, [])

  const switchLoginMethod = (method: LOGIN_METHODS) => {
    dispatch(updateAuthStatus(AUTH_STATE_KEYS.SET_LOGIN_METHOD, method))
  }

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValid(EMAIL_REGEX.test(e.target.value))
    dispatch(
      updateAuthStatus(AUTH_STATE_KEYS.EMAIL, e.target.value?.toLowerCase())
    )
  }

  const onSubmit = (type: LOGIN_METHODS) => {
    dispatch(
      handleSendOtp({
        type,
        // isOtpless: true,
        campaignCode: campaignCode?.toString(),
        referralCode: referralCode?.toString(),
        retargetCode: retargetCode?.toString(),
        dryRun: loginMethod === LOGIN_METHODS.EMAIL
      })
    )
  }

  const isSMS = loginMethod === LOGIN_METHODS.SMS
  // const isWhatsapp = loginMethod === LOGIN_METHODS.WHATSAPP

  const isLoading = sendOTPStatus.status === REQUEST_RESPONSE_STATUS.PROCESSING
  const isDisabled = (isSMS ? !isPhoneNumberValid : !isEmailValid) || isLoading

  console.log('isSMS',isSMS);
  

  if (isSMS) {
    return (
      <div className="flex-1 flex-col justify-between pb-4">
        <h3 className="text-black flex self-center absolute mt-10 font-medium">
          {t('enterPhone')}
        </h3>
        <div className="flex-1 justify-center items-center">
          <PhoneNumberInput country={country} setCountry={setCountry} />
        </div>
        <div className="flex-col">
          <ContainedButton
            onClick={() => onSubmit(LOGIN_METHODS.SMS)}
            disabled={isDisabled}
            className={'btn-contained-wa-green mt-2'}
            isLoading={isSMS && isLoading}
          >
            {existingUser ? tc('login') : tc('signUp')}
            {/* {t('whatsappVerification')} */}
          </ContainedButton>
          {existingUser && (
            <ContainedButton
              disabled={isLoading}
              onClick={() => switchLoginMethod(LOGIN_METHODS.EMAIL)}
              className={'btn-contained-pink mt-2'}
            >
              {t('switchToEmail')}
            </ContainedButton>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex-col justify-between pb-4">
      <h3 className="text-black flex self-center absolute mt-10 font-medium">
        {t('enterEmail')}
      </h3>
      <div className="flex-1 justify-center items-center">
        <TextInput
          value={email}
          onChange={onEmailChange}
          placeholder="eg: johndoe@gmail.com"
        />
      </div>
      <div className="flex-col">
        <ContainedButton
          onClick={() => onSubmit(LOGIN_METHODS.EMAIL)}
          disabled={isDisabled}
          className={'btn-contained-wa-green mt-2'}
          isLoading={isSMS && isLoading}
        >
          {tc('login')}
          {/* {t('whatsappVerification')} */}
        </ContainedButton>
        <ContainedButton
          disabled={isLoading}
          onClick={() => switchLoginMethod(LOGIN_METHODS.SMS)}
          className={'btn-contained-pink mt-2'}
        >
          {t('switchToPhoneNumber')}
        </ContainedButton>
      </div>
    </div>
  )
}

export { MultiLoginComponent }
