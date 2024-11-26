import { useTranslations } from 'next-intl'
import React from 'react'
import PhoneInput, {
  type Country,
  type Value,
  parsePhoneNumber
} from 'react-phone-number-input/mobile'
import { useDispatch, useSelector } from 'react-redux'

import { PosthogEvents } from '@constants'
import { isNull, isValidPhoneNumber } from '@sw-npm-packages/utils'
import { countries, defaultCountryCode } from 'config'
import { isGlobalUser } from 'helpers'
import { emitTrackEvent } from 'helpers/events'
import { updateAuthStatus } from 'store/actions/auth'
import { AUTH_STATE_KEYS } from 'store/constants/auth'
import { selectPhoneNumber } from 'store/selectors/auth'

import 'react-phone-number-input/style.css'

interface IProps {
  country: Country
  setCountry: React.Dispatch<React.SetStateAction<Country>>
}

const PhoneNumberInput = (props: IProps) => {
  const { country, setCountry } = props
  const phoneNumber = useSelector(selectPhoneNumber)
  const t = useTranslations('PhoneInputPage')
  const dispatch = useDispatch()

  const handleCountryChange = (newCountry: Country) => {
    if (!newCountry) return
    emitTrackEvent(PosthogEvents.CountryChanged, {
      oldCountry: country,
      newCountry
    })
    setCountry(newCountry)
  }

  const onChange = (number: Value) => {
    let value = number || ''

    if (!isGlobalUser) {
      const parsedPhoneNumberData = parsePhoneNumber(value)

      const { nationalNumber, countryCallingCode } = parsedPhoneNumberData || {}

      if (nationalNumber && nationalNumber?.length > 10) {
        value = `+${countryCallingCode}${nationalNumber?.slice(0, 10)}`
      }
    }

    let isValid = false
    let phoneNumber = null

    if (value) {
      const data = isValidPhoneNumber(value)

      const { isValid: isPhoneValid, phoneNumber: sanitizedPhoneNumber } = data

      isValid = isPhoneValid
      phoneNumber = isNull(sanitizedPhoneNumber) ? value : sanitizedPhoneNumber
    }

    dispatch(
      updateAuthStatus(AUTH_STATE_KEYS.PHONE_NUMBER, {
        value: phoneNumber as string,
        isValid,
        country
      })
    )
  }

  return (
    <PhoneInput
      countries={countries}
      onCountryChange={handleCountryChange}
      defaultCountry={defaultCountryCode}
      className="font-light"
      international
      placeholder={t('phonePlaceholder')}
      value={phoneNumber}
      onChange={onChange}
      countryCallingCodeEditable={false}
      limitMaxLength
    />
  )
}

export { PhoneNumberInput }
