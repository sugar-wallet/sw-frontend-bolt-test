import { useTranslations } from 'next-intl'

import { Input } from '..'

interface FlatInputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string
  error?: string
  containerClassNames?: string
  currencyClassNames?: string
  labelClassNames?: string
  inputClassNames?: string
  currency?: string
  isErrorTranslated?: boolean
}

const FlatInput = (props: FlatInputProps) => {
  const {
    error = '',
    containerClassNames = '',
    currencyClassNames = '',
    inputClassNames = '',
    currency = '',
    isErrorTranslated = false,
    ...inputProps
  } = props
  const t = useTranslations('FormValidationPage')
  if (currency) {
    return (
      <div className={`flex-col ${containerClassNames}`}>
        <div className="justify-center items-center">
          <div
            className={`${currencyClassNames} ${
              props.value ? 'text-black' : 'text-semi-gray'
            } text-3xl font-light text-black mb-2 mr-1`}
          >
            {currency}
          </div>
          <Input
            className={`flat-text-input w-[50%] ${inputClassNames}`}
            {...inputProps}
          />
        </div>

        {error && (
          <small className="w-full mt-2 text-sm text-center text-red">
            {isErrorTranslated ? error : t(error)}
          </small>
        )}
      </div>
    )
  }
  return (
    <div className={`flex-col ${containerClassNames}`}>
      <Input className={`flat-text-input ${inputClassNames}`} {...inputProps} />
      {error && (
        <small className="w-full mt-2 text-sm text-center text-red">
          {isErrorTranslated ? error : t(error)}
        </small>
      )}
    </div>
  )
}

export { FlatInput }
