import { getCountryCode } from '@sw-npm-packages/config'
import {
  CurrencySymbol,
  PAYMENT_FREQUENCY,
  PAYMENT_FREQUENCY_LABEL,
  Unit,
  UnitLabel
} from '@sw-npm-packages/constants'
import { round } from '@sw-npm-packages/utils'

import { formatMoney } from './money'

const getFactor = (frequency: string) => {
  const factor =
    frequency === PAYMENT_FREQUENCY.DAILY
      ? 365
      : frequency === PAYMENT_FREQUENCY.WEEKLY
      ? 52
      : frequency === PAYMENT_FREQUENCY.MONTHLY
      ? 12
      : frequency === PAYMENT_FREQUENCY.FORTNIGHTLY
      ? 26
      : null

  return factor
}

export const computePurchaseGoldQuantity = ({
  purchaseAmount,
  perUnitAmount
}: {
  purchaseAmount: number
  perUnitAmount: number
}): string => {
  const quantity = perUnitAmount > 0 ? purchaseAmount / perUnitAmount : 0
  const countryCode = getCountryCode()
  let factor = quantity < 0.1
  if (countryCode === 'NZ') {
    factor = false // dont show in MG
  }

  if (factor) {
    // show in MG
    return `${round(quantity * 1000, 2)}mg`
  }

  return `${round(quantity, 2)}g`
}

export const computeGoldBalanceForUI = (
  goldUnit: number | string | undefined,
  weightUnit: string | undefined
) => {
  const countryCode = getCountryCode()
  let gFactor = Number(goldUnit) < 1
  let mgFactor = Number(goldUnit) > 1000
  if (countryCode === 'NZ') {
    gFactor = false
    mgFactor = true
  }
  if (weightUnit === Unit.G && gFactor) {
    return {
      goldUnit: round(Number(goldUnit) * 1000, 2),
      weightUnit: Unit.MG
    }
  } else if (weightUnit === Unit.MG && mgFactor) {
    return {
      goldUnit: round(Number(goldUnit) / 1000, 2),
      weightUnit: Unit.G
    }
  }
  return {
    goldUnit,
    weightUnit
  }
}

export const computeGoldBalance = (
  goldUnit: string | number | undefined,
  weightUnit: string | undefined
) => {
  const { goldUnit: goldUnitUI, weightUnit: weightUnitUI } =
    computeGoldBalanceForUI(goldUnit, weightUnit) || {}
  return `${round(
    Number(goldUnitUI),
    weightUnit === Unit.G ? 4 : 2
  )}${weightUnitUI}`
}

export const computeSellGoldValueWithoutCurrency = ({
  goldUnit,
  perUnitAmount
}: {
  goldUnit: number
  perUnitAmount: number
}): number => {
  return perUnitAmount > 0 ? goldUnit * (perUnitAmount / 1000) : 0
}

export const computeSellGoldValueViaAmount = ({
  amount,
  perUnitAmount,
  weightUnitUI
}: {
  amount: number
  perUnitAmount: number
  weightUnitUI: string | undefined
}): number => {
  const unit = round(amount / perUnitAmount, 10)
  if (weightUnitUI && weightUnitUI === Unit.MG) {
    return round(unit * 1000, 2)
  }
  return round(unit, 5)
}

export const computeSellGoldValue = ({
  goldUnit,
  perUnitAmount,
  weightUnitUI = Unit.MG
}: {
  goldUnit: number
  perUnitAmount: number
  weightUnitUI: string
}): string => {
  
  let amount = 0
  if (weightUnitUI === Unit.G) {
    amount = perUnitAmount > 0 ? goldUnit * perUnitAmount : 0
  } else {
    // amount = perUnitAmount > 0 ? goldUnit * (perUnitAmount / 1000) - 1% goldUnit * (perUnitAmount / 1000) : 0
    amount = perUnitAmount > 0 ? goldUnit * (perUnitAmount / 1000) * 0.99 : 0

  }
  return formatMoney(amount)
}

export const computeRemainingGoldUnit = ({
  totalGoldUnit,
  sellGoldUnit,
  weightUnit = Unit.MG
}: {
  totalGoldUnit: number
  sellGoldUnit: number
  weightUnit?: string
}): string => {
  const remainingAmount =
    totalGoldUnit - sellGoldUnit >= 0 ? totalGoldUnit - sellGoldUnit : 0 // converting gram value to mg value
  return computeGoldBalance(remainingAmount, weightUnit)
}

export const computeAutoInvest = ({
  frequency,
  purchaseAmount,
  rateOfInterest = 10,
  numberOfYears = 10
}: {
  frequency: string
  purchaseAmount: number
  rateOfInterest?: number
  numberOfYears?: number
}): {
  amount: string
  frequencyLabel: string
  totalAmount: string
  rateOfInterest: number
  numberOfYears: number
  amountWithInterest: number
  formattedAmountWithInterest: string
} => {
  const factor = getFactor(frequency)

  const amountWithInterest = computeReturn({
    amount: purchaseAmount,
    frequency
  })

  if (factor) {
    return {
      amount: formatMoney(purchaseAmount),
      frequencyLabel: `${PAYMENT_FREQUENCY_LABEL[frequency]}`,
      totalAmount: formatMoney(purchaseAmount * factor * numberOfYears),
      rateOfInterest,
      numberOfYears,
      amountWithInterest,
      formattedAmountWithInterest: formatMoney(amountWithInterest)
    }
  }

  return {
    amount: '',
    frequencyLabel: '',
    totalAmount: '',
    rateOfInterest,
    numberOfYears,
    amountWithInterest: 0,
    formattedAmountWithInterest: ''
  }
}

export const computeReturn = ({
  amount,
  frequency,
  rateOfInterest = 10,
  numOfYears = 10
}: {
  amount: number
  frequency: string
  rateOfInterest?: number
  numOfYears?: number
}) => {
  const factor = getFactor(frequency)

  const p = factor ? amount * factor : 0
  const r = round(rateOfInterest / 100, 2)

  return Math.floor(p * ((Math.pow(1 + r, numOfYears) - 1) / r))
}

export const getUnitLabel = (unit: Unit) => {
  if (unit === Unit.MG) {
    return UnitLabel.MG
  } else if (unit === Unit.G) {
    return UnitLabel.G
  }
}

export const getAutoInvestDefaultFrequency = (currency: CurrencySymbol) => {
  if (currency === CurrencySymbol.INR) {
    return PAYMENT_FREQUENCY.WEEKLY
  } else if (currency === CurrencySymbol.NZD) {
    return PAYMENT_FREQUENCY.WEEKLY
  }
  return PAYMENT_FREQUENCY.DAILY
}
