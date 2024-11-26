import { IKeyValuePair } from '@sw-npm-packages/types'

export const extractQueryValueFromSearchParams = (
  searchParams: string | URLSearchParams,
  queryKey: string
) => {
  const urlParams = new URLSearchParams(searchParams)
  return urlParams.get(queryKey)
}

export const appendQueryParams = (
  url: string,
  queryParams: string[],
  customParams?: IKeyValuePair<string | number>
) => {
  let query = ''
  const searchParams = window.location.search
  queryParams.forEach((param) => {
    if (extractQueryValueFromSearchParams(searchParams, param)) {
      const value = extractQueryValueFromSearchParams(searchParams, param)
      query += `${param}=${value}&`
    }
  })
  if (customParams && Object.keys(customParams).length) {
    for (const _key of Object.keys(customParams)) {
      query += `${_key}=${customParams[_key]}&`
    }
  }
  const updatedQuery = query.slice(0, -1)
  return `${url}?${updatedQuery}`
}

export const toQueryParams = (object: Record<string, string>) => {
  return new URLSearchParams(object).toString()
}
