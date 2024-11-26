import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import {
  ContainedButton,
  FullScreenLoader,
  Title
} from '@sw-npm-packages/components'
import { LogoAzureImage } from 'assets/images'
import { navigationPaths } from 'config'
import { PrimaryLayout } from 'layouts'
import { handleVerifyOtp } from 'store/actions/auth'

const OtpLessPage = () => {
  const dispatch = useDispatch()
  const [whatsappUrl, setWhatsappUrl] = React.useState(
    'https://wa.me/+911141169439'
  )
  const t = useTranslations('PhoneInputPage')
  const router = useRouter()
  const { code, redirect } = router.query

  useEffect(() => {
    if (code) {
      dispatch(
        handleVerifyOtp({
          otp: code.toString(),
          isOtpless: false
        })
      )
    }
  }, [code])

  useEffect(() => {
    if (redirect && redirect.includes('https://wa.me/')) {
      setWhatsappUrl(redirect.toString())
      router.push(navigationPaths.otpless, undefined, { shallow: true })
    }
  }, [redirect])

  const openWhatsapp = () => {
    window.open(whatsappUrl)
  }

  if (code) return <FullScreenLoader />

  return (
    <PrimaryLayout hideSupportIcon>
      <div className="justify-center flex-col w-full items-center">
        <div className="w-[25%]">
          <LogoAzureImage />
        </div>
        <Title className="text-center text-2xl w-[80%] mt-12">
          {t('approveYourLogin')}
        </Title>
        <div className="w-[70%] mt-12">
          <ContainedButton
            className="btn-contained-wa-green mt-2"
            onClick={openWhatsapp}
          >
            {t('openWhatsapp')}
          </ContainedButton>
        </div>
      </div>
    </PrimaryLayout>
  )
}

export default OtpLessPage
