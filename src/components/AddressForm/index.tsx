import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

import { TextInput } from '@sw-npm-packages/components'
import { fetchUserBankAccount } from 'config'
import { validateForm } from 'helpers'
import { SecondaryLayout } from 'layouts'
import { selectSellGoldLoading } from 'store/selectors/user-finance'

import { addressFormConfig } from './config'

interface IAddress {
  street: string
  apartment?: string
  city: string
  country: string
  zip: string
}

const AddressForm = () => {
  // const dispatch = useDispatch()
  const { data } = useQuery(fetchUserBankAccount())
  const [formData, setFormData] = useState<IAddress>({
    street: '',
    apartment: '',
    city: '',
    country: '',
    zip: ''
  })
  const [error, setError] = useState<IAddress>({
    street: '',
    apartment: '',
    city: '',
    country: '',
    zip: ''
  })
  //   const userAddressLoading = useSelector(selectUserAddressLoading, shallowEqual)
  const isSellGoldLoading = useSelector(selectSellGoldLoading, shallowEqual)

  const isAddressLoading = isSellGoldLoading

  useEffect(() => {
    if (data) {
      setFormData(data)
    }
  }, [])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = () => {
    const tempErrors = validateForm<IAddress>(formData, addressFormConfig)
    if (Object.keys(tempErrors).length) {
      setError(tempErrors)
    }
    // dispatch(
    //   handleUserBankAccount({
    //     bank_account_number: formData.iban,
    //     bank_name: formData.accountName
    //   })
    // )
  }
  return (
    <SecondaryLayout
      title="Confirm Address"
      subTitle="Lastly, we need your address"
      subTitleClassName="mt-2"
      footerPrimaryBtnLabel="Continue"
      footerPrimaryBtnOnClick={handleSubmit}
      footerPrimaryBtnDisabled={isAddressLoading}
      footerPrimaryBtnLoading={isAddressLoading}
    >
      <div className="flex-col mt-12 max-xs:mt-6 max-xs:max-h-[40vh] overflow-auto">
        <TextInput
          label="Street Address"
          name="street"
          error={error.street}
          value={formData.street}
          onChange={handleOnChange}
        />
        <TextInput
          containerClassNames="mt-4"
          label="Apartment, Suite, etc."
          name="apartment"
          error={error.apartment}
          value={formData.apartment}
          onChange={handleOnChange}
        />
        <TextInput
          containerClassNames="mt-4"
          label="City"
          name="city"
          error={error.city}
          value={formData.city}
          onChange={handleOnChange}
        />
        <TextInput
          containerClassNames="mt-4"
          label="Country"
          name="country"
          error={error.country}
          value={formData.country}
          onChange={handleOnChange}
        />
        <TextInput
          containerClassNames="mt-4 mb-4"
          label="ZIP / Postcode"
          name="zip"
          error={error.zip}
          value={formData.zip}
          onChange={handleOnChange}
        />
      </div>
    </SecondaryLayout>
  )
}

export { AddressForm }
