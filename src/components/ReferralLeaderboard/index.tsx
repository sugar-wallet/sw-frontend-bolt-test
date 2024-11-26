import Image from 'next/image'
import React from 'react'

import { SubTitle, Title } from '@sw-npm-packages/components'
import { InnovaCarImage } from 'assets/images'

const ReferralLeaderboard: React.FC = () => {
  const users = [
    { name: 'Vikram Choudhary', count: 7 },
    { name: 'Anita Mehta', count: 8 },
    { name: 'Sanjay Sharma', count: 9 },
    { name: 'Neha Gupta', count: 7 },
    { name: 'Rahul Kumar Singh', count: 12 }
  ]

  const sortedUsers = [...users].sort((a, b) => b.count - a.count)

  return (
    <div className="flex flex-col items-center">
      <Image
        src={InnovaCarImage}
        alt="Leaderboard"
        className="h-auto w-36 mt-4"
      />
      <Title className="text-center mb-2 text-xl font-bold">
        Top Referrals for January
      </Title>
      <SubTitle className="text-center mb-4 text-pink">
        Top 3 referrals can win an Innova Crysta
      </SubTitle>
      <table className="border-collapse border border-pink-500 w-full mx-auto">
        <thead>
          <tr className="border border-solid border-gold">
            <th className="p-2 text-center bg-gradient-to-r from-light-pink to-gold">
              Name
            </th>
            <th className="p-2 text-center bg-gradient-to-r from-gold to-light-pink">
              Referred
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={index} className="">
              <td className="p-2 text-center border border-solid border-gold">
                {user.name}
              </td>
              <td className="p-2 text-center border border-solid border-gold">
                {user.count}
              </td>
            </tr>
          ))}
          <tr className="bg-gold">
            <td
              colSpan={2}
              className="p-2 text-center border border-solid border-gold"
            >
              Can you make it to the top?
            </td>
          </tr>
        </tbody>
      </table>
      <p className="mt-4 text-center"></p>
    </div>
  )
}

export default ReferralLeaderboard
