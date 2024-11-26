import React from 'react'
import { Carousel } from 'react-responsive-carousel'

import {
  GoldPlateBackImage,
  GoldPlateFrontImage,
  MyGoldInfoImage
} from 'assets/images'
import { ImageComponent } from 'components'

const SliderOne = () => (
  <div className="min-h-[45vh] flex-center">
    <ImageComponent
      alt="gold plate"
      style={{ height: '40vh', width: 'auto' }}
      src={GoldPlateFrontImage}
    />
  </div>
)
const SliderTwo = () => (
  <div className="min-h-[45vh] flex-center">
    <ImageComponent
      style={{ height: '40vh', width: 'auto' }}
      alt="gold plate"
      src={GoldPlateBackImage}
    />
  </div>
)

const GoldPlateSlider = () => {
  return (
    <div className="w-full mt-6 flex-center">
      <ImageComponent
        style={{ height: '40vh', width: 'auto' }}
        alt="gold plate"
        src={MyGoldInfoImage}
      />
    </div>
  )
  return (
    <Carousel
      className="flex-col items-start gold-info-slider"
      showArrows={false}
      showIndicators={true}
      preventMovementUntilSwipeScrollTolerance
      showStatus={false}
    >
      <SliderOne />
      <SliderTwo />
    </Carousel>
  )
}

export { GoldPlateSlider }
