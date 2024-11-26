import { useTranslations } from 'next-intl'

import { Input } from '..'

interface RadioInputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string
  error?: string
  name?: string
  containerClassNames?: string
  labelClassNames?: string
  inputClassNames?: string
  inputContainerClassNames?: string
  inputLabelClassNames?: string
  value?: string | number | boolean
  options?: {
    label: string | number
    value: string | number
  }[]
}

const RadioInput = (props: RadioInputProps) => {
  const t = useTranslations('FormValidationPage')
  const {
    label = '',
    name = '',
    error = '',
    options = [],
    containerClassNames = '',
    labelClassNames = '',
    inputContainerClassNames = '',
    inputLabelClassNames = '',
    inputClassNames = '',
    value = '',
    ...inputProps
  } = props
  return (
    <div className={`flex-col ${containerClassNames}`}>
      {label && <label className={`text-sm ${labelClassNames}`}>{label}</label>}
      {options.map((option) => (
        <div
          key={option.value}
          className={`justify-start ${inputContainerClassNames}`}
        >
          <Input
            name={name}
            key={option.value}
            value={option.value}
            checked={value && option.value === value ? true : false}
            type="radio"
            className={`radio-input transform scale-[1.5] accent-black ${inputClassNames}`}
            {...inputProps}
          />
          <label
            className={inputLabelClassNames}
            htmlFor={option.value?.toString()}
          >
            {option.label}
          </label>
        </div>
      ))}
      {error && <small className="text-red">{t(error)}</small>}
    </div>
  )
}

export { RadioInput }
