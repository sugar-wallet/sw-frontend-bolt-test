import { getCountryForTimezone } from 'countries-and-timezones'

import { isDevelopment } from '@sw-npm-packages/constants'
import { isEmpty } from '@sw-npm-packages/utils'

const nextPublicCountryCode = process.env.NEXT_PUBLIC_COUNTRY_CODE

const countryWebsiteTLD = {
  TR: '.com.tr',
  NZ: '.co.nz'
}

export const getCountryCode = (): string => {
  /**
   * this check is for server computation on production build
   * mainly for api base url logic
   */
  if (
    !isDevelopment &&
    typeof window === 'undefined' &&
    !isEmpty(process.env.COUNTRY_CODE)
  ) {
    return process.env.COUNTRY_CODE as string
  }

  if (isDevelopment && nextPublicCountryCode) {
    return nextPublicCountryCode
  }

  if (typeof window !== 'undefined') {
    const url = window.location.origin
    if (url.endsWith(countryWebsiteTLD.NZ)) {
      return 'NZ'
    } else if (url.endsWith(countryWebsiteTLD.TR)) {
      return 'TR'
    }
  }

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  const timezone = getCountryForTimezone(tz)
  return timezone?.id?.toUpperCase() || ''
}
