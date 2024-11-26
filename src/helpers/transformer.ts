import { type AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(timezone)

import { getCountryCode } from '@sw-npm-packages/config'
import {
  CurrencySymbol,
  PAYMENT_FREQUENCY,
  SupportedCurrencySymbols,
  currencyToSymbol,
  DATE_TIME_FORMATS
} from '@sw-npm-packages/constants'
import {
  IGoldPrice,
  IUserBalance,
  IUserGoldSubscription,
  IUserProfileInfo,
  IUserBankAccount,
  IUserGoldSubscriptionResponse,
  IUserReferralsResponse,
  IUserReferrals,
  ILandingPage,
  ILandingPageResponse,
  IUserGifts,
  IUserGiftsResponse,
  IUserTransactionsResponse,
  IUserTransactions,
  TransactionType,
  TransactionStatus,
  IRepublicDayReward,
  IUserReferralsRetrive,
  IUserReferralsRetriveResponse,
  IUserReferralsPredictionRetriveResponse,
  IUserReferralsPredictionRetrive,
  IUserPricingHistoric,
  IUserPricingHistoricResponse
} from '@sw-npm-packages/types'
import {
  isEmpty,
  isNumber,
  round,
  startCase,
  Dayjs,
  getDateString,
  groupBy
} from '@sw-npm-packages/utils'
import { formatMoney } from 'helpers'

const countryCode = getCountryCode()
const noFeeAdjustmentCurrencies = [CurrencySymbol.INR, CurrencySymbol.NZD]

const getModifiedBuySellRate = (
  buyRate: number,
  sellRate: number,
  currency: string
) => {
  if (noFeeAdjustmentCurrencies.includes(currency as CurrencySymbol)) {
    return {
      modifiedBuyRate: buyRate,
      modifiedSellRate: sellRate
    }
  }

  // currently we are adjust 1% fee for all currencies except INR
  return {
    modifiedBuyRate: buyRate + buyRate * 0.01,
    modifiedSellRate: sellRate - sellRate * 0.01
  }
}

export const extractUserProfileInfo = ({
  data
}: AxiosResponse<IUserProfileInfo>) => {
  const {
    id = '',
    first_name: firstName = '',
    last_name: lastName = '',
    gender = '',
    date_of_birth: dateOfBirth = '',
    phone_number: phoneNumber = '',
    email = '',
    company_name: companyName = '',
    language = '',
    currency = '',
    created_at: createdAt,
    updated_at: updatedAt,
    stripe_customer_id: stripeCustomerId = '',
    registration_completed: isRegistrationCompleted = false,
    security_pin_set: isSecurityPinSet = false,
    redirect = false,
    reward_type: rewardType,
    reward_value: rewardValue,
    min_purchase_amount: minCampaignPurchaseAmount,
    gift_value: giftValue,
    gift_days_remaining: giftDaysRemaining,
    show_warning: showWarning,
    is_worldcup_campaign: isWorldcupCampaign,
    worldcup_campaign_reward_amount: worldcupCampaignRewardAmount,
    redirection_page: redirectionPage
  } = data || {}

  return {
    id,
    firstName: startCase(firstName),
    lastName: startCase(lastName),
    name: !isEmpty(firstName) ? `${firstName} ${lastName}` : '',
    gender,
    dateOfBirth,
    phoneNumber,
    email,
    companyName,
    currency,
    createdAt,
    updatedAt,
    language,
    stripeCustomerId,
    isRegistrationCompleted,
    isSecurityPinSet,
    redirect,
    rewardType,
    rewardValue,
    minCampaignPurchaseAmount,
    giftValue,
    giftDaysRemaining,
    showWarning,
    isWorldcupCampaign,
    worldcupCampaignRewardAmount,
    redirectionPage
  }
}

export const extractRepublicDayReward = ({
  data
}: AxiosResponse<IRepublicDayReward>) => {
  const { republic_day_reward = -1, card_scratched = false } = data || {}

  return {
    republicDayReward: republic_day_reward,
    cardScratched: card_scratched
  }
}

export const extractUserBalance = ({ data }: AxiosResponse<IUserBalance>) => {
  const {
    amount = '',
    currency = '',
    unit = '',
    weight_units: weightUnits = '',
    amount_bought = '',
    amount_sold = '',
    sell_price = ''
  } = data || {}

  if (data) {
    localStorage.setItem('amount_bought', amount_bought)
  }

  return {
    amount,
    currency,
    unit,
    weightUnits,
    amount_bought,
    amount_sold,
    sell_price
  }
}

export const extractGoldPrice = ({ data }: AxiosResponse<IGoldPrice>) => {
  const {
    amount = 0,
    buy_rate: buyRate = 0,
    sell_rate: sellRate = 0,
    currency = '',
    unit = '',
    min_purchase_amount: minPurchaseAmount = 1,
    min_sell_amount: minSellAmount = 0,
    per_month_auto_invest_amount: perMonthAutoInvestAmount = 10
  } = data || {}
  const { modifiedBuyRate, modifiedSellRate } = getModifiedBuySellRate(
    buyRate,
    sellRate,
    currency
  )

  const roundedBuyRate = round(modifiedBuyRate, countryCode === 'NZ' ? 4 : 2)
  const roundedSellRate = round(modifiedSellRate, countryCode === 'NZ' ? 4 : 2)

  return {
    amount,
    buyRate: modifiedBuyRate,
    formattedBuyRate: roundedBuyRate,
    formattedBuyRateWithCurrency: formatMoney(roundedBuyRate),
    sellRate: modifiedSellRate,
    formattedSellRate: roundedSellRate,
    formattedSellRateWithCurrency: formatMoney(roundedSellRate),
    currency,
    unit,
    minPurchaseAmount:
      currency?.toUpperCase() === SupportedCurrencySymbols.INR
        ? 10
        : minPurchaseAmount,
    minSellAmount,
    perMonthAutoInvestAmount
  }
}

export const extractUserBankAccount = ({
  data
}: AxiosResponse<IUserBankAccount>) => {
  const {
    // id,
    // full_name,
    // beneficiary_address,
    bank_account_number,
    bank_name
    // branch_code
  } = data || {}

  return {
    iban: bank_account_number,
    accountName: bank_name
  }
}

export const extractUserUpiId = ({
  data
}: AxiosResponse<{ upi_id: string }>) => {
  const { upi_id } = data || {}

  return {
    upiId: upi_id
  }
}

export const extractUserGoldSubscription = ({
  data
}: AxiosResponse<IUserGoldSubscriptionResponse>): IUserGoldSubscription | null => {
  if (isEmpty(data)) return null

  const {
    id,
    first_date,
    amount,
    frequency: interval,
    currency,
    next_billing_date
  } = data || {}

  const frequency = isNumber(interval)
    ? interval === 30
      ? PAYMENT_FREQUENCY.MONTHLY
      : interval === 14
      ? PAYMENT_FREQUENCY.FORTNIGHTLY
      : interval === 7
      ? PAYMENT_FREQUENCY.WEEKLY
      : interval === 1
      ? PAYMENT_FREQUENCY.DAILY
      : null
    : null

  const isFrequencyValid = !isEmpty(frequency)
  const isFirstDateValid = !isEmpty(first_date)

  const money = Number(amount)

  let nextPaymentDate: string | null = null
  if (getCountryCode() === 'NZ' && !isEmpty(next_billing_date)) {
    // In New Zealand subscriptions are processed after and including 3:00pm and strictly before 11:00pm NZST
    // Examples:
    //  - 2021-07-01T10:00:00Z -> 2021-07-01T20:00:00Z+12:00 -> 2021-07-01
    //  - 2021-07-01T16:00:00Z -> 2021-07-02T04:00:00Z+12:00 -> 2021-07-02
    //  - 2021-07-02T11:00:00Z -> 2021-07-02T23:00:00Z+12:00 -> 2021-07-03

    const nextBillingDate = Dayjs(next_billing_date).tz('Pacific/Auckland')
    if (nextBillingDate.hour() >= 23) {
      nextPaymentDate = getDateString(nextBillingDate.add(1, 'day'))
    } else {
      nextPaymentDate = getDateString(nextBillingDate)
    }
  } else if (!isEmpty(first_date) && isFrequencyValid) {
    nextPaymentDate = getDateString(Dayjs(first_date).add(interval, 'days'))
  }

  return {
    id,
    amount: money,
    firstPaymentDate: isFirstDateValid ? first_date : null,
    frequency,
    nextPaymentDate,
    currency: currency?.toLowerCase(),
    amountWithCurrency: `${
      currencyToSymbol[currency?.toUpperCase() as CurrencySymbol]
    }${Number.isInteger(money) ? money : money.toFixed(2)}`
  }
}

export const extractUserReferralsData = ({
  data
}: AxiosResponse<IUserReferralsResponse>): IUserReferrals | null => {
  if (isEmpty(data)) return null

  const {
    my_referral_code,
    my_campaign_code,
    pending_purchase_users,
    complete_referral_users,
    total_reward,
    sharing_url
  } = data || {}

  return {
    myReferralCode: my_referral_code,
    myCampaignCode: my_campaign_code,
    pendingPurchaseUsers: {
      count: pending_purchase_users?.count,
      userList: pending_purchase_users?.user_list
    },
    completeReferralUsers: {
      count: complete_referral_users?.count,
      userList: complete_referral_users?.user_list
    },
    totalReward: total_reward,
    sharingUrl: sharing_url
  }
}
export const extractReferralsRetriveData = ({
  data
}: AxiosResponse<IUserReferralsRetriveResponse>): IUserReferralsRetrive | null => {
  if (isEmpty(data)) return null

  const {
    successful_signed_up_users,
    successful_transacting_users,
    referred_users,
    total_reward
  } = data || {}

  return {
    signedUpUsers: successful_signed_up_users,
    transactingUsers: successful_transacting_users,
    referredUsers: referred_users,
    totalReward: total_reward
  }
}
export const extractReferralsPredictionRetriveData = ({
  data
}: AxiosResponse<IUserReferralsPredictionRetriveResponse>): IUserReferralsPredictionRetrive | null => {
  if (isEmpty(data)) return null

  const { amount } = data || {}

  return {
    amount: amount
  }
}
export const extractPricingHistoricData = ({
  data
}: AxiosResponse<IUserPricingHistoricResponse>): IUserPricingHistoric | null => {
  if (isEmpty(data)) return null

  const { prices } = data || {}

  return {
    prices: prices
  }
}

export const extractLandingPageData = ({
  data
}: AxiosResponse<ILandingPageResponse>): ILandingPage => {
  const { reward_amount, screen_type } = data || {}

  return {
    rewardAmount: reward_amount,
    screenType: screen_type
  }
}

export const extractUserGiftsData = ({
  data
}: AxiosResponse<IUserGiftsResponse>): IUserGifts | null => {
  if (isEmpty(data)) return null

  const { pending, completed } = data || {}

  const total = (pending.total || 0) + (completed.total || 0)

  return {
    total,
    pending,
    completed
  }
}

export const extractUserTransactionsData = ({
  data
}: AxiosResponse<IUserTransactionsResponse[]>): IUserTransactions | null => {
  if (isEmpty(data)) return null
  const resultTemp = data.map((el) => ({
    id: el.id,
    transactionType:
      el.type === 'BG' ? TransactionType.BUY_GOLD : TransactionType.SELL_GOLD,
    transactionStatus:
      el.status === 'V' ? TransactionStatus.SUCCESS : TransactionStatus.FAILED,
    amount: el.amount,
    unit: el.units,
    createdAt: dayjs(el.created_at).format(DATE_TIME_FORMATS.date),
    isSubscription: Boolean(el.subscription)
  }))
  return groupBy(resultTemp, 'createdAt')
}

export const extractUserAkahuAccountsData = ({ data }: AxiosResponse) => {
  if (isEmpty(data)) return null

  return {
    ...data
  }
}
