import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'

import { FullScreenLoader } from '@sw-npm-packages/components'
import { ScratchCard } from 'components'
import { fetchRepublicDayReward, navigationPaths } from 'config'
import { navigate } from 'helpers/navigation'

const RepublicDay = () => {
  const { data, isLoading } = useQuery(fetchRepublicDayReward())
  const [rewardRevealed, setRewardRevealed] = React.useState(false)
  const { republicDayReward = -1, cardScratched = false } = data || {}

  useEffect(() => {
    navigate(navigationPaths.home, true)
  }, [])

  if (isLoading)
    return (
      <div
        className="flex-1 flex-col flex-center bg-black -mx-4"
        style={{
          background: !cardScratched
            ? 'var(--black)'
            : 'linear-gradient(180deg, rgba(255,103,31,1) 0%, rgba(255,255,255,1) 50%, rgba(4,106,56,1) 100%)'
        }}
      >
        <FullScreenLoader />
      </div>
    )

  return (
    <div
      className="flex-1 flex-col items-center bg-black -mx-4"
      style={{
        background:
          cardScratched || rewardRevealed
            ? 'linear-gradient(180deg, rgba(255,103,31,1) 0%, rgba(255,255,255,1) 50%, rgba(4,106,56,1) 100%)'
            : 'var(--black)'
      }}
    >
      <div className="text-center text-black my-12 w-[80%] flex-center min-h-[5.5rem]">
        {(cardScratched || rewardRevealed) && (
          <>
            {republicDayReward > 0 ? (
              <div className="text-white flex-col flex-1 flex-center font-semibold animate-zoom-in">
                <div className="text-2xl">Congratulations!</div>
                <div className="text-3xl">
                  You have won{' '}
                  <span className="ml-4 contents">₹100 + ₹50 of Gold</span>
                </div>
              </div>
            ) : (
              <div className="text-4xl text-white font-semibold animate-zoom-in w-[90%]">
                Better Luck Next Time!
              </div>
            )}
          </>
        )}
      </div>
      {!cardScratched ? (
        <ScratchCard
          height={350}
          width={250}
          image={`${window.location.origin}/images/scratch-card.png`}
          finishPercent={60}
          rewardComponent={<ScratchCardReward />}
          onComplete={() => setRewardRevealed(true)}
        />
      ) : (
        <div className="h-[350px] w-[250px] object-contain">
          <ScratchCardReward />
        </div>
      )}
    </div>
  )
}

const ScratchCardReward = () => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'var(--crayola)',
        borderRadius: '8px'
      }}
    >
      <img
        src={
          'https://internationalschoolguwahati.com/wp-content/uploads/2023/07/Mangal-Pandey.jpg'
        }
        alt="freedom-fighter"
        className="w-full h-auto object-cover rounded-md"
      />
      {/* {reward > 0 ? (
        <div className="text-black flex-col items-center">
          <div className="text-2xxl font-bold my-12">Congratulations!</div>
          <div className="text-dark-gray font-semibold text-xxl">
            You have won
          </div>
          <div className="text-4xl font-semibold text-pink mb-12">
            ₹{reward}
          </div>
          <div className="text-dark-gray text-xl mb-8">
            It will be credited to your gift wallet soon.
          </div>
        </div>
      ) : (
        <div className="flex-1 flex-center text-3xxl font-semibold text-black">
          Better Luck Next Time
        </div>
      )} */}
    </div>
  )
}

export default RepublicDay
