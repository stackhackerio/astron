import { Dispatch, FC, PropsWithoutRef, SetStateAction } from 'react'

type Props = Omit<
  PropsWithoutRef<JSX.IntrinsicElements['input']>,
  'onChange'
> & {
  onChange: Dispatch<SetStateAction<string>>
}
const Input: FC<Props> = ({ className, children, onChange, ...rest }) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value)
    }
    return null
  }

  return (
    <label>
      <input
        className={className}
        onChange={handleOnChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
    </label>
  )
}

export default Input
