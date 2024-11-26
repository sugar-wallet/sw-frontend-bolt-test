export interface IRetrievePaymentCallback {
  success?: boolean
  error?: boolean
  paymentType?: string
  next_payment_date?: string
}
