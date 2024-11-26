import React from 'react'

import { ContainedButton, Title } from '@sw-npm-packages/components'
import { LogoAzureImage } from 'assets/images'
import { excludedCountryWebsiteMapping, userCountry } from 'helpers'
import { openTab } from 'helpers/navigation'

const GenericCountryNotAllowed = ({
  isGlobal = false
}: {
  isGlobal?: boolean
}) => {
  const redirectToNativePage = () => {
    if (isGlobal) {
      openTab('https://app.sugarwallet.com', '_self')
    } else {
      openTab(excludedCountryWebsiteMapping[userCountry], '_self')
    }
  }
  return (
    <div className="justify-center flex-col w-full items-center">
      <div className="w-[25%]">
        <LogoAzureImage />
      </div>
      <Title className="text-center text-2xl w-[80%] mt-12">
        Sorry, your country is not supported on this website
      </Title>
      <div className="w-[70%] mt-12">
        <ContainedButton
          className="btn-contained-black"
          onClick={redirectToNativePage}
        >
          Redirect Me
        </ContainedButton>
      </div>
    </div>
  )
}

export { GenericCountryNotAllowed }
