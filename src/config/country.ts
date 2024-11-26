import { type Country, getCountries } from 'react-phone-number-input'

import { excludedCountryList, isGlobalUser, userCountry } from 'helpers'

const allCountries = getCountries()
const CountryList: Country[] = isGlobalUser
  ? allCountries.filter((country) => !excludedCountryList.includes(country))
  : [userCountry as Country]

export const defaultCountryCode: Country = (userCountry as Country) || 'IN'
export const countries: Country[] = CountryList

export const multiLoginCountries = ['NZ']
