import React, { useEffect, useState } from 'react'

import { PosthogEvents } from '@constants'
import { ContainedButton, OutlinedButton } from '@sw-npm-packages/components'
import { AustraliaFlag, IndiaFlag, WorldCupFinalImage } from 'assets/images'
import { CustomModal, ImageComponent, WorldCupCampaign } from 'components'
import { navigationPaths } from 'config'
import { appendQueryParams } from 'helpers'
import { emitTrackEvent } from 'helpers/events'
import { navigate, openTab } from 'helpers/navigation'
import { WorldCupTeam } from 'types'

const WorldCup = () => {
  const [open, setOpen] = useState(false)
  const [team, setTeam] = useState('')
  useEffect(() => {
    emitTrackEvent(PosthogEvents.EmployerLandingPageViewed)
  }, [])
  const chooseTeam = (team: WorldCupTeam) => {
    setTeam(team)
    setOpen(true)
  }
  const navigateToOnboarding = () => {
    navigate(
      appendQueryParams(
        navigationPaths.onboarding,
        ['campaignCode', 'referralCode', 'retargetCode'],
        {
          worldcupTeam: team
        }
      )
    )
  }
  return (
    <div className="-mx-4 flex-col bg-[#000] min-h-[100vh] w-screen text-white px-4 items-center">
      <ImageComponent
        src={WorldCupFinalImage}
        alt="Worldcup image"
        style={{ width: '100vw', height: 'auto', position: 'fixed', zIndex: 0 }}
      />
      <WorldCupCampaign />
      <div className="mt-[4vh] flex-col items-center w-full z-10">
        <OutlinedButton
          className="btn-outlined-white w-[50%]"
          onClick={() => chooseTeam(WorldCupTeam.INDIA)}
        >
          <ImageComponent
            src={IndiaFlag}
            alt="Indian Flag"
            style={{ width: '20px', height: 'auto', marginRight: '10px' }}
          />
          India
        </OutlinedButton>

        <OutlinedButton
          className="btn-outlined-white mt-4 w-[50%]"
          onClick={() => chooseTeam(WorldCupTeam.AUSTRALIA)}
        >
          <ImageComponent
            src={AustraliaFlag}
            alt="Australia Flag"
            style={{ width: '20px', height: 'auto', marginRight: '10px' }}
          />
          Australia
        </OutlinedButton>
      </div>
      <CustomModal
        customStyle={{ width: '85vw' }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="flex-col w-full">
          <div className="text-lg text-center">
            Register on SugarWallet & Purchase{' '}
            <span className="text-gold contents">24K Digital Gold</span>, If
            your selected team wins we will double your gold at the end of the
            match.
          </div>
          <ContainedButton
            className="btn-contained-black mt-6"
            onClick={navigateToOnboarding}
          >
            Got It!
          </ContainedButton>

          <div
            className="text-xs font-light w-full flex-center mt-4 underline"
            onClick={() => openTab('https://www.sugarwallet.com/cwc')}
          >
            *Terms & Conditions
          </div>
        </div>
      </CustomModal>
    </div>
  )
}

export default WorldCup
