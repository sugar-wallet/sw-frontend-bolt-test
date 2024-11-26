import { useQuery } from '@tanstack/react-query'
import { type CountryCode } from 'countries-and-timezones'
import countryToCurrency from 'country-to-currency'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { PosthogEvents } from '@constants'
import { ContainedButton } from '@sw-npm-packages/components'
import { getCountryCode } from '@sw-npm-packages/config'
import { COOKIE_KEYS, USER_STATE_INFO } from "@sw-npm-packages/constants";
import { IProfileFormData } from '@sw-npm-packages/types/user'
import { getUserIdFromJWT, isEmpty } from "@sw-npm-packages/utils";
import { ProfileForm } from 'components'
import {
  fetchUserProfile,
  initialProfileData,
  profileFormConfigGlobal
} from 'config'
import {
  getUserStateKeyValue,
  gtmPushEvent,
  identifyUser,
  validateForm
} from 'helpers'
import { emitTrackEvent } from 'helpers/events'
import { getLanguageByTz } from 'helpers/language'
import { PrimaryLayout } from 'layouts'
import { handleRegisterUser } from 'store/actions/user'
import { selectCountry, selectPhoneNumber } from 'store/selectors/auth'
import { selectIsRegisteringUser } from 'store/selectors/user'
import { getCookie } from "cookies-next";

const SignupPage = () => {
  const dispatch = useDispatch()
  const t = useTranslations('ProfilePage')
  const [formData, setFormData] = useState<IProfileFormData>(initialProfileData)
  const [error, setError] = useState<IProfileFormData>(initialProfileData)
  const phoneNumber = useSelector(selectPhoneNumber, shallowEqual)
  const isRegistering = useSelector(selectIsRegisteringUser, shallowEqual)
  const router = useRouter()
  const { referralCode, campaignCode, worldcupTeam } = router.query
  const countryCodeFromRedux = useSelector(selectCountry, shallowEqual)
  const countryCodeFromCookie = getUserStateKeyValue(USER_STATE_INFO.COUNTRY)
  const countryCode =
    countryCodeFromRedux || countryCodeFromCookie || getCountryCode()

  const { data } = useQuery(fetchUserProfile())

  useEffect(() => {
    emitTrackEvent(PosthogEvents.SignupFormViewed)
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
        companyName,
        referralCode
      })
    }
  }, [data])

  const handleSubmit = () => {
    const { isValidated, errors } = validateForm(
      formData,
      profileFormConfigGlobal
    )
    emitTrackEvent(PosthogEvents.SignupFormSubmitClicked, {
      ...formData
    })
    if (isValidated) {
      emitTrackEvent(PosthogEvents.SignupSuccess)

      if (phoneNumber)
        identifyUser(phoneNumber.toString(), {
          ...formData
        })

      const referralCode = formData.referralCode?.trim()

      const token = getCookie(COOKIE_KEYS.ACCESS_TOKEN)
      const userId = getUserIdFromJWT(token)
      gtmPushEvent('user_signup', {
        user_data: {
          id: userId, // Add the unique User ID here
          phone: formData.phone,
          email: formData.email,
          address: {
            city: undefined,
            gender: formData.gender,
            address: undefined,
            state: undefined,
            country: undefined,
            postal_code: undefined,
            first_name: formData.firstName,
            last_name: formData.lastName
          }
        }
      })

      dispatch(
        handleRegisterUser({
          first_name: formData.firstName,
          last_name: formData.lastName,
          date_of_birth: formData.dateOfBirth,
          gender: formData.gender,
          currency: countryToCurrency[countryCode as CountryCode],
          language: getLanguageByTz(),
          referral_code_used: referralCode
            ? referralCode.toString()
            : undefined,
          campaign_code_used: campaignCode
            ? campaignCode.toString()
            : undefined,
          worldcup_team: worldcupTeam ? worldcupTeam.toString() : undefined,
          email: formData.email,
          company_name: formData.companyName,
          phone_number: formData.phone,
          ...(isEmpty(referralCode)
            ? { referral_code_used: referralCode }
            : null)
        })
      )
    } else {
      setError(errors)
    }
  }
  return (
    <PrimaryLayout>
      <div className="w-full flex-col p-4">
        <div className="flex-col pb-16">
          <h3 className="text-black font-medium text-center mb-6 mt-6">
            {t('title')}
          </h3>
          <div className="justify-center items-center">
            <ProfileForm
              error={error}
              setError={setError}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </div>
      </div>

      <ContainedButton
        disabled={isRegistering}
        isLoading={isRegistering}
        className="btn-fixed-bottom btn-contained-pink"
        onClick={handleSubmit}
      >
        {t('continue')}
      </ContainedButton>
    </PrimaryLayout>
  )
}

export default SignupPage
