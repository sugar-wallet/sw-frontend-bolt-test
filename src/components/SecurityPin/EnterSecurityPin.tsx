import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import OtpInputComponent from 'react-otp-input'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { PosthogEvents } from '@constants'
import { Input } from '@sw-npm-packages/components'
import { errorConstants } from '@sw-npm-packages/constants'
import { navigationPaths } from 'config'
import { emitTrackEvent } from 'helpers/events'
import { navigate } from 'helpers/navigation'
import { SecondaryLayout } from 'layouts'
import { handleSecurityPinVerify } from 'store/actions/auth'
import { selectAuthPinError } from 'store/selectors/auth'

const EnterSecurityPin = () => {
  const t = useTranslations('SecurityPinPage')

  const dispatch = useDispatch()
  const [pin, setPin] = useState('')
  const authPinError = useSelector(selectAuthPinError, shallowEqual)

  const isBtnDisabled = !(pin && pin.length === 4)

  const handleContinue = () => {
    emitTrackEvent(PosthogEvents.EnterSecurityPinSubmitClicked)
    dispatch(handleSecurityPinVerify({ securityPin: pin }))
  }

  const handleForgotPin = () => {
    emitTrackEvent(PosthogEvents.EnterSecurityPinForgotPinClicked)
    navigate(navigationPaths.createSecurityPin)
  }

  return (
    <SecondaryLayout
      title={t('enterPin')}
      subTitle=" "
      footerPrimaryBtnLabel={t('continue')}
      footerPrimaryBtnDisabled={isBtnDisabled}
      footerPrimaryBtnOnClick={handleContinue}
      footerSecondaryBtnLabel={t('forgotPin')}
      footerSecondaryBtnOnClick={handleForgotPin}
    >
      <div className="mt-36 max-xs:mt-20 flex-col justify-center items-center">
        <div className="w-full flex-center">
          <OtpInputComponent
            value={pin}
            onChange={setPin}
            numInputs={4}
            inputType="number"
            renderSeparator={null}
            inputStyle="otp-input"
            renderInput={Input}
            shouldAutoFocus
          />
        </div>
        {authPinError && (
          <small className="text-red mt-1">
            {t(errorConstants[authPinError?.toLowerCase() || ''])}
          </small>
        )}
      </div>
    </SecondaryLayout>
  )
}

export { EnterSecurityPin }
