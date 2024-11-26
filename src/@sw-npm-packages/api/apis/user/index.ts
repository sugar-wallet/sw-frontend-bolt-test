import type { AxiosPromise, AxiosInstance } from 'axios'

import {
  TAxiosInstances,
  TStandardPayload,
  TStandardQueries
} from '@sw-npm-packages/types'

import { userEndpoints } from './endpoints'

class User {
  axiosInstanceV2: AxiosInstance

  constructor({ axiosInstanceV2 }: TAxiosInstances) {
    this.axiosInstanceV2 = axiosInstanceV2
  }

  registerUser = (payload: TStandardPayload): AxiosPromise => {
    return this.axiosInstanceV2.post(userEndpoints.profile, payload)
  }

  updateUser = (payload: TStandardPayload): AxiosPromise => {
    return this.axiosInstanceV2.patch(userEndpoints.profile, payload)
  }

  fetchUserProfile = (queries: TStandardQueries): AxiosPromise => {
    return this.axiosInstanceV2.get(userEndpoints.profile, queries)
  }

  fetchRepublicDayReward = (queries: TStandardQueries): AxiosPromise => {
    return this.axiosInstanceV2.get(userEndpoints.republicDayReward, queries)
  }

  fetchUserReferrals = (queries: TStandardQueries): AxiosPromise => {
    return this.axiosInstanceV2.get(userEndpoints.referral, queries)
  }
  fetchReferralsRetrive = (queries: TStandardQueries): AxiosPromise => {
    return this.axiosInstanceV2.get(userEndpoints.retrive, queries)
  }
  fetchReferralsPredictionRetrive = (queries: TStandardQueries): AxiosPromise => {
    return this.axiosInstanceV2.get(userEndpoints.predictionRetrive, queries)
  }
  fetchPricingHistoric = (queries: TStandardQueries ): AxiosPromise => {
    const queryParams = queries.meta?.queryParams; 
    console.log(queryParams)
    const endpoint = queryParams ? `${userEndpoints.pricingHistoric}${queryParams}`  : userEndpoints.pricingHistoric;
    return this.axiosInstanceV2.get(endpoint, queries)
  }

  fetchLandingPage = (payload: TStandardPayload): AxiosPromise => {
    return this.axiosInstanceV2.post(userEndpoints.landingpage, payload)
  }

  fetchUserGifts = (queries: TStandardQueries): AxiosPromise => {
    return this.axiosInstanceV2.get(userEndpoints.gift, queries)
  }
}

export { User }
