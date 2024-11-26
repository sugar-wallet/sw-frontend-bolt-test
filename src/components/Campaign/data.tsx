import { IKeyValuePair } from '@sw-npm-packages/types'

interface ICampaignItem {
  title: React.ReactNode
  benefits: string[]
}

export const campaingNames = ['jupyter', 'ceres', 'alpha', 'matrix']

export const campaignData: IKeyValuePair<ICampaignItem> = {
  jupyter: {
    title: (
      <>
        <div className="min-w-fit">Claim your</div>{' '}
        <div className="ml-2 gold-text min-w-fit">
          <span className="font-normal">₹</span>100 Gold
        </div>
      </>
    ),
    benefits: [
      'On first purchase, instantly receive ₹50',
      'Refer a friend to purchase, earn ₹50'
    ]
  },
  ceres: {
    title: (
      <>
        <div className="mr-2 gold-text min-w-fit">
          <span className="font-normal">₹</span>100 Gold
        </div>{' '}
        <div className="min-w-fit">Over 3 months</div>
      </>
    ),
    benefits: [
      'Each month: Buy ₹50 gold and refer a friend to buy',
      'Get Monthly gift of ₹33'
    ]
  },
  alpha: {
    title: (
      <>
        <div className="min-w-fit">Claim your</div>{' '}
        <div className="ml-2 gold-text min-w-fit">
          <span className="font-normal">₹</span>100 Gold
        </div>
      </>
    ),
    benefits: ['Register and get ₹100 credit', 'Buy ₹50 gold, use ₹5 credit']
  },
  matrix: {
    title: (
      <>
        <div className="min-w-fit">Claim your</div>{' '}
        <div className="ml-2 gold-text min-w-fit">
          <span className="font-normal">₹</span>100 Gold
        </div>
      </>
    ),
    benefits: [
      'Complete Registration',
      'Enjoy 10% cashback on gold buys, max ₹100'
    ]
  }
}
