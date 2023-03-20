import * as CheckboxRadix from '@radix-ui/react-checkbox'
import clsx from 'clsx'
import { BsCheck } from 'react-icons/bs'
import { CheckBoxTypes } from './Checkbox.types'

const CheckBox = ({ label, id, className, name, ...props }: CheckBoxTypes) => {
  return (
    <div className={clsx('flex items-center', className)}>
      <CheckboxRadix.Checkbox
        className=" w-6 h-6 mr-4 rounded border border-gray-03 focus:outline-none focus:ring-2 focus:ring-gray-03 focus:border-gray-03 dark:focus:border-neutral-04 dark:border-neutral-04 dark:focus:ring-neutral-04"
        name={name}
        id={id}
        {...props}
      >
        <CheckboxRadix.Indicator>
          <BsCheck size={22} className={'dark:text-neutral-04 text-gray-03'} />
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Checkbox>
      <label
        className={'text-sm font-normal text-gray-03 dark:text-neutral-03'}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  )
}

export default CheckBox
