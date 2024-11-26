import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { FlatInput } from '@sw-npm-packages/components'
import { ERRORS } from '@sw-npm-packages/types'
import { Info } from 'components'
import { fetchUserUpiId } from 'config'
import { SecondaryLayout } from 'layouts'
import { handleUpdateUpiId } from 'store/actions/user-finance'
import {
  selectUserBankAccountLoading,
  selectUserOTPErrorMessage
} from 'store/selectors/user-finance'

const BankDetailsIndia = () => {
  const dispatch = useDispatch()
  // const [isOpen, setOpen] = useState(false)
  const [upi, setUpi] = useState('')
  const [error, setError] = useState('')
  const { data } = useQuery(fetchUserUpiId())
  const isBankLoading = useSelector(selectUserBankAccountLoading, shallowEqual)
  const errorMessage = useSelector(selectUserOTPErrorMessage, shallowEqual)
  const { upiId } = data || {}

  useEffect(() => {
    if (upiId) {
      setUpi(upiId)
    }
  }, [upiId])

  useEffect(() => {
    if (errorMessage === ERRORS.INVALID_UPI_ID) {
      setError('Invalid UPI ID')
    }
  }, [errorMessage])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpi(e.target.value)
    setError('')
  }

  // const handleSell = () => {
  //   dispatch(
  //     handleUpdateUpiId({
  //       upi_id: upi
  //     })
  //   )
  //   setOpen(false)
  // }

  const handleSubmit = () => {
    if (/[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/.test(upi)) {
      dispatch(
        handleUpdateUpiId({
          upi_id: upi
        })
      )
    } else {
      setError('Invalid UPI ID')
    }
  }

  return (
    <SecondaryLayout
      title={'Enter UPI ID'}
      subTitle={''}
      footerPrimaryBtnLabel="Continue"
      footerPrimaryBtnOnClick={handleSubmit}
      footerPrimaryBtnDisabled={isBankLoading}
      footerPrimaryBtnLoading={isBankLoading}
    >
      <div className="flex-col mt-20">
        <FlatInput
          placeholder="Type your UPI id"
          inputClassNames="!text-[1.4rem] max-xs:!text-2xl"
          type="text"
          value={upi}
          onChange={handleOnChange}
          error={error}
          isErrorTranslated
        />
        <Info className="mt-10">
          This UPI id will be used to send your withdrawal amount
        </Info>
      </div>
      {/* <CustomModal open={isOpen} onClose={() => setOpen(false)}>
        <div className="flex-col">
          <div className="w-full flex-center">Notice</div>
          <Info className="mt-4">
            If you sell your gold now before 60 days from purchase, you will not
            get your free gift.
            <br />
            <br />
            Your amount will reach your account in 5-7 business days.
          </Info>
          <div className="mt-6 flex-col">
            <OutlinedButton className="btn-outlined-black" onClick={handleSell}>
              Confirm
            </OutlinedButton>

            <ContainedButton
              className="btn-contained-black mt-2"
              onClick={() => setOpen(false)}
            >
              No, Cancel
            </ContainedButton>
          </div>
        </div>
      </CustomModal> */}
    </SecondaryLayout>
  )
}

export { BankDetailsIndia }
