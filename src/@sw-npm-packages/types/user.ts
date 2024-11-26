export interface IProfileFormData {
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  email?: string
  companyName?: string
  phone?: string
  currency?: string
  language?: string
  referralCode?: string
}

export interface IBankDetailsFormData {
  accountName: string
  iban: string
}
