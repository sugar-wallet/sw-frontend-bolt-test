import { useTranslations } from 'next-intl'
import React, { ChangeEvent, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { ContainedButton, FlatInput } from '@sw-npm-packages/components'
import { validateForm } from 'helpers'
import { handleUserInfo } from 'store/actions/user-finance'
import { selectIsUserInfoLoading } from 'store/selectors/user-finance'

import {
  ITaxIdFormData,
  taxIdFormValidationConfig,
  taxIdInitialFormData
} from './config'

const TaxIdComponent = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState<ITaxIdFormData>(taxIdInitialFormData)
  const [error, setError] = useState<ITaxIdFormData>(taxIdInitialFormData)
  const isSubmitting = useSelector(selectIsUserInfoLoading, shallowEqual)
  const t = useTranslations('TaxPage')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue: string = event.target.value
    setFormData({
      taxId: newValue
    })
    setError({
      taxId: ''
    })
  }

  const handleSubmit = () => {
    const { isValidated, errors } = validateForm(
      formData,
      taxIdFormValidationConfig
    )
    if (isValidated) {
      const { taxId } = formData
      dispatch(
        handleUserInfo({
          tax_id: taxId
        })
      )
    } else {
      setError(errors)
    }
  }

  return (
    <div className="flex-col flex-1 py-4 justify-between">
      <h3 className="onboarding-title mt-6 font-medium">{t('title')}</h3>
      <div className="flex-1 justify-center items-center">
        <FlatInput
          type="number"
          autoFocus
          value={formData.taxId}
          error={error.taxId}
          onChange={handleChange}
          placeholder={t('taxPlaceholder')}
        />
      </div>
      <div>
        <ContainedButton
          disabled={isSubmitting}
          isLoading={isSubmitting}
          onClick={handleSubmit}
          className="btn-contained-pink font-normal"
        >
          {t('continue')}
        </ContainedButton>
      </div>
    </div>
  )
}

export { TaxIdComponent }
