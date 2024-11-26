import { IKeyValuePair } from '@sw-npm-packages/types'
const errorConstants: IKeyValuePair<string | boolean> = {
  INVALID_OTP: 'invalidCode',
  OTP_EXPIRED: 'otpExpired',
  OTP_ALREADY_VERIFIED: 'otpAlreadyVerified',
  INVALID_OTP_ORDER_ID: 'invalidOtpOrderId',
  INVALID_SECRETS: 'invalidSecrets',
  UNKNOWN_OTP_ERROR: 'unknownOtpError',
  VALIDATION_ERROR: 'validationError',
  INVALID_SECURITY_PIN: 'invalidPin',

  NOT_FOUND: 'notFound',
  STRIPE_ERROR: 'stripeError',
  NOT_ENOUGH_GOLD: 'notEnoughGold',
  FAILED_TO_SEND_OTP: 'failedToSendOtp',
  USER_NOT_FOUND: 'userNotFound',
  USER_HAS_NO_SECURITY_PIN: 'userHasNoSecurityPin',
  USER_HAS_NO_EMAIL_OR_PHONE_NUMBER: 'userHasNoEmailOrPhoneNumber',
  '': 'somethingWentWrong'
}

export { errorConstants }
