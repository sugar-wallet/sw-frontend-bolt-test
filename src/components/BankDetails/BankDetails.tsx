import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { TextInput } from '@sw-npm-packages/components'
import { IBankDetailsFormData } from '@sw-npm-packages/types/user'
import { Info } from 'components'
import { fetchUserBankAccount } from 'config'
import { validateForm } from 'helpers'
import { SecondaryLayout } from 'layouts'
import { handleUserBankAccount } from 'store/actions/user-finance'
import {
  selectSellGoldLoading,
  selectUserBankAccountLoading
} from 'store/selectors/user-finance'

import { bankDetailsFormConfig, initialBankDetailsFormData } from './config'

const BankDetails = () => {
  const t = useTranslations('SellBankDetailsPage')
  const dispatch = useDispatch()
  const { data } = useQuery(fetchUserBankAccount())
  const [formData, setFormData] = useState<IBankDetailsFormData>(
    initialBankDetailsFormData
  )
  const [error, setError] = useState<IBankDetailsFormData>(
    initialBankDetailsFormData
  )
  const isBankAccountLoading = useSelector(
    selectUserBankAccountLoading,
    shallowEqual
  )
  const isSellGoldLoading = useSelector(selectSellGoldLoading, shallowEqual)

  const isBankLoading = isBankAccountLoading || isSellGoldLoading

  useEffect(() => {
    if (data?.iban && data?.accountName) {
      setFormData(data)
    }
  }, [data])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const handleOnBlur = () => {
    if (error.accountName || error.iban) {
      const { errors } = validateForm<IBankDetailsFormData>(
        formData,
        bankDetailsFormConfig
      )
      setError(errors)
    }
  }
  const handleSubmit = () => {
    const { isValidated, errors } = validateForm<IBankDetailsFormData>(
      formData,
      bankDetailsFormConfig
    )
    if (isValidated) {
      dispatch(
        handleUserBankAccount({
          bank_account_number: formData.iban,
          bank_name: formData.accountName
        })
      )
    } else {
      setError(errors)
    }
  }

  return (
    <SecondaryLayout
      title={t('title')}
      subTitle={t('subTitle')}
      footerPrimaryBtnLabel={t('continue')}
      footerPrimaryBtnOnClick={handleSubmit}
      footerPrimaryBtnDisabled={isBankLoading}
      footerPrimaryBtnLoading={isBankLoading}
    >
      <div className="flex-col mt-8">
        <TextInput
          label={t('accountName')}
          name="accountName"
          onBlur={handleOnBlur}
          error={error.accountName}
          value={formData.accountName}
          onChange={handleOnChange}
        />
        <TextInput
          containerClassNames="mt-4"
          label={t('iban')}
          name="iban"
          error={error.iban}
          onBlur={handleOnBlur}
          value={formData.iban}
          onChange={handleOnChange}
        />
        <Info className="mt-8">{t('pleaseNote')}</Info>
      </div>
    </SecondaryLayout>
  )
}

export { BankDetails }
