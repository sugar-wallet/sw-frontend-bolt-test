import { useQuery } from '@tanstack/react-query'
import React from 'react'
import {
  EmailIcon,
  EmailShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from 'react-share'

import { ShareIcon } from '@sw-npm-packages/icons'
import { fetchUserReferrals } from 'config'
import { openExternalShare } from 'helpers'
import { MessengerImage, GoogleMessagesIcon } from 'assets/images'
import Image from 'next/image'

const ReferralShare = () => {
  const { data } = useQuery(fetchUserReferrals())
  const { myReferralCode, sharingUrl } = data || {}
  const url =
    sharingUrl ||
    `${location.origin}/campaign/referral?referralCode=` + myReferralCode
  const iconProps = {
    size: 50,
    round: true
  }
  const message = {
    body: `The most simple automatic, investing/saving app you'll ever use, join me and we both get free stuff. ${url}\n\nBest,\nFriend`,
    url
  }

  const messengerShareUrl = `fb-messenger://share/?link=${encodeURIComponent(
    message.url
  )}`

  const handleShareSMS = () => {
    const url = message.url
    const body = message.body
    const smsLink = `sms:?body=${encodeURIComponent(body)}`
    window.open(smsLink, '_self')
  }
  const handleShareMessanger = () => {
    const url = message.url
    const body = message.body
    const smsLink = `fb-messenger://share/?link=${encodeURIComponent(
      message.url
    )}`
    window.open(smsLink, '_self')
  }

  return (
    <div className="mt-6 [&>*]:mr-4">
      <div className="rounded-full bg-white w-12 h-12 items-center justify-center">
        <Image
          onClick={handleShareSMS}
          // style={{ width: '30px' }}
          src={GoogleMessagesIcon}
          alt="referral image"
        />
      </div>
      <div className="rounded-full bg-white w-12 h-12 items-center justify-center">
        <Image
          // onClick={()=>window.open('https://m.me','_blank', 'width=600,height=400')}
          onClick={handleShareMessanger}
          style={{ width: '30px' }}
          src={MessengerImage}
          alt="referral image"
        />
      </div>

      <WhatsappShareButton title={message.body} separator=" " url={message.url}>
        <WhatsappIcon {...iconProps} />
      </WhatsappShareButton>
      <EmailShareButton
        subject="Save for your future, with me!"
        body={message.body}
        url={''}
      >
        <EmailIcon {...iconProps} />
      </EmailShareButton>

      {/* <TelegramShareButton title="Hello" url="https://google.com">
        <TelegramIcon {...iconProps} />
      </TelegramShareButton> */}

      {/* <div
        className="flex-center mt-2"
        onClick={() =>
          openExternalShare({ title: message.body, url: message.url })
        }
      >
        <ShareIcon size={34} />
      </div> */}
    </div>
  )
}

export { ReferralShare }
