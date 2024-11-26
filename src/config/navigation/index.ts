import {
  HomeIcon,
  AutoInvestIcon,
  SellIcon,
  TransactionsIcon,
  BuyIcon
} from '@sw-npm-packages/icons'

export const publicNavigationPaths = {
  root: '/',
  login: '/login',
  otpless: '/otpless',
  onboarding: '/onboarding',
  landingPage: '/landingpage',
  error: '/error',

  // campaign
  campaignEmployer: '/campaign/employer',
  campaignStore: '/campaign/store',
  campaignWorldCup: '/campaign/worldcup',
  campaignXMas: '/campaign/xmas',
  campaignNYE: '/campaign/nye',
  campaignInvalidLink: '/campaign/invalid-link',
  campaignExpired: '/campaign/expired',
  campaignReferral: '/campaign/referral'
}

export const privateNavigationPaths = {
  home: '/home',
  buy: '/buy',
  prePurchaseInfo: '/buy/pre-purchase-info',
  payment: '/payment',
  paymentAkahu: '/payment/akahu',
  paymentResponse: '/payment-response',
  investOnboarding: '/invest/onboarding',
  investTnC: '/invest/terms-and-conditions',
  invest: '/invest',
  adjustDate: '/invest/adjust-date',
  sell: '/sell',
  sellConfirm: '/sell/confirm',
  createSecurityPin: '/sell/create-security-pin',
  verifySecurityOTP: '/sell/security-pin-verify',
  enterSecurityPin: '/sell/enter-security-pin',
  sellBankDetails: '/sell/bank-details',
  sellAkahu: '/sell/akahu',
  sellAddressDetails: '/sell/confirm-address',
  sellTransactionSuccess: '/sell/transaction-success',
  transactions: '/transactions',
  profile: '/profile',
  myGold: '/mygold',
  signup: '/signup',
  taxId: '/tax-id',
  verification: '/verification',
  refer: '/refer',
  priceHistory:'/price-history',
  referCampaign: '/refer/campaign',
  rewards: '/rewards',
  // campaign
  campaignEmployerWelcome: '/campaign/employer-welcome',
  campaignStoreWelcome: '/campaign/store-welcome',
  campaignStorePlay: '/campaign/store-play',
  campaignReward: '/campaign/campaign-reward',
  republicDay: '/republic-day'
}

export const navigationPaths = {
  ...publicNavigationPaths,
  ...privateNavigationPaths
}

export const bottomNavigationConfig = [
  {
    path: privateNavigationPaths.home,
    label: 'home',
    icon: HomeIcon
  },
  {
    path: privateNavigationPaths.buy,
    label: 'buy',
    icon: BuyIcon
  },
  {
    path: privateNavigationPaths.invest,
    label: 'invest',
    icon: AutoInvestIcon
  },
  {
    path: privateNavigationPaths.transactions,
    label: 'transactions',
    icon: TransactionsIcon
  },
  {
    path: privateNavigationPaths.sell,
    label: 'sell',
    icon: SellIcon
  }
]
