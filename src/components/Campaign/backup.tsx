import React from 'react'

import { DarkGoldBarImage, LogoImage } from 'assets/images'
import { ImageComponent } from 'components'

import { campaignData } from './data'

interface IProps {
  campaign: string
}

const CampaignBody = (props: IProps) => {
  const { campaign } = props

  const data = campaignData[campaign]

  if (!data) return <></>
  return (
    <div className="px-4 flex-col">
      <div className="justify-center items-center my-10">
        <div className="w-20">
          <LogoImage />
        </div>
      </div>
      <div className="justify-center mb-10 text-5xl font-bold font-octarine flex-wrap">
        <div className="gold-text min-w-fit">24k Gold</div>
        <div className="ml-3 min-w-fit">Gift</div>
      </div>
      <div className="w-full justify-center items-center">
        <ImageComponent
          src={DarkGoldBarImage}
          alt="Gold Bar"
          style={{ width: '80%' }}
        />
      </div>
      <div className="justify-center mt-[4vh] mb-[2vh] font-semibold text-2xxxl flex-wrap">
        {data.title}
      </div>
      <div className="flex-col">
        {data.benefits.map((benefit, index) => (
          <div key={index} className="mt-4">
            <div className="text-2xxl font-semibold">{index + 1}.</div>
            <div className="text-xl mt-1 ml-3 font-normal">{benefit}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { CampaignBody }
