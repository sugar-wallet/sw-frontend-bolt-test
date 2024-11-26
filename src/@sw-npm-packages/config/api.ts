import { isString } from 'lodash'

import { environments, isGlobalApp } from '@sw-npm-packages/constants'

import { getCountryCode } from './country'
import { regionalEnvironmentsConfig } from './environment'

const NEXT_PUBLIC_SW_API_URL = process.env.NEXT_PUBLIC_SW_API_URL

const API_BASE_URL_SUFFIX = isGlobalApp
  ? 'global.sugarwallet.com'
  : regionalEnvironmentsConfig[getCountryCode() || '']?.['API_BASE_URL_SUFFIX']

export const API_BASE_URL = {
  [environments.DEVELOPMENT]: (version = 'v1') =>
    isString(NEXT_PUBLIC_SW_API_URL)
      ? `${NEXT_PUBLIC_SW_API_URL}/api/${version}`
      : `https://apistage.${API_BASE_URL_SUFFIX}/api/${version}`,
  [environments.STAGING]: (version = 'v1') =>
    `https://apistage.${API_BASE_URL_SUFFIX}/api/${version}`,
  [environments.PRODUCTION]: (version = 'v1') =>
    `https://api.${API_BASE_URL_SUFFIX}/api/${version}`
}
