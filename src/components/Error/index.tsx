import React from 'react'

import { Body } from '@sw-npm-packages/components'

interface IError {
  message: string
}

const Error: React.FC<IError> = ({ message }) => {
  return <Body className="text-red my-4 text-center">{message}</Body>
}

export { Error }
