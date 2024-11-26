import { useTranslations } from 'next-intl'
import React from 'react'
import { formatPhoneNumberIntl } from 'react-phone-number-input'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { PosthogEvents } from '@constants'
import { OtpInput } from '@sw-npm-packages/components'
import {
  REQUEST_RESPONSE_STATUS,
  errorConstants
} from '@sw-npm-packages/constants'
import { getUserPhoneNumber } from 'helpers'
import { emitTrackEvent } from 'helpers/events'
import { SecondaryLayout } from 'layouts'
import { handleResendOtp, handleSecurityPinVerifyOtp } from 'store/actions/auth'
import {
  selectAuthOtpError,
  selectResendOTPStatus,
  selectSecurityPin,
  selectVerifyOTPStatus
} from 'store/selectors/auth'

const SecurityOTPComponent = () => {
  const t = useTranslations('OtpVerificationPage')
  const phoneNumber = getUserPhoneNumber()
  const verifyOTPStatus = useSelector(selectVerifyOTPStatus)
  const resendOTPStatus = useSelector(selectResendOTPStatus)
  const securityPin = useSelector(selectSecurityPin)
  const authOTPError = useSelector(selectAuthOtpError, shallowEqual)

  const dispatch = useDispatch()

  const otpRef = React.useRef(null)

  const handleOnOTPInputContinueClick = () => {
    const otp = otpRef.current?.getOTP()
    emitTrackEvent(PosthogEvents.CreateSecurityPinOtpSubmitClicked, {
      pin: securityPin,
      otp
    })
    dispatch(handleSecurityPinVerifyOtp({ otp }))
  }

  const onResendCodeClick = () => {
    emitTrackEvent(PosthogEvents.CreateSecurityPinOtpDidntReceivedClicked)
    dispatch(handleResendOtp())
  }

  const isContinueLoading =
    verifyOTPStatus.status === REQUEST_RESPONSE_STATUS.PROCESSING
  const isResendOTPLoading =
    resendOTPStatus.status === REQUEST_RESPONSE_STATUS.PROCESSING

  return (
    <SecondaryLayout
      title={t('verificationOtp')}
      subTitle={
        <div className="flex-center font-light3">
          <div>{t('enterTheVerificationCode')}</div>
          <div className="text-pink">
            {formatPhoneNumberIntl(phoneNumber || '')}
          </div>
        </div>
      }
      footerPrimaryBtnLabel={t('continue')}
      footerPrimaryBtnOnClick={handleOnOTPInputContinueClick}
      footerPrimaryBtnLoading={isContinueLoading}
      footerPrimaryBtnDisabled={isContinueLoading}
      footerSecondaryBtnLabel={t('resendCode')}
      footerSecondaryBtnOnClick={onResendCodeClick}
      footerSecondaryBtnLoading={isResendOTPLoading}
      footerSecondaryBtnDisabled={isResendOTPLoading}
    >
      <div className="mt-32 justify-center max-xs:mt-20">
        <OtpInput ref={otpRef} />
      </div>
      {authOTPError && (
        <small className="text-red text-center mt-1">
          {t(errorConstants[authOTPError || ''])}
        </small>
      )}
    </SecondaryLayout>
  )
}

export { SecurityOTPComponent }
