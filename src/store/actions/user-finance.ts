import {
  IAkahuTokenState,
  IAutoInvestGoldData,
  IBuyGoldData,
  IKeyValuePair,
  ISellGoldData
} from '@sw-npm-packages/types'

import * as types from '../types/user-finance'

export const updateBuyGoldData = (
  value: IBuyGoldData | Record<string, never>
) => ({
  type: types.UPDATE_BUY_GOLD_DATA,
  value
})

export const updateAutoInvestGoldData = (
  value: IAutoInvestGoldData | Record<string, never>
) => ({
  type: types.UPDATE_AUTO_INVEST_GOLD_DATA,
  value
})

export const updateSellGoldData = (value: ISellGoldData) => ({
  type: types.UPDATE_SELL_GOLD_DATA,
  value
})

export const updateUserFinanceStatus = (
  key: string,
  value: string | IKeyValuePair<string | boolean | null>
) => ({
  type: types.UPDATE_USER_FINANCE_STATUS,
  key,
  value
})

export const handleBuyGold = () => ({
  type: types.HANDLE_BUY_GOLD
})

export const handleAutoInvestGold = () => ({
  type: types.HANDLE_AUTO_INVEST_GOLD
})

export const handleCancelAutoInvestGold = () => ({
  type: types.HANDLE_CANCEL_AUTO_INVEST_GOLD
})

export const handleSellGold = () => ({
  type: types.HANDLE_SELL_GOLD
})

export const handleUserInfo = (
  value: IKeyValuePair<string | boolean | null>
) => ({
  type: types.HANDLE_USER_INFO,
  value
})

export const handleUserBankAccount = (
  value: IKeyValuePair<string | boolean | null>
) => ({
  type: types.HANDLE_USER_BANK_ACCOUNT,
  value
})

export const handleUpdateUpiId = (
  value: IKeyValuePair<string | boolean | null>
) => ({
  type: types.HANDLE_USER_UPI_ID,
  value
})

export const handleAkahuUserTokenRegistration = (forceConnect = false) => ({
  type: types.HANDLE_AKAHU_USER_TOKEN_REGISTRATION,
  forceConnect
})

export const handleAkahuUserTokenExchange = (data: IAkahuTokenState) => ({
  type: types.HANDLE_AKAHU_USER_TOKEN_EXCHANGE,
  data
})

export const resetUserFinanceState = () => ({
  type: types.RESET_USER_FINANCE_STATE
})
