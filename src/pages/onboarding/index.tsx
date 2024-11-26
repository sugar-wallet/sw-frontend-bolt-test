/* eslint-disable @typescript-eslint/no-empty-function */
import { LoginSliders } from 'components'
import { navigationPaths } from 'config'
import { appendQueryParams } from 'helpers'
import { navigate } from 'helpers/navigation'
export enum OnboardingStates {
  LOGIN_SCREEN,
  FIRST_SLIDER,
  SECOND_SLIDER,
  THIRD_SLIDER
}

export default function OnboardingPage() {
  const redirectToLogin = () => {
    navigate(
      appendQueryParams(navigationPaths.login, [
        'campaignCode',
        'referralCode',
        'worldcupTeam',
        'retargetCode'
      ])
    )
  }
  return (
    <div className="flex-1">
      <LoginSliders onFinish={redirectToLogin} />
    </div>
  )
}
