import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import React, { ChangeEvent } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

import { RadioInput, TextInput } from '@sw-npm-packages/components'
import { getCountryCode } from '@sw-npm-packages/config'
import { DATE_TIME_FORMATS } from '@sw-npm-packages/constants'
import { IProfileFormData } from '@sw-npm-packages/types/user'
import { profileFormConfigGlobal } from 'config'
import { getUserEmail, getUserPhoneNumber, validateForm } from 'helpers'
import { selectEmail, selectPhoneNumber } from 'store/selectors/auth'

import { genderData } from './data'

interface IProfileForm {
  formData: IProfileFormData
  setFormData: React.Dispatch<React.SetStateAction<IProfileFormData>>
  error: IProfileFormData
  setError: React.Dispatch<React.SetStateAction<IProfileFormData>>
  isProfilePage?: boolean
}

const ProfileForm = (props: IProfileForm) => {
  const {
    formData,
    setFormData,
    error,
    setError,
    isProfilePage = false
  } = props
  const phoneFromRedux = useSelector(selectPhoneNumber, shallowEqual)
  const emailFromRedux = useSelector(selectEmail, shallowEqual)
  const phoneFromCookie = getUserPhoneNumber()
  const emailFromCookie = getUserEmail()
  const phone = phoneFromRedux || phoneFromCookie
  const email = emailFromRedux || emailFromCookie
  const countryCode = getCountryCode()
  const t = useTranslations('ProfilePage')

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleOnBlur = () => {
    const isValid = Boolean(
      error.firstName ||
        error.lastName ||
        error.dateOfBirth ||
        error.gender ||
        error.email ||
        error.phone ||
        error.companyName
    )
    if (isValid) {
      const { errors } = validateForm(formData, profileFormConfigGlobal)
      setError(errors)
    }
  }

  return (
    <div className="flex-col w-full mb-8">
      <TextInput
        onChange={handleOnChange}
        containerClassNames="mb-6"
        label={t('firstName')}
        value={formData.firstName}
        error={error.firstName}
        onBlur={handleOnBlur}
        name="firstName"
      />
      <TextInput
        onChange={handleOnChange}
        containerClassNames="mb-6"
        label={t('lastName')}
        onBlur={handleOnBlur}
        value={formData.lastName}
        error={error.lastName}
        name="lastName"
      />
      <TextInput
        onChange={handleOnChange}
        type="date"
        containerClassNames="mb-6"
        max={dayjs().format(DATE_TIME_FORMATS.date)}
        label={t('dateOfBirth')}
        error={error.dateOfBirth}
        value={formData.dateOfBirth}
        onBlur={handleOnBlur}
        name="dateOfBirth"
      />
      <TextInput
        disabled={Boolean(phone) || isProfilePage}
        containerClassNames="mb-6"
        label={t('phone')}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        error={error.phone}
        value={formData.phone || ''}
        name="phone"
      />
      <TextInput
        onChange={handleOnChange}
        containerClassNames="mb-6"
        label={t('email')}
        error={error.email}
        value={formData.email || ''}
        onBlur={handleOnBlur}
        disabled={Boolean(email) || isProfilePage}
        name="email"
      />
      {countryCode !== 'NZ' && (
        <TextInput
          onChange={handleOnChange}
          containerClassNames="mb-6"
          label={t('companyName')}
          error={error.companyName}
          value={formData.companyName || ''}
          onBlur={handleOnBlur}
          name="companyName"
        />
      )}

      {!isProfilePage ? (
        <TextInput
          onChange={handleOnChange}
          containerClassNames="mb-6"
          label={'Referral Code (Optional)'}
          error={error.referralCode}
          value={formData.referralCode || ''}
          onBlur={handleOnBlur}
          name="referralCode"
        />
      ) : null}

      <RadioInput
        name="gender"
        labelClassNames="mb-4"
        inputContainerClassNames="mb-4"
        inputLabelClassNames="pl-2 text-sm"
        label={t('gender')}
        error={error.gender}
        value={formData.gender}
        options={genderData.map((o) => ({
          ...o,
          label: t(o.label)
        }))}
        onChange={handleOnChange}
      />
    </div>
  )
}

export { ProfileForm }
