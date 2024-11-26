import React from 'react'

import { ReferralBanner } from './components/ReferralBanner'
import { ReferralBannerNz } from './components/ReferralBanner/ReferralBannerNZ'
import { getCountryCode } from '@sw-npm-packages/config'

const ActionBanners = () => {
  // const [selectedItem, setSelectedItem] = React.useState(0)

  // const handleOnChange = (step: number) => {
  //   setSelectedItem(step)
  // }
  const countryCode = getCountryCode()

  return (
    <div className="block mt-4">
      {/* {countryCode === 'IN' ? <ReferralBanner /> : <ReferralBannerNz />} */}
      <ReferralBannerNz />
    </div>
  )
  // return (
  //   <Carousel
  //     showArrows={false}
  //     showIndicators={false}
  //     preventMovementUntilSwipeScrollTolerance
  //     selectedItem={selectedItem}
  //     showStatus={false}
  //     onChange={handleOnChange}
  //     className="block mt-4"
  //     showThumbs={false}
  //   >
  //     <ReferralBanner />
  //     <AutoInvestingBanner />
  //   </Carousel>
  // )
}

export { ActionBanners }
