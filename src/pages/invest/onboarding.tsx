import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'

import { PosthogEvents } from '@constants'
import { ContainedButton } from '@sw-npm-packages/components'
import { USER_STATE_INFO } from '@sw-npm-packages/constants'
import { logger } from '@sw-npm-packages/utils'
import { SliderOne, SliderTwo, SliderThree } from 'components/Invest'
import { navigationPaths } from 'config'
import { setUserState } from 'helpers'
import { emitTrackEvent } from 'helpers/events'
import { navigate } from 'helpers/navigation'

const Onboarding = () => {
  const t = useTranslations('AutoInvestPage')
  const [selectedItem, setSelectedItem] = useState(0)

  useEffect(() => {
    emitTrackEvent(PosthogEvents.FirstInvestOnboardingSliderViewed)
  }, [])

  const onFinish = () => {
    // set onboarding completed
    try {
      setUserState(USER_STATE_INFO.IS_INVEST_ONBOARDING_COMPLETED, true)
    } catch (e) {
      logger.log(
        'Unable to save IS_INVEST_ONBOARDING_COMPLETED to user state',
        e
      )
    } finally {
      navigate(navigationPaths.invest, true)
    }
  }

  const handleNext = () => {
    if (selectedItem < 2) {
      setSelectedItem(selectedItem + 1)
    } else {
      onFinish()
    }
  }

  const handleOnChange = (step: number) => {
    if (step === 0) {
      emitTrackEvent(PosthogEvents.FirstInvestOnboardingSliderViewed)
    } else if (step === 1) {
      emitTrackEvent(PosthogEvents.SecondInvestOnboardingdSliderViewed)
    } else if (step === 2) {
      emitTrackEvent(PosthogEvents.ThirdInvestOnboardingSliderViewed)
    }
    setSelectedItem(step)
  }

  return (
    <div className="flex-col w-full items-center mt-[6vh]">
      <Carousel
        className="flex-col items-start"
        showArrows={false}
        showIndicators={true}
        preventMovementUntilSwipeScrollTolerance
        selectedItem={selectedItem}
        showStatus={false}
        showThumbs={false}
        onChange={handleOnChange}
      >
        <SliderOne />
        <SliderTwo />
        <SliderThree />
      </Carousel>
      <ContainedButton
        className={`${
          selectedItem === 2 ? 'btn-contained-gold' : 'btn-contained-black'
        } fixed left-4 right-4 bottom-8 duration-100`}
        onClick={handleNext}
      >
        {selectedItem === 2 ? t('letsGo') : t('next')}
      </ContainedButton>
    </div>
  )
}

export default Onboarding
