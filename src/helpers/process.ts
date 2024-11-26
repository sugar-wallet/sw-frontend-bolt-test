import { PAYMENT_TYPES } from '@sw-npm-packages/constants'
import { isEmpty } from '@sw-npm-packages/utils'
import { navigationPaths } from 'config'

import { getAutoInvestGoldData, getBuyGoldData } from './cookie'
import { extractQueryValueFromSearchParams } from './url'

interface IIntermediateStep {
  pathname: string
  search?: string
  userStateCookie?: string
}

export const isBuyGoldIntermediateStep = (pathname: string, search = '') => {
  return (
    pathname === navigationPaths.prePurchaseInfo ||
    (pathname === navigationPaths.payment &&
      extractQueryValueFromSearchParams(search, 'type') ===
        PAYMENT_TYPES.ONE_TIME)
  )
}

export const isAutoInvestIntermediateStep = (pathname: string, search = '') => {
  return (
    pathname === navigationPaths.payment &&
    extractQueryValueFromSearchParams(search, 'type') ===
      PAYMENT_TYPES.SUBSCRIPTION
  )
}

export const isBuyGoldIntermediateStepWithRequiredInfo = ({
  pathname,
  search = '',
  userStateCookie = ''
}: IIntermediateStep) => {
  const isIntermediateStep = isBuyGoldIntermediateStep(pathname, search)
  let havePreRequisiteInfo = false
  let data = {}

  if (isIntermediateStep) {
    data = getBuyGoldData(userStateCookie)
    havePreRequisiteInfo = !isEmpty(data)
  }

  return {
    isIntermediateStep,
    havePreRequisiteInfo,
    data
  }
}

export const isAutoInvestIntermediateStepWithRequiredInfo = ({
  pathname,
  search = '',
  userStateCookie = ''
}: IIntermediateStep) => {
  const isIntermediateStep = isAutoInvestIntermediateStep(pathname, search)
  let havePreRequisiteInfo = false
  let data = {}

  if (isIntermediateStep) {
    data = getAutoInvestGoldData(userStateCookie)
    havePreRequisiteInfo = !isEmpty(data)
  }

  return {
    isIntermediateStep,
    havePreRequisiteInfo,
    data
  }
}
