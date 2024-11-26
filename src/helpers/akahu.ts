import { AkahuClient } from 'akahu'

import { getCountryCode } from '@sw-npm-packages/config'

const appToken = process.env.NEXT_PUBLIC_AKAHU_APP_ID || ''

const akahu = getCountryCode() === 'NZ' ? new AkahuClient({ appToken }) : null

const getAkahuRedirectURI = () => {
  return `${window.location.origin}/akahu`
}

const buildAkahuAuthURL = (state: string) => {
  if (!akahu) return null

  return akahu.auth.buildAuthorizationUrl({
    redirect_uri: getAkahuRedirectURI(),
    state
  })
}

export { getAkahuRedirectURI, buildAkahuAuthURL }
