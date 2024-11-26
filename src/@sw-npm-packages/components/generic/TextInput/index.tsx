import { useTranslations } from 'next-intl'

import { Input } from '..'

interface TextInputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string
  error?: string
  containerClassNames?: string
  labelClassNames?: string
  inputClassNames?: string
}

const TextInput = (props: TextInputProps) => {
  const t = useTranslations('FormValidationPage')
  const {
    label = '',
    error = '',
    containerClassNames = '',
    labelClassNames = '',
    inputClassNames = '',
    ...inputProps
  } = props
  return (
    <div
      className={`flex-col justify-between ${
        error ? 'h-24' : 'h-16'
      } w-full ${containerClassNames}`}
    >
      {label && (
        <label className={`text-sm font-medium ${labelClassNames}`}>
          {label}
        </label>
      )}
      <Input
        className={`text-input ${
          error ? 'border border-red' : 'border-light-gray'
        } ${inputClassNames}`}
        {...inputProps}
      />
      {error && <small className="text-red">{t(error)}</small>}
    </div>
  )
}

export { TextInput }
