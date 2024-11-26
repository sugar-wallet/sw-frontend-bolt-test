import { type AxiosResponse } from 'axios'
import { type AnyAction } from 'redux'
import { call, put } from 'redux-saga/effects'

import { REQUEST_RESPONSE_STATUS } from '@sw-npm-packages/constants'
import { ERRORS, IKeyValuePair, ILandingPage } from '@sw-npm-packages/types'
import { logger, notifyError, notifySuccess } from '@sw-npm-packages/utils'
import { userApi } from 'api'
import { navigationPaths } from 'config'
import {
  appendQueryParams,
  extractLandingPageData,
  setUserCookieData
} from 'helpers'
import { emitLoginSuccess, emitLogoutSuccess } from 'helpers/events'
import { navigate } from 'helpers/navigation'
import translate from 'languages'
import { updateUserStatus } from 'store/actions/user'
import { USER_STATE_KEYS } from 'store/constants/user'
import { CAMPAIGN_TYPE } from 'types'

import { IUserProfileInfo } from './../../../@sw-npm-packages/types/data'

import * as types from '../../types/user'

function* handleRegisterUser(value: IKeyValuePair<string | boolean | null>) {
  try {
    yield put(
      updateUserStatus(USER_STATE_KEYS.REGISTER_USER, {
        status: REQUEST_RESPONSE_STATUS.PROCESSING
      })
    )

    const response: AxiosResponse = yield call(userApi.registerUser, value)

    logger.info('Register User Response :- ', response.data)

    yield put(
      updateUserStatus(USER_STATE_KEYS.REGISTER_USER, {
        status: REQUEST_RESPONSE_STATUS.SUCCESS
      })
    )

    const data: IUserProfileInfo = response.data
    let isCampaign = false
    if (data.redirect && data.reward_type) {
      if (data.reward_type.toString().toLowerCase() === 'store') {
        navigate(navigationPaths.campaignStoreWelcome)
        isCampaign = true
      } else if (data.reward_type.toString().toLowerCase() === 'employer') {
        navigate(navigationPaths.campaignEmployerWelcome)
        isCampaign = true
      }
    }

    // update is registration completed in cookie
    yield call(setUserCookieData, {
      is_registration_completed: data.registration_completed || false
    })

    yield call(emitLoginSuccess)
    yield call(notifySuccess, translate('ProfilePage.profileInfoUpdate'))
    if (!isCampaign) yield call(navigate, navigationPaths.home)
  } catch (err) {
    logger.error('Error in handleRegisterUser :- ', err)
    const error = err.response?.data
    if (error?.error_code === ERRORS.VALIDATION_ERROR && error?.errors?.email) {
      yield call(notifyError, translate('ProfilePage.duplicateEmail'))
    } else {
      yield call(
        notifyError,
        error.message || translate('ProfilePage.userRegistrationFailed')
      )
    }
    if (
      error?.details
        ?.toLowerCase()
        ?.includes('authentication credentials were not provided')
    ) {
      yield call(notifyError, translate('ProfilePage.authFailure'))
      yield call(emitLogoutSuccess)
    }
    yield put(
      updateUserStatus(USER_STATE_KEYS.REGISTER_USER, {
        status: REQUEST_RESPONSE_STATUS.ERROR,
        errorMessage: err.message
      })
    )
  }
}

function* handleUpdateUser(value: IKeyValuePair<string | boolean | null>) {
  try {
    yield put(
      updateUserStatus(USER_STATE_KEYS.REGISTER_USER, {
        status: REQUEST_RESPONSE_STATUS.PROCESSING
      })
    )
    yield call(userApi.updateUser, value)
    yield put(
      updateUserStatus(USER_STATE_KEYS.REGISTER_USER, {
        status: REQUEST_RESPONSE_STATUS.SUCCESS
      })
    )
    if (!value?.retarget_code_used) {
      notifySuccess(translate('ProfilePage.profileInfoUpdate'))
    }
  } catch (err) {
    logger.error('Error in handleSendOtp :- ', err)
    notifyError(translate('ProfilePage.profileInfoUpdateFailed'))
    yield put(
      updateUserStatus(USER_STATE_KEYS.REGISTER_USER, {
        status: REQUEST_RESPONSE_STATUS.ERROR,
        errorMessage: err.message
      })
    )
  }
}

function* handleFetchLandingPage(
  value: IKeyValuePair<string | boolean | null>
) {
  try {
    yield put(
      updateUserStatus(USER_STATE_KEYS.FETCH_LANDING_PAGE, {
        status: REQUEST_RESPONSE_STATUS.PROCESSING
      })
    )
    const {
      isWorldCup = false,
      isXmas = false,
      isNye = false,
      ...apiBody
    } = value
    const response: AxiosResponse = yield call(
      userApi.fetchLandingPage,
      apiBody
    )

    const customCampaignUrl = isWorldCup
      ? navigationPaths.campaignWorldCup
      : isXmas
      ? navigationPaths.campaignXMas
      : isNye
      ? navigationPaths.campaignNYE
      : null

    logger.info('Fetch Landing Page Response :- ', response.data)

    yield put(
      updateUserStatus(USER_STATE_KEYS.FETCH_LANDING_PAGE, {
        status: REQUEST_RESPONSE_STATUS.SUCCESS
      })
    )
    const commonUrlParams = ['campaignCode', 'referralCode', 'retargetCode']

    const data: ILandingPage = extractLandingPageData(response)
    if (data.screenType.toLowerCase() === 'campaign_over') {
      navigate(
        appendQueryParams(navigationPaths.campaignExpired, commonUrlParams)
      )
    } else if (data.screenType?.toLowerCase()?.includes('error')) {
      navigate(
        appendQueryParams(navigationPaths.campaignInvalidLink, commonUrlParams)
      )
    } else if (data.screenType.toLowerCase() === 'store') {
      navigate(
        appendQueryParams(
          customCampaignUrl ? customCampaignUrl : navigationPaths.campaignStore,
          commonUrlParams
        )
      )
    } else if (data.screenType.toLowerCase() === 'employer') {
      navigate(
        appendQueryParams(
          customCampaignUrl
            ? customCampaignUrl
            : navigationPaths.campaignEmployer,
          commonUrlParams,
          {
            rewardAmount: data.rewardAmount
          }
        )
      )
    } else if (data.screenType.toLowerCase() === 'referral') {
      navigate(
        appendQueryParams(navigationPaths.campaignReferral, commonUrlParams, {
          rewardType:
            data.screenType?.toString()?.toLowerCase() === 'employer'
              ? CAMPAIGN_TYPE.EMPLOYER
              : data.screenType?.toString()?.toLowerCase() === 'store'
              ? CAMPAIGN_TYPE.STORE
              : CAMPAIGN_TYPE.REFERRAL,
          rewardAmount: data.rewardAmount
        })
      )
    } else {
      navigate(navigationPaths.onboarding)
    }
  } catch (err) {
    logger.error('Error in Fetch Landing Page :- ', err)
    yield call(notifyError, 'Fetch Landing Page failed')
    yield put(
      updateUserStatus(USER_STATE_KEYS.FETCH_LANDING_PAGE, {
        status: REQUEST_RESPONSE_STATUS.ERROR,
        errorMessage: err.message
      })
    )
  }
}

export function* handleUserEvents(action: AnyAction) {
  switch (action.type) {
    case types.HANDLE_REGISTER_USER:
      yield handleRegisterUser(action.value)
      break
    case types.HANDLE_UPDATE_USER:
      yield handleUpdateUser(action.value)
      break
    case types.FETCH_LANDING_PAGE:
      yield handleFetchLandingPage(action.value)
      break
    default:
      break
  }
}
