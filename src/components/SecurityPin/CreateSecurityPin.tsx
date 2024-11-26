import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import OtpInputComponent from 'react-otp-input'
import { useDispatch } from 'react-redux'

import { PosthogEvents } from '@constants'
import { Input } from '@sw-npm-packages/components'
import { navigationPaths } from 'config'
import { emitTrackEvent } from 'helpers/events'
import { navigate } from 'helpers/navigation'
import { SecondaryLayout } from 'layouts'
import { handleSecurityPinSendOtp } from 'store/actions/auth'

const CreateSecurityPin = () => {
  const t = useTranslations('SecurityPinPage')
  const dispatch = useDispatch()
  const [newPin, setNewPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [error, setError] = useState('')

  const isBtnDisabled = !(
    confirmPin &&
    newPin &&
    confirmPin.length === 4 &&
    newPin.length === 4
  )

  const validateSecurityPin = (): boolean => {
    return confirmPin === newPin
  }

  const handleContinue = () => {
    emitTrackEvent(PosthogEvents.CreateSecurityPinSubmitClicked, {
      newPin,
      confirmPin
    })
    if (validateSecurityPin()) {
      dispatch(handleSecurityPinSendOtp({ securityPin: newPin }))
      navigate(navigationPaths.verifySecurityOTP, true)
    } else {
      emitTrackEvent(PosthogEvents.CreateSecurityPinInvalidPinEntered, {
        newPin,
        confirmPin,
        errorType: 'pinNotMatchingError'
      })
      setError(t('pinNotMatchingError'))
    }
  }

  return (
    <SecondaryLayout
      title={t('createPin')}
      subTitle=" "
      footerPrimaryBtnLabel={t('continue')}
      footerPrimaryBtnDisabled={isBtnDisabled}
      footerPrimaryBtnOnClick={handleContinue}
    >
      <div className="mt-8 max-xs:mt-4 flex-col justify-center items-center">
        <div className="text-center text-md mb-2">{t('newPin')}</div>
        <div className="w-full flex-center">
          <OtpInputComponent
            value={newPin}
            onChange={setNewPin}
            numInputs={4}
            inputType="number"
            renderSeparator={null}
            inputStyle="otp-input"
            renderInput={Input}
            shouldAutoFocus
          />
        </div>
        <div className="text-center mt-8 mb-2 text-md">{t('confirmPin')}</div>
        <div className="w-full flex-center">
          <OtpInputComponent
            value={confirmPin}
            onChange={setConfirmPin}
            numInputs={4}
            inputType="number"
            renderSeparator={null}
            inputStyle="otp-input"
            renderInput={Input}
          />
        </div>
        {error && <small className="text-red mt-1">{error}</small>}
        <div className={`text-center font-light ${error ? 'mt-6' : 'mt-12'}`}>
          {t('descTitle')}
        </div>
      </div>
    </SecondaryLayout>
  )
}

export { CreateSecurityPin }
