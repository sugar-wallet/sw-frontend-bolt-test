import { goldApi, userApi, userFinanceApi } from 'api'
import {
  extractGoldPrice,
  extractRepublicDayReward,
  extractUserBalance,
  extractUserBankAccount,
  extractUserGiftsData,
  extractUserGoldSubscription,
  extractUserProfileInfo,
  extractUserReferralsData,
  extractUserTransactionsData,
  extractUserUpiId,
  extractUserAkahuAccountsData,
  extractReferralsRetriveData,
  extractReferralsPredictionRetriveData,
  extractPricingHistoricData
} from 'helpers'
import { dataKeys } from 'helpers/events'

export const fetchUserProfile = (config = {}) => ({
  queryKey: [dataKeys.FETCH_USER_PROFILE],
  queryFn: userApi.fetchUserProfile,
  select: extractUserProfileInfo,
  ...config
})

export const fetchRepublicDayReward = (config = {}) => ({
  queryKey: [dataKeys.FETCH_REPUBLIC_DAY_REWARD],
  queryFn: userApi.fetchRepublicDayReward,
  select: extractRepublicDayReward,
  ...config
})

export const fetchUserBalance = (config = {}) => ({
  queryKey: [dataKeys.FETCH_USER_BALANCE],
  queryFn: userFinanceApi.fetchUserBalance,
  select: extractUserBalance,
  ...config
})

export const fetchGoldLatestPrice = (config = {}) => ({
  queryKey: [dataKeys.FETCH_GOLD_LATEST_PRICE],
  queryFn: goldApi.fetchGoldPrice,
  select: extractGoldPrice,
  refetchInterval: 60000, // 1 min
  ...config
})

export const fetchUserBankAccount = (config = {}) => ({
  queryKey: [dataKeys.FETCH_USER_BANK_ACCOUNT],
  queryFn: userFinanceApi.fetchUserBankAccount,
  select: extractUserBankAccount,
  ...config
})

export const fetchUserUpiId = (config = {}) => ({
  queryKey: [dataKeys.FETCH_USER_UPI_ID],
  queryFn: userFinanceApi.fetchUserUpiId,
  select: extractUserUpiId,
  ...config
})

export const fetchUserGoldSubscriptions = (config = {}) => ({
  queryKey: [dataKeys.FETCH_USER_GOLD_SUBSCRIPTIONS],
  queryFn: userFinanceApi.fetchPaymentSubscriptions,
  select: extractUserGoldSubscription,
  ...config
})

export const fetchUserReferrals = (config = {}) => ({
  queryKey: [dataKeys.FETCH_USER_REFERRALS],
  queryFn: userApi.fetchUserReferrals,
  select: extractUserReferralsData,
  ...config
})
export const fetchReferralsRetrive = (config = {}) => ({
  queryKey: [dataKeys.FETCH_REFERRALS_RETRIVE],
  queryFn: userApi.fetchReferralsRetrive,
  select: extractReferralsRetriveData,
  ...config
})
export const fetchReferralsPredictionRetrive = (config = {}) => ({
  queryKey: [dataKeys.FETCH_REFERRALS_PREDICTION_RETRIVE],
  queryFn: userApi.fetchReferralsPredictionRetrive,
  select: extractReferralsPredictionRetriveData,
  ...config
})
export const fetchPricingHistoric = (config = {}) => { 
  return{
  queryKey: [dataKeys.FETCH_PRICING_HISTORIC],
  queryFn: userApi.fetchPricingHistoric,
  select: extractPricingHistoricData,
  meta: config,
  ...config
}}

export const fetchUserGifts = (config = {}) => ({
  queryKey: [dataKeys.FETCH_USER_GIFTS],
  queryFn: userApi.fetchUserGifts,
  select: extractUserGiftsData,
  ...config
})

export const fetchUserTransactions = (config = {}) => ({
  queryKey: [dataKeys.FETCH_USER_TRANSACTIONS],
  queryFn: userFinanceApi.fetchGoldTransactions,
  select: extractUserTransactionsData,
  ...config
})

export const fetchUserAkahuAccounts = (config = {}) => ({
  queryKey: [dataKeys.FETCH_USER_AKAHU_ACCOUNTS],
  queryFn: userFinanceApi.fetchUserAkahuAccounts,
  select: extractUserAkahuAccountsData,
  retry: false,
  ...config
})
