import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { PosthogEvents } from '@constants'
import { ContainedButton } from '@sw-npm-packages/components'
import { isGlobalApp } from '@sw-npm-packages/constants'
import { IProfileFormData } from '@sw-npm-packages/types/user'
import { ProfileForm } from 'components'
import {
  fetchUserProfile,
  initialProfileData,
  profileFormConfigGlobal
} from 'config'
import { identifyUser, validateForm } from 'helpers'
import { emitTrackEvent } from 'helpers/events'
import { PrimaryLayout } from 'layouts'
import { handleLogout } from 'store/actions/auth'
import { handleRegisterUser } from 'store/actions/user'
import { selectIsRegisteringUser } from 'store/selectors/user'

const Profile = () => {
  const dispatch = useDispatch()
  const t = useTranslations('ProfilePage')
  const [formData, setFormData] = useState<IProfileFormData>(initialProfileData)
  const [error, setError] = useState<IProfileFormData>(initialProfileData)
  // const phoneNumber = useSelector(selectPhoneNumber, shallowEqual)
  const isRegistering = useSelector(selectIsRegisteringUser, shallowEqual)
  const { data } = useQuery(fetchUserProfile())

  useEffect(() => {
    emitTrackEvent(PosthogEvents.ProfilePageViewed)
  }, [])

  useEffect(() => {
    if (data) {
      const {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        currency,
        language,
        phoneNumber,
        email,
        companyName
      } = data
      setFormData({
        firstName,
        lastName,
        dateOfBirth,
        gender,
        currency,
        language,
        phone: phoneNumber,
        email,
        companyName
      })
    }
  }, [data])

  const onLogout = () => {
    dispatch(handleLogout())
  }

  const handleSubmit = () => {
    if (isGlobalApp) return
    const { isValidated, errors } = validateForm(
      formData,
      profileFormConfigGlobal
    )
    emitTrackEvent(PosthogEvents.SignupFormSubmitClicked, {
      ...formData
    })
    if (isValidated) {
      emitTrackEvent(PosthogEvents.ProfileUpdated, {
        ...formData
      })

      if (formData?.phone)
        identifyUser(formData.phone.toString(), {
          ...formData
        })

      dispatch(
        handleRegisterUser({
          first_name: formData.firstName,
          last_name: formData.lastName,
          date_of_birth: formData.dateOfBirth,
          gender: formData.gender,
          currency: formData.currency || '',
          language: formData.language || '',
          email: formData.email,
          company_name: formData.companyName,
          phone_number: formData.phone
        })
      )
    } else {
      setError(errors)
    }
  }
  return (
    <PrimaryLayout>
      <div className="w-full flex-col p-4">
        <div className="flex-col pb-24">
          <h3 className="text-black font-medium text-center mb-6 mt-6">
            {t('title')}
          </h3>
          <div className="w-full justify-center items-center">
            <ProfileForm
              error={error}
              setError={setError}
              formData={formData}
              setFormData={setFormData}
              isProfilePage
            />
          </div>
        </div>
      </div>

      <div className="flex-col btn-fixed-bottom !-bottom-[2rem]">
        <ContainedButton
          disabled={isRegistering}
          isLoading={isRegistering}
          className="btn-contained-pink"
          onClick={handleSubmit}
        >
          {t('update')}
        </ContainedButton>

        <ContainedButton className="mt-2 btn-contained-pink" onClick={onLogout}>
          {t('logout')}
        </ContainedButton>
      </div>
    </PrimaryLayout>
  )
}

export default Profile
