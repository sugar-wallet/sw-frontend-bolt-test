import { IKeyValuePair } from '@sw-npm-packages/types'

export const minGoldPurchaseAmount: IKeyValuePair<number> = {
  INR: 50,
  GBP: 1,
  NZD: 1,
  TRY: 20
}

export const minAutoInvestPerMonth: IKeyValuePair<number> = {
  TR: 1000
}
