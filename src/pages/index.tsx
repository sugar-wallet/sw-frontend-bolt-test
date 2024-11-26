import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { navigationPaths } from 'config'
import { appendQueryParams } from 'helpers'
import { navigate } from 'helpers/navigation'

import OnboardingPage from './onboarding'

export default function Home() {
  const router = useRouter()
  const { referralCode } = router.query

  useEffect(() => {
    // exception for apollo
    if (
      referralCode &&
      ['apollo', 'cafemvp'].includes(referralCode.toString().toLowerCase())
    ) {
      navigate(
        appendQueryParams(navigationPaths.landingPage, [], {
          campaignCode: referralCode.toString()
        })
      )
    }
  }, [referralCode])

  return <OnboardingPage />

  // const onLoginClick = () => {
  //   navigate(navigationPaths.login)
  // }

  // const onSignupClick = () => {
  //   navigate(navigationPaths.onboarding)
  // }

  // return (
  //   <main className="-mx-4 flex-1 bg-crayola min-h-screen font-lexend font-extrabold">
  //     <div className="flex-center mt-20 pt-20 max-xs:pt-10">
  //       <SwIcecreamImage />
  //       <div className="w-52 mt-6">
  //         <LogoImage />
  //       </div>
  //       <div className="flex flex-col mt-24 max-xs:mt-16">
  //         <OutlinedButton
  //           primaryColor="white"
  //           className="w-[50vw] p-2 font-medium"
  //           onClick={onLoginClick}
  //         >
  //           {t('login')}
  //         </OutlinedButton>
  //         <TextButton
  //           className="mt-4 text-white font-medium"
  //           onClick={onSignupClick}
  //         >
  //           {t('signUp')}
  //         </TextButton>
  //       </div>
  //     </div>
  //   </main>
  // )
}
