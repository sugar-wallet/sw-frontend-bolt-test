import { getCountryCode } from '@sw-npm-packages/config'

enum Locales {
  tr = 'tr',
  en = 'en'
}

export const getLanguageByTz = (): Locales => {
  const countryCode = getCountryCode()
  if (countryCode === 'TR') return Locales.tr
  else if (countryCode === 'NZ') return Locales.en
  else return Locales.en

  // const tz = Intl.DateTimeFormat().resolvedOptions().timeZone

  // const langTz: IKeyValuePair<Locales> = {
  //   'Europe/Istanbul': Locales.tr,

  //   // more broader
  //   EET: Locales.tr // eastern european timezone
  // }

  // if (Object.prototype.hasOwnProperty.call(langTz, tz)) {
  //   return langTz[tz]
  // }
  // return Locales.en
}
