import jwtDecode, { type JwtPayload } from 'jwt-decode'

import { isEmpty, logger } from '@sw-npm-packages/utils'

export const decodeJWT = (token: string): JwtPayload => {
  return jwtDecode(token)
}

export const getUserIdFromJWT = (accessToken: string | undefined) => {
  try {
    if (!isEmpty(accessToken)) {
      const decodedToken: any = jwtDecode(accessToken!)

      return (decodedToken?.user_id ?? null) as string | undefined
    }

    return undefined
  } catch (error) {
    logger.error('error in getting user id from jwt token :- ', error)
  }
}

export const isJWTValid = (accessToken: string) => {
  try {
    if (!isEmpty(accessToken)) {
      const decodedToken: JwtPayload = decodeJWT(accessToken)

      if (decodedToken?.exp) {
        return Date.now() < decodedToken.exp * 1000
      }
    }

    return false
  } catch (error) {
    logger.error('error in checking jwt token validity :- ', error)
  }
}
