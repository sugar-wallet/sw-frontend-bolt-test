import { useTranslations } from 'next-intl'
import React from 'react'

import { ContainedButton, Lottie } from '@sw-npm-packages/components'
import { ServerErrorAnimation } from 'assets/lottiefiles'
import { navigationPaths } from 'config'
import { navigate } from 'helpers/navigation'

const ServerError = () => {
  const tc = useTranslations('Common')
  const t = useTranslations('App')

  const onBackToHomeClick = () => {
    navigate(navigationPaths.home)
  }

  return (
    <div className="flex-1 flex-col justify-center items-center m-8">
      <div className="w-[250px] h-[250px]">
        <Lottie animationData={ServerErrorAnimation} />
      </div>

      <h4 className="text-center">{t('unknownError')}</h4>
      <ContainedButton
        onClick={onBackToHomeClick}
        className="btn-fixed-bottom btn-contained-black font-normal"
      >
        {tc('returnHome')}
      </ContainedButton>
    </div>
  )
}

export default ServerError
