import { IKeyValuePair } from '@sw-npm-packages/types'
import { Dayjs } from '@sw-npm-packages/utils'

export const generateReferralCode = (formData: IKeyValuePair<string>) => {
  const { firstName, lastName, dateOfBirth } = formData
  const dob = Dayjs(dateOfBirth).format('DDMM')
  const first = firstName?.toUpperCase()
  const last = lastName?.toUpperCase()
  const name = first + last
  const code = name?.slice(0, 4) + dob
  return code
}
