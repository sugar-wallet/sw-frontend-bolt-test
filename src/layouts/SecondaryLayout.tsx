/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import {
  ContainedButton,
  OutlinedButton,
  SubTitle,
  TextButton
} from '@sw-npm-packages/components'
import { ButtonVariant } from '@sw-npm-packages/types'

interface ISecondaryLayoutProps {
  title: string
  subTitle?: React.ReactNode | string
  subTitleClassName?: string
  footer?: React.ReactNode
  footerContainerClassName?: string
  footerPrimaryBtnLabel: string
  footerPrimaryBtnClassName?: string
  footerPrimaryBtnOnClick: () => void
  footerPrimaryBtnDisabled?: boolean
  footerPrimaryBtnLoading?: boolean
  footerPrimaryBtnVariant?: ButtonVariant
  footerSecondaryBtnLabel?: string
  footerSecondaryBtnClassName?: string
  footerSecondaryBtnOnClick?: () => void
  footerSecondaryBtnDisabled?: boolean
  footerSecondaryBtnLoading?: boolean
  footerSecondaryBtnVariant?: ButtonVariant
}

const LayoutButton = (props: any) =>
  props.variant === ButtonVariant.OUTLINED ? (
    <OutlinedButton {...props}>{props.children}</OutlinedButton>
  ) : props.variant === ButtonVariant.CONTAINED ? (
    <ContainedButton {...props}>{props.children}</ContainedButton>
  ) : props.variant === ButtonVariant.TEXT ? (
    <TextButton {...props}>{props.children}</TextButton>
  ) : null

const SecondaryLayout: React.FC<
  React.HTMLProps<HTMLDivElement> & ISecondaryLayoutProps
> = (props) => {
  const {
    title,
    subTitle,
    subTitleClassName = 'mt-6 max-xs:mt-4',
    footer,
    footerContainerClassName = 'width-footer absolute self-center bottom-btn', // calc(100% - 2rem) is ideal
    footerPrimaryBtnLabel,
    footerPrimaryBtnOnClick,
    footerPrimaryBtnClassName = 'btn-contained-pink',
    footerPrimaryBtnDisabled = false,
    footerPrimaryBtnLoading = false,
    footerPrimaryBtnVariant = ButtonVariant.CONTAINED,
    footerSecondaryBtnLabel,
    footerSecondaryBtnOnClick,
    footerSecondaryBtnClassName = 'btn-outlined-pink',
    footerSecondaryBtnDisabled = false,
    footerSecondaryBtnLoading = false,
    footerSecondaryBtnVariant = ButtonVariant.OUTLINED,
    children
  } = props
  return (
    <>
      <div className="flex-col w-full p-4">
        <h2 className="font-medium text-black text-center mt-4 max-xs:mt-4 max-xs:text-2xl">
          {title}
        </h2>
        {subTitle && (
          <SubTitle
            className={`text-center w-[90%] self-center text-sm justify-center items-center ${subTitleClassName}`}
          >
            {subTitle}
          </SubTitle>
        )}
        {children}
      </div>
      <div className={`${footerContainerClassName} flex-col`}>
        {footer ? footer : null}
        <LayoutButton
          className={`${footerPrimaryBtnClassName} mt-4`}
          onClick={footerPrimaryBtnOnClick}
          disabled={footerPrimaryBtnDisabled}
          isLoading={footerPrimaryBtnLoading}
          variant={footerPrimaryBtnVariant}
        >
          {footerPrimaryBtnLabel}
        </LayoutButton>
        {footerSecondaryBtnLabel && (
          <LayoutButton
            className={`${footerSecondaryBtnClassName} mt-4 max-xs:mt-2`}
            onClick={footerSecondaryBtnOnClick}
            disabled={footerSecondaryBtnDisabled}
            isLoading={footerSecondaryBtnLoading}
            variant={footerSecondaryBtnVariant}
          >
            {footerSecondaryBtnLabel}
          </LayoutButton>
        )}
      </div>
    </>
  )
}

export { SecondaryLayout }
