import { REQUEST_RESPONSE_STATUS } from '@sw-npm-packages/constants'

import { IInitialState } from '../reducers/user-finance'

interface IState {
  userFinance: IInitialState
}

export const selectBuyGoldData = (state: IState) =>
  state.userFinance.buyGoldData

export const selectAutoInvestGoldData = (state: IState) =>
  state.userFinance.autoInvestGoldData

export const selectCancelInvestGoldStatus = (state: IState) =>
  state.userFinance.cancelInvestGoldStatus

export const selectSellGoldData = (state: IState) =>
  state.userFinance.sellGoldData

export const selectUserInfoStatus = (state: IState) =>
  state.userFinance.userInfoStatus

// export const selectUserAddressLoading = (state: IState): boolean =>
//   state.userFinance.userAddressStatus.status ===
//   REQUEST_RESPONSE_STATUS.PROCESSING

export const selectUserBankAccountLoading = (state: IState): boolean =>
  state.userFinance.userBankAccountStatus.status ===
  REQUEST_RESPONSE_STATUS.PROCESSING

export const selectSellGoldLoading = (state: IState): boolean =>
  state.userFinance.sellGoldStatus.status === REQUEST_RESPONSE_STATUS.PROCESSING

export const selectIsUserInfoLoading = (state: IState): boolean =>
  state.userFinance.userInfoStatus.status === REQUEST_RESPONSE_STATUS.PROCESSING

export const selectUserOTPErrorMessage = (state: IState): string | undefined =>
  state.userFinance?.userBankAccountStatus?.status ===
  REQUEST_RESPONSE_STATUS.ERROR
    ? state.userFinance.userBankAccountStatus.errorMessage
    : ''
