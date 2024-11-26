import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'

import { SubTitle, Title } from '@sw-npm-packages/components'
import { VideoPlayer } from 'components'

const data = [
  {
    id: 0,
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: 1,
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    id: 2,
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  }
]

const SliderFour = ({ isActive = false }: { isActive: boolean }) => {
  const [selectedVideo, setSelectedVideo] = useState(0)
  const handleOnChange = (step: number) => {
    setSelectedVideo(step)
  }
  if (!isActive) return <></>
  return (
    <div className="flex-col flex-grow items-center">
      <h2>What customers say</h2>
      <Carousel
        className="mt-24 flex-col items-center"
        showArrows={false}
        showIndicators={false}
        preventMovementUntilSwipeScrollTolerance
        selectedItem={selectedVideo}
        showStatus={false}
        onChange={handleOnChange}
      >
        {data.map((video) => (
          <VideoPlayer key={video.id} src={video.url} />
        ))}
      </Carousel>
      <h5 className="mt-8 mb-2 text-pink">Amy Smith</h5>
      <Title className="font-normal">Occupation, 25</Title>
      <br />
      <SubTitle className="text-sm mt-6 font-light">
        Auckland, New Zealand
      </SubTitle>
    </div>
  )
}

export default SliderFour
