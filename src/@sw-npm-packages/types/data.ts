import { IKeyValuePair } from '.'

import { LOGIN_METHODS } from './login'

export interface IEventData {
  refetch?: boolean
  isFirstTimeFetch?: boolean
}

export interface IAnalyticsEventData {
  eventName?: string
  data?: IKeyValuePair<string | boolean | number>
}

export interface IEvent {
  type: string
  data: IEventData
}

export interface IAnalyticsEvent {
  type: string
  data: IAnalyticsEventData
}

export interface IUserProfileInfo {
  id: string
  first_name: string
  last_name: string
  gender: string
  date_of_birth: string
  phone_number: string
  email?: string
  company_name?: string
  currency: string
  created_at: string
  updated_at: string
  stripe_customer_id: string
  language: string
  registration_completed: boolean
  security_pin_set: boolean
  redirect: boolean
  reward_type: string
  reward_value: number
  min_purchase_amount: number
  gift_value: number
  gift_days_remaining: string
  show_warning: boolean
  is_worldcup_campaign: boolean
  worldcup_campaign_reward_amount: number
  redirection_page: string
}

export interface IUserBalance {
  amount: string
  currency: string
  unit: string
  weight_units: string
  amount_bought: string
  amount_sold: string
  sell_price: string
}

export interface IRepublicDayReward {
  republic_day_reward: number
  card_scratched: boolean
}

export interface IGoldPrice {
  amount: number
  buy_rate: number
  sell_rate: number
  currency: string
  unit: string
  min_purchase_amount: number
  min_sell_amount: number
  per_month_auto_invest_amount: number
}

export interface IUserBankAccount {
  id: string
  full_name: string
  beneficiary_address: string
  bank_account_number: string
  bank_name: string
  branch_code: string
}

export interface IUserGoldSubscriptionResponse {
  id: string
  first_date: string
  amount: string
  frequency: number
  currency: string
  next_billing_date: string
}

export interface IUserGoldSubscription {
  id: string
  amount: number
  firstPaymentDate: string | null
  frequency: string | null
  nextPaymentDate: string | null
  currency: string
  amountWithCurrency: string
}

export interface IUserReferralsResponse {
  my_referral_code: string
  my_campaign_code: string
  sharing_url: string
  pending_purchase_users: {
    count: number
    user_list: {
      id: string
      name: string
      reward: number
    }[]
  }
  complete_referral_users: {
    count: number
    user_list: {
      id: string
      name: string
      reward: number
    }[]
  }
  total_reward: number
}

export interface IUserReferrals {
  myReferralCode: string
  myCampaignCode: string
  sharingUrl: string
  pendingPurchaseUsers: {
    count: number
    userList: {
      id: string
      name: string
      reward: number
    }[]
  }
  completeReferralUsers: {
    count: number
    userList: {
      id: string
      name: string
      reward: number
    }[]
  }
  totalReward: number
}

interface IUserRetrive {
  first_name: string
  last_name: string
  reward_for_referral: number
}

export interface IUserReferralsRetriveResponse {
  successful_signed_up_users: number
  successful_transacting_users: number
  referred_users: IUserRetrive[]
  // referred_users: [
  //   {
  //     first_name: string,
  //     last_name: string,
  //     reward_for_referral: number
  //   }
  // ],
  total_reward: number
}
export interface IUserReferralsRetrive {
  signedUpUsers: number
  transactingUsers: number
  referredUsers: IUserRetrive[]
  // referredUsers: [
  //   {
  //     firstName: string,
  //     lastName: string,
  //     rewardForReferral: number
  //   }
  // ],
  totalReward: number
}
export interface IUserReferralsPredictionRetriveResponse {
  amount: number
}
export interface IUserReferralsPredictionRetrive {
  amount: number
}

interface IUserPricingHistory {
  sell_price: string
  created_at: string
}

export interface IUserPricingHistoricResponse {
  prices: IUserPricingHistory[]
}
export interface IUserPricingHistoric {
  prices: IUserPricingHistory[]
}

export interface ILandingPageResponse {
  reward_amount: number
  screen_type: string
}

export interface ILandingPage {
  rewardAmount: number
  screenType: string
}

interface IGift {
  type: string
  data: {
    value: number
    credit_date: string
    reason: string
    message: string
  }
}

export interface IUserGiftsResponse {
  pending: {
    total: number
    data: IGift[]
  }
  completed: {
    total: number
    data: IGift[]
  }
}

export interface IUserGifts extends IUserGiftsResponse {
  total: number
}

export interface IUserTransactionsResponse {
  id: string
  type: string
  notes: string
  amount: number
  units: number
  status: string
  stripe_order_id: string
  created_at: string
  updated_at: string | null
  user: string
  subscription: string | null
}

export interface IUserTransactions {
  [key: string]: ITransactionItem[]
}

export enum TransactionType {
  BUY_GOLD = 'BUY_GOLD',
  SELL_GOLD = 'SELL_GOLD'
}

export enum TransactionStatus {
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING',
  FAILED = 'FAILED'
}

export interface ITransactionItem {
  id: string
  amount: number
  unit: number
  isSubscription: boolean
  transactionType: TransactionType
  transactionStatus: TransactionStatus
  createdAt: string
}

export interface ISendOtpPayload {
  type: LOGIN_METHODS
  campaignCode?: string | null
  referralCode?: string | null
  retargetCode?: string | null
  isOtpless?: boolean
  dryRun?: boolean
}
