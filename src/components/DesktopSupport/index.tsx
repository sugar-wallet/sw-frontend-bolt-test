import { useTranslations } from 'next-intl'
import React from 'react'

import { Lottie } from '@sw-npm-packages/components'
import { MobileAnimation } from 'assets/lottiefiles'

const DesktopSupport = () => {
  const t = useTranslations('App')

  return (
    <div className="flex-1 flex-col justify-center items-center m-8">
      <div className="w-[300px] h-[300px]">
        <Lottie animationData={MobileAnimation} />
      </div>

      <h4 className="text-center">{t('desktopSupport')}</h4>
    </div>
  )
}

export { DesktopSupport }
