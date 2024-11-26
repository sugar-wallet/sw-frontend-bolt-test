import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'

import { PosthogEvents } from '@constants'
import { ContainedButton } from '@sw-npm-packages/components'
import { emitTrackEvent } from 'helpers/events'

import SliderOne from './SliderOne'
import SliderOneReferral from './SliderOneReferral'
import SliderTwo from './SliderTwo'
import SliderTwoReferral from './SliderTwoReferral'

const LoginSliders = ({ onFinish }: { onFinish: () => void }) => {
  const [selectedItem, setSelectedItem] = useState(0)
  const t = useTranslations('OnboardingPage')
  const router = useRouter()
  const { referralCode, campaignCode } = router.query
  const isReferralCodeUsed = referralCode || campaignCode

  useEffect(() => {
    emitTrackEvent(PosthogEvents.FirstSliderViewed)
  }, [])

  const handleNext = () => {
    const SLIDER_INDEX = 1
    if (selectedItem < SLIDER_INDEX) {
      setSelectedItem(selectedItem + 1)
    } else {
      onFinish()
    }
  }

  const handleOnChange = (step: number) => {
    setSelectedItem(step)
    if (step === 0) {
      emitTrackEvent(PosthogEvents.FirstSliderViewed)
    } else if (step === 1) {
      emitTrackEvent(PosthogEvents.SecondSliderViewed)
    } else if (step === 2) {
      emitTrackEvent(PosthogEvents.ThirdSliderViewed)
    }
  }

  return (
    <div className="flex-col w-full items-center mt-[6vh]">
      {isReferralCodeUsed ? (
        <Carousel
          className="flex-col items-start onboarding-slider"
          showArrows={false}
          showIndicators={true}
          preventMovementUntilSwipeScrollTolerance
          selectedItem={selectedItem}
          showStatus={false}
          onChange={handleOnChange}
        >
          <SliderOneReferral />
          <SliderTwoReferral />
        </Carousel>
      ) : (
        <Carousel
          className="flex-col items-start onboarding-slider"
          showArrows={false}
          showIndicators={true}
          preventMovementUntilSwipeScrollTolerance
          selectedItem={selectedItem}
          showStatus={false}
          onChange={handleOnChange}
        >
          <SliderOne />
          <SliderTwo />
          {/* <SliderThree /> */}
        </Carousel>
      )}
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

export { LoginSliders }
