import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import React, { SetStateAction } from 'react'

import { Title } from '@sw-npm-packages/components'
import { CopyIcon, ShareIcon } from '@sw-npm-packages/icons'
import { notifySuccess } from '@sw-npm-packages/utils'
import { ReferralCornerImage } from 'assets/images'
import { REFER_CAMPAIGN, fetchUserReferrals } from 'config'
import { getCurrencyByTz, openExternalShare } from 'helpers'
import { ReferralShare } from '../ReferralShare'
import { getCountryCode } from '@sw-npm-packages/config'

interface IProps {
  openModal: ()=>void
  isCopied: boolean
  setCopied: React.Dispatch<SetStateAction<boolean>>
  setShared?: React.Dispatch<SetStateAction<boolean>>
}

const config = REFER_CAMPAIGN[getCurrencyByTz() as string] || {
  referrerAmount: 0,
  refereeAmount: 0,
  maxLimit: 0
}

const countryCode = getCountryCode()

const ReferralCard = ({
  openModal,
  isCopied,
  setCopied,
  setShared
}: IProps) => {
  const { data } = useQuery(fetchUserReferrals())
  const t = useTranslations('ReferralPage')
  const { myReferralCode, myCampaignCode, sharingUrl } = data || {}

  const url =
    sharingUrl ||
    `${location.origin}/campaign/referral?referralCode=` + myReferralCode

  const message = {
    body: t('referralShareText'),
    url
  }
  const onCopy = () => {
    let queryParams = `referralCode=${myReferralCode}`
    if (myCampaignCode) queryParams += `&campaignCode=${myCampaignCode}`
    const url = `${location.origin}/landingpage?${queryParams}`
    navigator.clipboard.writeText(sharingUrl || url)
    notifySuccess(t('referralLinkCopySuccess'))
    setCopied(true)
  }

  const onShare = () => {
    if (setShared) {
      setShared(true)
    }
    openExternalShare({ title: message.body, url: message.url })
  }

  return (
    <div className="flex-col relative w-full p-6 rounded-lg bg-black text-white">
      <div className="absolute right-0 top-0">
        <Image
          style={{ width: '110px' }}
          className='rounded-lg'
          src={ReferralCornerImage}
          alt="referral image"
        />
      </div>
      <div className="flex-col">
        <Title className="text-lg w-[80%] leading-6 z-10">
          {/* {t.rich('referralBenefits', {
            amount: config.refereeAmount,
            span: (content) => <span className="text-gold">{content}</span>
          })} */}
          {t.rich('referralBenefitsPercent', {
            amount: '25%',
            span: (content) => <span className="text-gold">{content}</span>
          })}
        </Title>
        <div className="w-full mt-10 gap-x-2 justify-between mb-2">
          <div className="rounded-full w-full h-12 bg-white flex-center text-black text-xs">
            {location.origin}/...
          </div>
          {/* <div className="w-[25%]">
            <ContainedButton
              disabled={isCopied}
              className={`btn-contained-pink ${
                isCopied ? '!bg-semi-gray !text-white' : ''
              }`}
              onClick={onCopy}
            >
              {isCopied ? 'Copied' : 'Copy'}
            </ContainedButton>
          </div> */}
          {/* <div className=" justify-between"> */}
          <div
            style={{ backgroundColor: '#FD889A' }}
            className="cursor-pointer w-20 bg-pink-400 rounded-full d-flex items-center justify-center"
            // onClick={onCopy}
            onClick={onCopy}
          >
            {/* <CopyIcon color={isCopied ? '#656266' : '#fff'} size={34} /> */}
            <span className="text-white text-xs font-normal">{t.rich('copy')}</span>
          </div>
          {/* <div className="flex-center mt-2" onClick={onCopy}>
              <CopyIcon color={isCopied ? '#656266' : '#fff'} size={34} />
            </div> */}
          {/* <div className="flex-center mt-2" onClick={onShare}>
              <ShareIcon size={34} />
            </div> */}
          {/* </div> */}
        </div>
        <ReferralShare />
      </div>
    </div>
  )
}

const ReferralCardFOMO = ({ isCopied, setCopied, setShared }: IProps) => {
  const { data } = useQuery(fetchUserReferrals())
  const t = useTranslations('ReferralPage')
  const { myReferralCode, myCampaignCode, sharingUrl } = data || {}

  const url =
    sharingUrl ||
    `${location.origin}/campaign/referral?referralCode=` + myReferralCode

  const message = {
    body: t('referralShareText'),
    url
  }
  const onCopy = () => {
    let queryParams = `referralCode=${myReferralCode}`
    if (myCampaignCode) queryParams += `&campaignCode=${myCampaignCode}`
    const url = `${location.origin}/landingpage?${queryParams}`
    navigator.clipboard.writeText(sharingUrl || url)
    notifySuccess(t('referralLinkCopySuccess'))
    setCopied(true)
  }

  const onShare = () => {
    if (setShared) {
      setShared(true)
    }
    openExternalShare({ title: message.body, url: message.url })
  }

  return (
    <div className="flex-col relative w-full p-6 rounded-lg bg-black text-white">
      <div className="absolute right-0 top-0">
        <Image
        className='rounded-lg'
          style={{ width: '120px' }}
          src={ReferralCornerImage}
          alt="referral image"
        />
      </div>
      <div className="flex-col">
        <Title className="text-lg w-[80%] leading-6 z-10">
          Share within the next <span className="text-gold">60 seconds</span>{' '}
          and if someone purchases, you will win{' '}
          <span className="text-gold">₹101 Gold</span>
        </Title>
        <div className="w-full mt-10 justify-between mb-2">
          <div className="rounded-full w-[72%] h-12 bg-white flex-center text-black text-xs">
            {location.origin}/...
          </div>
          {/* <div className="w-[25%]">
            <ContainedButton
              disabled={isCopied}
              className={`btn-contained-pink ${
                isCopied ? '!bg-semi-gray !text-white' : ''
              }`}
              onClick={onCopy}
            >
              {isCopied ? 'Copied' : 'Copy'}
            </ContainedButton>
          </div> */}
          <div className="w-[22%] justify-between">
            <div className="flex-center mt-2" onClick={onCopy}>
              <CopyIcon color={isCopied ? '#656266' : '#fff'} size={34} />
            </div>
            <div className="flex-center mt-2" onClick={onShare}>
              <ShareIcon size={34} />
            </div>
          </div>
        </div>
        {/* <ReferralShare /> */}
      </div>
    </div>
  )
}

export { ReferralCard, ReferralCardFOMO }
