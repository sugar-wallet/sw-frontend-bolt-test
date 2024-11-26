import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React from 'react'

import { Unit } from '@sw-npm-packages/constants'
import { SingleGoldBarImage } from 'assets/images'
import { ImageComponent } from 'components'
import { fetchUserBalance } from 'config'

const JourneyProgress = () => {
  const t = useTranslations('Common')
  const { data } = useQuery(fetchUserBalance())

  const { unit: rawUnit, weightUnits } = data || {}

  const unit = weightUnits === Unit.G ? Number(rawUnit) * 1000 : rawUnit

  const percentage = Math.min(100, Math.floor((Number(unit) / 10000) * 100))

  return (
    <div className="flex-col w-full">
      <div className="flex-col">
        <div className="justify-between text-xs text-light-black mb-2">
          <div>{t('start')}</div>
          <div>2.5g</div>
          <div className="ml-6">5g</div>
          <div className="ml-6">7.5g</div>
          <div className="mr-1">10g</div>
        </div>
        <div className="relative justify-center">
          <div className="absolute flex w-full justify-between -top-[1px] z-10">
            <div></div>
            <div>
              <div className="rounded-full h-2 w-2 bg-semi-gray"></div>
            </div>
            <div>
              <div className="rounded-full h-2 w-2 bg-semi-gray"></div>
            </div>
            <div>
              <div className="rounded-full h-2 w-2 bg-semi-gray"></div>
            </div>
            <div></div>
          </div>
          <div className="w-[95%] bg-light-gray relative rounded-full h-1.5">
            <div
              className="bg-gold h-1.5 rounded-full"
              style={{ width: `${percentage}%` }}
            ></div>
            <div
              style={{ left: `calc(${percentage}% - 4px)` }}
              className={`rounded-full absolute h-4 w-4 -top-[5px] z-20 animate-ping bg-[#f7d26d]`}
            ></div>
            <div
              style={{ left: `calc(${percentage}% - 2px)` }}
              className={`rounded-full absolute h-3 w-3 -top-[3px] z-20 bg-[#f7d26d]`}
            ></div>
          </div>
        </div>

        <div className="w-full justify-end mt-1">
          <ImageComponent
            alt="single gold bar"
            style={{ width: 40 }}
            src={SingleGoldBarImage}
          />
        </div>
      </div>
    </div>
  )
}

export { JourneyProgress }
