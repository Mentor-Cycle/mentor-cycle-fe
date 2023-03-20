import { CardProps } from './CardProfile.types'
import cardImage from '../../public/imgCard.png'
import { ChipOption } from '@components/Chip'

export const cardMock: CardProps[] = [
  {
    name: 'Ronald Richards',
    jobTitle: 'Software Engineer at Apple',
    location: 'São Paulo, SP - Brasil',
    description:
      'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum id quis ad qu minim sss ss... ',
    image: cardImage,
    chips: [ChipOption.FRONTEND, ChipOption.BACKEND],
  },
]
