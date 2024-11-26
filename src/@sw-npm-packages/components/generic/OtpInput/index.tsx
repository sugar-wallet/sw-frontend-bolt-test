import React, { useState } from 'react'
import OtpInputComponent from 'react-otp-input'

import { Input } from '../Input'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OtpInput = React.forwardRef((_, ref) => {
  const [otp, setOtp] = useState('')

  React.useImperativeHandle(ref, () => {
    return {
      getOTP: () => {
        return otp
      },
      setOtpValue: (_otp: string) => {
        setOtp(_otp)
      }
    }
  })

  return (
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
  )
})

OtpInput.displayName = 'OtpInput'

export { OtpInput }
