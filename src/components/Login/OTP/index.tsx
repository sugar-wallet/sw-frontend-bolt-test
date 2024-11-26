import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import OtpInputComponent from 'react-otp-input'
import { formatPhoneNumberIntl } from 'react-phone-number-input'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { PosthogEvents } from '@constants'
import {
  ContainedButton,
  Input,
  OutlinedButton,
  SubTitle
} from '@sw-npm-packages/components'
import {
  REQUEST_RESPONSE_STATUS,
  errorConstants
} from '@sw-npm-packages/constants'
// import { autoReadSMS } from 'helpers'
import { LOGIN_METHODS } from '@sw-npm-packages/types/login'
import { emitTrackEvent } from 'helpers/events'
import {
  handleResendOtp,
  handleVerifyOtp,
  resetAuthStatus
} from 'store/actions/auth'
import {
  selectAuthOtpError,
  selectEmail,
  selectLoginMethod,
  selectPhoneNumber,
  selectResendOTPStatus,
  selectVerifyOTPStatus
} from 'store/selectors/auth'

const OTPComponent = () => {
  const phoneNumber = useSelector(selectPhoneNumber)
  const email = useSelector(selectEmail)
  const verifyOTPStatus = useSelector(selectVerifyOTPStatus)
  const loginMethod = useSelector(selectLoginMethod)
  const resendOTPStatus = useSelector(selectResendOTPStatus)
  const authOTPError = useSelector(selectAuthOtpError, shallowEqual)
  const [otp, setOtp] = useState('')
  const t = useTranslations('OtpVerificationPage')
  const [count, setCount] = useState(60)

  const dispatch = useDispatch()

  const isSMS = loginMethod === LOGIN_METHODS.SMS

  useEffect(() => {
    emitTrackEvent(PosthogEvents.OtpPageViewed)
    // autoReadSMS((_otp) => {
    //   setOtp(_otp)
    // })
  }, [])

  useEffect(() => {
    const timer = count > 0 && setInterval(() => setCount(count - 1), 1000)
    if (timer) {
      return () => clearInterval(timer)
    }
  }, [count])

  useEffect(() => {
    if (otp.length === 6) {
      handleOnOTPInputContinueClick()
    }
  }, [otp])

  const handleOnOTPInputContinueClick = () => {
    // const otp = otpRef.current?.getOTP()
    dispatch(handleVerifyOtp({ otp, isOtpless: false }))
  }

  const onChangePhoneClick = () => {
    emitTrackEvent(PosthogEvents.ChangePhoneClicked)
    dispatch(resetAuthStatus())
  }

  const onResendCodeClick = () => {
    emitTrackEvent(PosthogEvents.DidntReceivedOtpClicked)
    setCount(60)
    dispatch(handleResendOtp())
  }

  const isContinueLoading =
    verifyOTPStatus.status === REQUEST_RESPONSE_STATUS.PROCESSING
  const isResendOTPLoading =
    resendOTPStatus.status === REQUEST_RESPONSE_STATUS.PROCESSING

  return (
    <div className="flex-1 flex-col pb-4">
      <h3 className="text-black text-center mt-10 font-medium">
        {t('verification')}
      </h3>
      <SubTitle className="text-center mt-2">
        <span className="font-light">{t('enterTheVerificationCode')}</span>
        <br />
        <span className="font-normal text-pink">
          {loginMethod === LOGIN_METHODS.EMAIL
            ? email
            : formatPhoneNumberIntl(phoneNumber)}
        </span>
      </SubTitle>
      <div className="font-light justify-center w-full">
        {count > 0 ? t('otpWillExpire', { time: count }) : t('otpExpired')}
      </div>

      <div className="flex-1 flex-col items-center justify-center mt-16 mb-12">
        {/* <OtpInput ref={otpRef} /> */}
        <OtpInputComponent
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputType="number"
          renderSeparator={null}
          inputStyle="otp-input"
          renderInput={Input}
          shouldAutoFocus
        />
        <div className="justify-center items-center">
          {authOTPError && (
            <small className="text-red text-center mt-1">
              {t(errorConstants[authOTPError || ''])}
            </small>
          )}
        </div>
      </div>

      <div className="flex-1 flex-col justify-end">
        <ContainedButton
          onClick={handleOnOTPInputContinueClick}
          disabled={isContinueLoading}
          className={`flex-initial btn-contained-pink`}
          isLoading={isContinueLoading}
        >
          {t('continue')}
        </ContainedButton>
        <OutlinedButton
          primaryColor="pink"
          onClick={onChangePhoneClick}
          className="my-2 border-pink flex-initial"
        >
          {isSMS ? t('changePhone') : t('changeEmail')}
        </OutlinedButton>
        <OutlinedButton
          primaryColor="pink"
          onClick={onResendCodeClick}
          disabled={isResendOTPLoading || count > 0}
          loaderColor={'#FD889A'} // FIXME
          className={`flex-initial btn-outlined-pink`}
          isLoading={isResendOTPLoading}
        >
          {t('resendCode')}
        </OutlinedButton>
      </div>
    </div>
  )
}

export { OTPComponent }
