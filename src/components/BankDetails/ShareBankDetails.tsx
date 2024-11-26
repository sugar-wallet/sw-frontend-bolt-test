import React, { ChangeEvent, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { Body, ContainedButton, Input } from '@sw-npm-packages/components'
import { ButtonVariant } from '@sw-npm-packages/types'
import { Info } from 'components'
import { openExternalWhatsapp } from 'helpers'
import { openTab } from 'helpers/navigation'
import { SecondaryLayout } from 'layouts'
import { handleSellGold } from 'store/actions/user-finance'
import { selectSellGoldLoading } from 'store/selectors/user-finance'

const ShareBankDetails = () => {
  const dispatch = useDispatch()
  const [isDisabled, setDisabled] = useState(true)
  const isSellGoldLoading = useSelector(selectSellGoldLoading, shallowEqual)

  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked
    if (value) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }

  const openWhatsapp = () => {
    openExternalWhatsapp()
  }

  const openEmail = () => {
    openTab('mailto:hello@sugarwallet.com')
  }

  const handleSell = () => {
    dispatch(handleSellGold())
  }

  return (
    <SecondaryLayout
      title="Please Note!"
      footerPrimaryBtnLabel="Sell Gold"
      footerPrimaryBtnOnClick={handleSell}
      footerPrimaryBtnClassName="btn-outlined-pink"
      footerPrimaryBtnVariant={ButtonVariant.OUTLINED}
      footerPrimaryBtnDisabled={isSellGoldLoading || isDisabled}
      footer={
        <div className="m-4">
          <Input type="checkbox" onChange={onCheckboxChange} />
          <Body className="ml-2 text-sm">
            I have shared my bank account details
          </Body>
        </div>
      }
    >
      <div className="flex-col">
        <Info className="mt-8">
          To facilitate your gold sale process, please provide us your bank
          account details. The withdrawal will be completed within 1-2 working
          days. You can share this information via WhatsApp or email for your
          convenience.
        </Info>
        <ContainedButton
          className="mt-8 btn-contained-pink w-full"
          onClick={openWhatsapp}
        >
          Provide us on whatsapp
        </ContainedButton>

        <ContainedButton
          className="mt-4 btn-contained-pink w-full"
          onClick={openEmail}
        >
          Provide us on email
        </ContainedButton>
      </div>
    </SecondaryLayout>
  )
}

export { ShareBankDetails }
