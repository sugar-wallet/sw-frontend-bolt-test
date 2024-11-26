import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import {
  Body,
  ContainedButton,
  FullScreenLoader,
  SubTitle,
  Title
} from '@sw-npm-packages/components'
import { DATE_TIME_FORMATS } from '@sw-npm-packages/constants'
import { Dayjs } from '@sw-npm-packages/utils'
import { fetchUserGifts, navigationPaths } from 'config'
import { formatMoney } from 'helpers'
import { navigate } from 'helpers/navigation'
import { BottomNavigationLayout, PrimaryLayout } from 'layouts'

const PendingHeader = ({ amount = 0 }: { amount: number }) => {
  const t = useTranslations('RewardsPage')

  return (
    <div className="flex-col items-center mb-6">
      <Title className="text-center text-xxl">
        {t.rich('pendingHeaderTitle', {
          amount: formatMoney(amount),
          span: (content) => <span className="text-pink">{content}</span>
        })}
      </Title>
      <Body className="text-center m-4">{t('pendingHeaderBody')}</Body>
    </div>
  )
}

const CompletedHeader = () => {
  const t = useTranslations('RewardsPage')

  return (
    <div className="flex-col mt-6 mb-6">
      <Title className="text-xs text-semi-gray">{t('completedHeader')}</Title>
    </div>
  )
}

const CompletedFooter = ({ value }) => {
  const t = useTranslations('RewardsPage')

  return (
    <div className="flex-col mt-2 mb-6 items-end">
      <Title className="text-sm text-black">
        {t.rich('completedFooter', {
          amount: formatMoney(value)
        })}
      </Title>
    </div>
  )
}

const NoReward = () => {
  const t = useTranslations('RewardsPage')

  return (
    <div className="flex-col mt-6">
      <Title className="text-center text-xxl">{t('noRewardTitle')}</Title>
      <Body className="text-center m-4">{t('noRewardBody')}</Body>
    </div>
  )
}

const Reward = ({ isCompleted, data, t }) => {
  const { value, credit_date, reason, message } = data

  return (
    <div className="mb-6">
      <div
        className={`text-base font-medium min-w-[4.5em] ${
          isCompleted ? 'text-semi-gray' : 'text-black'
        }`}
      >
        {formatMoney(value)}
      </div>
      <div className="flex-col ml-2 mr-2">
        <Title
          className={`text-base ${
            isCompleted ? 'text-semi-gray' : 'text-black'
          }`}
        >
          {reason}
        </Title>
        <SubTitle
          className={`${
            isCompleted ? 'text-semi-gray' : 'text-dark-gray-5E'
          } font-light mt-1 text-sm self-start`}
        >
          {message}
        </SubTitle>
      </div>
      <div
        className={`${
          isCompleted ? 'text-semi-gray' : 'text-dark-gray-5E'
        } text-sm justify-end flex-grow`}
      >
        {isCompleted
          ? t('credited')
          : Dayjs(credit_date)?.format(
              DATE_TIME_FORMATS.dateUserDisplayShortFormat
            )}
      </div>
    </div>
  )
}

const RewardsList = ({ isCompleted = false, data, t }) => {
  return data.map((item, index) => (
    <Reward key={index} data={item.data} isCompleted={isCompleted} t={t} />
  ))
}

const Rewards = () => {
  const { data, isLoading } = useQuery(fetchUserGifts())
  const t = useTranslations('RewardsPage')

  const onInviteClick = () => {
    navigate(navigationPaths.refer)
  }

  if (isLoading) return <FullScreenLoader />

  const { pending, completed } = data || {}

  const totalPending = pending?.total || 0
  const totalCompleted = completed?.total || 0

  const noRewardsAvailable = totalPending === 0 && totalCompleted === 0

  return (
    <BottomNavigationLayout>
      <PrimaryLayout title={t('title')}>
        {noRewardsAvailable ? (
          <NoReward />
        ) : (
          <div className="flex-col pb-36">
            {totalPending > 0 ? (
              <div className="flex-col">
                <PendingHeader amount={totalPending} />
                <RewardsList isCompleted={false} data={pending?.data} t={t} />
                {totalCompleted > 0 ? (
                  <div className="mt-2 h-[0.5px] bg-light-gray" />
                ) : null}
              </div>
            ) : null}
            {totalCompleted > 0 ? (
              <div className="flex-col">
                <CompletedHeader />
                <RewardsList isCompleted={true} data={completed?.data} t={t} />
                <CompletedFooter value={totalCompleted} />
              </div>
            ) : null}
          </div>
        )}
        <div className="fixed p-4 bottom-[4.5em] left-0 right-0">
          <ContainedButton
            className="btn-contained-black p-6"
            onClick={onInviteClick}
          >
            {t('inviteMore')}
          </ContainedButton>
        </div>
      </PrimaryLayout>
    </BottomNavigationLayout>
  )
}

export default Rewards
