import { StoryFn } from '@storybook/react'
import TestimonialCard from './TestimonialCard'
import { PropsTestimonialCard } from './TestimonialCard.types'

export default {
  title: 'Cards/TestimonialCard',
  component: TestimonialCard,
}

const Template: StoryFn<PropsTestimonialCard> = (args) => (
  <TestimonialCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel risus lobortis, fringilla magna sit amet, dapibus turpis. Duis vitae facilisis sapien, vitae rhoncus mauris. Pellentesque ultricies lacus id augue rhoncus, ut mollis mauris ultrices. Duis efficitur orci quis metus aliquam faucibus. Morbi vitae lorem vel est fringilla maximus. Donec rutrum mollis dolor, ac efficitur quam interdum eu. Praesent pharetra aliquet est, in imperdiet lorem posuere sed. Morbi id turpis leo.',
  maxLines: 2,
}
