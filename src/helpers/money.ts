import accounting from 'accounting'

import { getCountryCode } from '@sw-npm-packages/config'
import { CurrencySymbol, currencyToSymbol } from '@sw-npm-packages/constants'

import { getCurrencySymbol } from './country'

const currencySymbol = getCurrencySymbol()
const countryCode = getCountryCode()

// configure setting
accounting.settings = {
  currency: {
    symbol: currencySymbol,
    format: '%s%v', // controls output: %s = symbol, %v = value/number (can be object: see below)
    decimal: '.', // decimal point separator
    thousand: ',', // thousands separator
    precision: 2 // decimal places
  },
  number: {
    precision: 0, // default precision on numbers is 0
    thousand: ',',
    decimal: '.'
  }
}

export const configureCurrency = (currency: string) => {
  accounting.settings.currency.symbol =
    currencyToSymbol[currency as CurrencySymbol]
}

export const formatMoney = (money: number, config = {}) => {
  if (countryCode === 'NZ') {
    config.precision = 2
  }
  if (Number.isInteger(money)) {
    config.precision = 0
  }

  return accounting.formatMoney(money, config)
}
