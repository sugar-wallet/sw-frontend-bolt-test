import dayjs from 'dayjs'
import React, { useState, useEffect } from 'react'

const DoubleGoldBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [remainingTime, setRemainingTime] = useState('01:00:00')
  const [purchaseGoldTime, setPurchaseGoldTime] = useState(
    dayjs().add(60, 'minutes').startOf('hour')
  )

  const slides = [
    {
      title: 'Double Gold Offer',
      description: `Get a chance to get double the amount of gold you invest! Purchase gold before ${purchaseGoldTime.format(
        'h:mmA'
      )}.<br/> <b>Your slot is reserved for : ${remainingTime}</b>`
    },
    {
      title: 'Win an iPhone 15 Pro',
      description:
        'Purchase gold worth ₹250 or more and get a chance to win an iPhone 15 Pro in our weekly lucky draw!'
    }
  ]

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      )
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const currentTime = dayjs()
    let updatedPurchaseGoldTime = currentTime.add(60, 'minutes').startOf('hour')
    const diff = updatedPurchaseGoldTime.diff(currentTime, 'minutes')
    if (diff < 5) {
      updatedPurchaseGoldTime = currentTime.add(2, 'hours').startOf('hour')
    }
    setPurchaseGoldTime(updatedPurchaseGoldTime)

    const timer = setInterval(() => {
      const currentTime = dayjs()
      const diff = updatedPurchaseGoldTime.diff(currentTime, 'seconds')
      const hours = Math.floor(diff / 3600)
      const minutes = Math.floor((diff % 3600) / 60)
      const seconds = diff % 60
      const formattedTime = `${hours > 0 ? hours + ':' : ''}${
        minutes < 10 && hours > 0 ? '0' : ''
      }${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
      setRemainingTime(diff > 0 ? formattedTime : 'Expired')

      // Update description with the new purchaseGoldTime
      slides[0].description = `Get a chance to get double the amount of gold you invest! Purchase gold before ${updatedPurchaseGoldTime.format(
        'h:mmA'
      )}.<br/> <b>Your slot is reserved for : ${remainingTime}</b>`
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex-1 mt-2 max-h-[8rem]">
      <div className="flex-col items-center">
        <div className="flex-1 justify-between min-h-[6rem]">
          <div className="w-[30%] p-2 flex items-center justify-center text-center bg-pink text-white rounded-lg rounded-tr-none rounded-br-none">
            {slides[currentSlide].title}
          </div>
          <div
            className="flex-col items-center justify-center p-4 text-center text-xs text-pink w-[70%] rounded-lg rounded-tl-none rounded-bl-none border border-solid border-pink"
            dangerouslySetInnerHTML={{
              __html: slides[currentSlide].description
            }}
          ></div>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            {slides.map((slide, index) => (
              <button
                key={index}
                className={`w-2 h-2 mx-1 rounded-full ${
                  index === currentSlide ? 'bg-pink' : 'bg-gray-300'
                } transition-all duration-500`}
                onClick={() => goToSlide(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoubleGoldBanner
