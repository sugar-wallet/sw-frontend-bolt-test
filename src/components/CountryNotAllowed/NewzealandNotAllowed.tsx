import React from 'react'

import { Title } from '@sw-npm-packages/components'
import { LogoAzureImage } from 'assets/images'

const NewzealandNotAllowed = () => {
  // const t = useTranslations('LandingPage')

  return (
    <div className="justify-center flex-col w-full items-center">
      <div className="w-[25%]">
        <LogoAzureImage />
      </div>
      <Title className="text-center text-2xl w-[80%] mt-12">
        Sorry, New Zealand is not supported on this website. Please use our
        Sugar Wallet mobile app.
      </Title>
    </div>
  )

  // return (
  //   <div className="justify-center bg-black flex-col w-full items-center">
  //     <div className="w-[50%]">
  //       <LogoAzureImage />
  //     </div>
  //     <Title className="text-center text-2xl w-[80%] mt-12">
  //       Sorry, New Zealand is not supported on this website. Please use our
  //       SugarWallet mobile app.
  //     </Title>
  //     <div className="bg-white p-10 w-[80%]">hello there</div>
  //     <div className="w-[70%] mt-12">
  //       <div
  //         className="mt-10 justify-center items-center"
  //         onClick={() => openExternalWhatsapp()}
  //       >
  //         <SupportIcon color="white" />
  //         <div className="ml-2 text-white font-normal">{t('contactUs')}</div>
  //       </div>
  //     </div>
  //   </div>
  // )
}

export { NewzealandNotAllowed }
