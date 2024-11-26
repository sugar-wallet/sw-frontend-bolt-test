import { getCountryForTimezone } from 'countries-and-timezones'
import countryToCurrency from 'country-to-currency'

import { getCountryCode } from '@sw-npm-packages/config'
import { CurrencySymbol, currencyToSymbol } from '@sw-npm-packages/constants'

export const getCurrencyByTz = (): CurrencySymbol => {
  const countryCode = getCountryCode()
  if (countryCode === 'TR') return CurrencySymbol.TRY
  else if (countryCode === 'NZ') return CurrencySymbol.NZD

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  const timezone = getCountryForTimezone(tz)
  if (timezone?.id) {
    return countryToCurrency[timezone.id] as CurrencySymbol
  }
  return CurrencySymbol.INR
}

export const getCurrencySymbol = (): string => {
  const currencySymbol: string = currencyToSymbol[getCurrencyByTz()]
  return currencySymbol
}
