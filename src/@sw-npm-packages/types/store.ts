import { type StripeElements } from '@stripe/stripe-js'

import { IRetrievePaymentCallback } from '.'

export interface IBuyGoldData {
  amount: number
  amountWithCurrency: string
  quantity: string
  unit: string
  perUnitBuyPrice: number
  currency: string
  isCampaignMode?: boolean
  account_id?: string
}

export interface IAutoInvestGoldData {
  amount: number
  amountWithCurrency: string
  frequency: string
  start_date: string
  currency: string
  account_id?: string
}

export interface ISellGoldData {
  quantity: number
  unit: string
  perUnitSellPrice: number
  account_id?: string
}

export interface IPaymentIntentCallback {
  success: boolean
  code: string
  vendor: string
}

export interface IPaymentStartDateIntent {
  startDate?: string
}

export interface IAkahuTokenState {
  code?: string
  state: string
  error?: string
}

export interface IConfirmPayment {
  elements: StripeElements | null
  isCampaignMode?: boolean
}

export interface IRetrievePayment {
  pgVendor: string
  paymentId?: string
  clientSecret?: string
  callback: (data: IRetrievePaymentCallback) => void
}
