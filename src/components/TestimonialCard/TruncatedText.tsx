import clsx from 'clsx'
import { useState, FC } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { TruncatedTextProps } from './TestimonialCard.types'

const TruncatedText: FC<TruncatedTextProps> = ({
  text,
  maxLines = 2,
  expanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(expanded)

  const toggleExpanded = (): void => {
    setIsExpanded((prev: boolean) => !prev)
  }

  const lineClamp = isExpanded ? 'none' : maxLines

  return (
    <>
      <p
        onClick={toggleExpanded}
        className={clsx(
          'text-sm text-gray-04 mt-2 hover:cursor-pointer',
          !isExpanded && `line-clamp-${lineClamp}`
        )}
      >
        {text}
      </p>
      <button className="flex items-center text-gray-03 hover:text-gray-04 focus:outline-none mt-4">
        <span className="mr-2 text-sm">{isExpanded ? '' : 'Leia mais'}</span>
        <BiChevronDown
          size={18}
          className={`transform ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>
    </>
  )
}

export default TruncatedText
