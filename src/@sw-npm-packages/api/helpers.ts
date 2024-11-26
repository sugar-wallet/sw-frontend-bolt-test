import { API_BASE_URL } from '@sw-npm-packages/config'
import { isEmpty, isFunction } from '@sw-npm-packages/utils'

const getApiURL = (environment: string, version?: string) => {
  if (isEmpty(environment)) {
    throw new Error('environment is missing')
  }

  const urlValue = API_BASE_URL[environment?.toUpperCase()]
  const url = isFunction(urlValue) ? urlValue(version) : urlValue

  return url
}

export { getApiURL }
