import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import StepperVertical from './StepperVertical'
import { StepperVerticalProps } from './StepperVertical.types'

export default {
  title: 'Steppers/StepperVertical',
  component: StepperVertical,
} as Meta

const Template: StoryFn<StepperVerticalProps> = (args) => (
  <StepperVertical {...args} />
)

export const Default = Template.bind({})
Default.args = {
  steps: ['Perfil', 'Dados pessoais', 'Descrição de trabalho'],
  currentStep: 1,
}
