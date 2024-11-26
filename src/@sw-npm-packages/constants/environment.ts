import { IKeyValuePair } from '@sw-npm-packages/types'

export const isGlobalApp =
  process.env.NEXT_PUBLIC_IS_GLOBAL?.toLowerCase() === 'true'

export const environments: IKeyValuePair<string> = {
  DEVELOPMENT: 'DEVELOPMENT',
  STAGING: 'STAGING',
  PRODUCTION: 'PRODUCTION'
}

export const environment = process.env.NEXT_PUBLIC_ENV
  ? process.env.NEXT_PUBLIC_ENV
  : process.env.NODE_ENV

export const isDevelopment =
  environment?.toLowerCase()?.trim() === 'development'
export const isStaging = environment?.toLowerCase()?.trim() === 'staging'
export const isProduction = environment?.toLowerCase()?.trim() === 'production'
