import React from 'react'
import { useSelector } from 'react-redux'

import { getCountryCode } from '@sw-npm-packages/config'
import { LoginComponent, MultiLoginComponent, OTPComponent } from 'components'
import { multiLoginCountries } from 'config'
import { PrimaryLayout } from 'layouts'
import { selectIsOTPSent } from 'store/selectors/auth'

const Login = () => {
  const countryCode = getCountryCode()
  const isOTPSent = useSelector(selectIsOTPSent)

  return (
    <PrimaryLayout>
      {isOTPSent ? (
        <OTPComponent />
      ) : multiLoginCountries.includes(countryCode) ? (
        <MultiLoginComponent />
      ) : (
        <LoginComponent />
      )}
    </PrimaryLayout>
  )
}

export default Login
