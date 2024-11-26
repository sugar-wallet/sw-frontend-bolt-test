import { getCountryCode } from '@sw-npm-packages/config'
import { IKeyValuePair } from '@sw-npm-packages/types'

export const excludedCountryWebsiteMapping: IKeyValuePair<string> = {
  TR: 'https://app.sugarwallet.com.tr',
  NZ: 'https://app.sugarwallet.co.nz'
}

export const excludedCountryList = Object.keys(excludedCountryWebsiteMapping)
export const userCountry = getCountryCode()

export const isGlobalUser = !excludedCountryList.includes(userCountry) && false
