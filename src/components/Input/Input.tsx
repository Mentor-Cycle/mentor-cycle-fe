import React, { FC, useState, ChangeEvent } from 'react'
import clsx from 'clsx'
import { InputProps, InputSize } from './Input.types'
import * as Label from '@radix-ui/react-label'

const Input: FC<InputProps> = ({
  size = 'standard',
  label,
  name,
  disabled,
  ...props
}) => {
  const [invalid, setInvalid] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    setInvalid(!event.target.checkValidity() || !event.target.value)
    setErrorMessage(event.target.validationMessage || '')
  }

  const sizesInput: { [key in InputSize]: string } = {
    standard: `w-full px-6 py-4 my-2`,
    small: `flex flex-col px-4 py-4 my-2`,
  }

  const sizesLabel = {
    standard: `text-base w-full`,
    small: `text-sm`,
  }
  return (
    <Label.Root
      className={clsx(
        disabled && 'text-gray-03 hover:text-gray-03 dark:opacity-50',
        'text-secondary-04 hover:text-secondary-02 dark:text-neutral-01 font-semibold',
        sizesLabel[size]
      )}
      htmlFor={name}
    >
      {label}
      <input
        name={name}
        {...props}
        className={clsx(
          sizesInput[size],
          invalid &&
            'invalid:border-danger-01 invalid:focus:ring-1 invalid:focus:ring-danger-01 invalid:text-danger-01 invalid:placeholder:text-danger-01 dark:invalid:placeholder:text-danger-01',
          ' font-normal text-gray-03 border border-gray-03 px-6 py-4 rounded-lg my-2 placeholder:text-gray-03 cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-05 transition-colors bg-neutral-03 hover:bg-neutral-01 active:placeholder:text-secondary-01 active:text-secondary-01 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:placeholder:text-gray-03 dark:bg-secondary-03 dark:border-neutral-01 dark:placeholder:text-neutral-01 dark:text-neutral-01 dark:hover:bg-secondary-01 dark:active:bg-secondary-05 dark:focus:ring-1 dark:focus:ring-neutral-01 dark:transition-colors dark:disabled:bg-gray-02 dark:disabled:active:text-current dark:disabled:active:placeholder:text-current '
        )}
        onBlur={handleBlur}
      />
      {errorMessage && !disabled && (
        <div className={'font-normal my-2 text-danger-01 text-sm'}>
          {errorMessage}
        </div>
      )}
    </Label.Root>
  )
}

export default Input
