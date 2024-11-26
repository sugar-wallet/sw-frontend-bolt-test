import Head from 'next/head'
import React from 'react'

import { GlobalModals } from 'components'

const MainLayout: React.FC<React.HTMLProps<HTMLButtonElement>> = ({
  children
}) => {
  return (
    <div className="flex-1 px-4" style={{ padding: '0 1rem' }}>
      <Head>
        <title>Sugar Wallet</title>
      </Head>
      {children}
      <GlobalModals />
    </div>
  )
}

export { MainLayout }
