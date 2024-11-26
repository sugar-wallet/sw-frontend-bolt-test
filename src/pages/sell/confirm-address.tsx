import React from 'react'

import { AddressForm } from 'components'
import { BottomNavigationLayout, PrimaryLayout } from 'layouts'

const SellConfirmAddressPage = () => {
  return (
    <BottomNavigationLayout>
      <PrimaryLayout title="Sell Gold">
        <AddressForm />
      </PrimaryLayout>
    </BottomNavigationLayout>
  )
}

export default SellConfirmAddressPage
