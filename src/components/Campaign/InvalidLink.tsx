import { useTranslations } from 'next-intl'

import { OutlinedButton, TextButton } from '@sw-npm-packages/components'
import { SupportIcon } from '@sw-npm-packages/icons'
import { LogoImage } from 'assets/images'
import { navigationPaths } from 'config'
import { openExternalWhatsapp } from 'helpers'
import { navigate } from 'helpers/navigation'

const InvalidLink = () => {
  const t = useTranslations('LandingPage')
  const onLoginClick = () => {
    navigate(navigationPaths.login)
  }

  const onSignupClick = () => {
    navigate(navigationPaths.onboarding)
  }

  return (
    <main className="-mx-4 flex-1 bg-black min-h-screen font-lexend font-extrabold">
      <div className="flex-center mt-20 pt-20 max-xs:pt-10">
        {/* <SwIcecreamImage /> */}
        <div className="w-40 my-10">
          <LogoImage />
        </div>
        <div className="w-full justify-center mt-12">
          <div className="py-6  w-[80%] rounded-md flex-col justify-center items-center bg-white text-black">
            <div className="text-lg font-medium ">{t('invalidCode')}</div>
            <div className="text-base font-normal mt-1">
              {t('pleaseCheckTheLink')}
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-12 max-xs:mt-16">
          <OutlinedButton
            primaryColor="white"
            className="w-[50vw] p-2 font-medium"
            onClick={onLoginClick}
          >
            {t('login')}
          </OutlinedButton>
          <TextButton
            className="mt-4 text-white font-medium"
            onClick={onSignupClick}
          >
            {t('signUp')}
          </TextButton>

          <div
            className="mt-10 justify-center items-center"
            onClick={() => openExternalWhatsapp()}
          >
            <SupportIcon color="white" />
            <div className="ml-2 text-white font-normal">{t('contactUs')}</div>
          </div>
        </div>
      </div>
    </main>
  )
}

export { InvalidLink }
