import { useTranslations } from 'next-intl'
import React from 'react'

import { ContainedButton, Lottie } from '@sw-npm-packages/components'
import { ErrorAnimation } from 'assets/lottiefiles'
import { navigationPaths } from 'config'
import { navigate } from 'helpers/navigation'

interface IErrorBoundaryProps {
  error: Error
  resetErrorBoundary: () => void
}

const ErrorBoundary = ({ resetErrorBoundary }: IErrorBoundaryProps) => {
  const t = useTranslations('App')
  const tc = useTranslations('Common')

  const onBackToHomeClick = () => {
    navigate(navigationPaths.home)
    resetErrorBoundary()
  }

  return (
    <div className="flex-1 flex-col justify-center items-center m-8">
      <div className="w-[250px] h-[250px]">
        <Lottie animationData={ErrorAnimation} />
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

export { ErrorBoundary }
