import Image from 'next/image'
import { useRef, useState } from 'react'

import { LogoImage } from 'assets/images'

interface VideoPlayerProps {
  src: string // Video source URL
  width?: number // Optional video width
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayPause = () => {
    const video = videoRef.current
    if (video) {
      if (video.paused) {
        video.play()
      } else {
        video.pause()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVideoClick = () => {
    handlePlayPause()
  }

  return (
    <div
      className={`rounded-lg overflow-hidden relative px-8 flex-col items-center`}
    >
      <video
        ref={videoRef}
        onClick={handleVideoClick}
        className="w-full rounded-lg"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {!isPlaying && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          onClick={handlePlayPause}
        >
          <Image
            src={LogoImage}
            alt="Play/Pause"
            width="50"
            height="50"
            className="rounded-full bg-opacity-50 bg-black"
          />
        </div>
      )}
    </div>
  )
}

export { VideoPlayer }
