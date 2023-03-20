import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { StepperProps } from './Stepper.types'
import Stepper from './Stepper'

export default {
  title: 'Steppers/Stepper',
  component: Stepper,
} as Meta

const Template: StoryFn<StepperProps> = (args) => <Stepper {...args} />

export const Default = Template.bind({})
Default.args = {
  steps: [1, 2, 3],
  currentStep: 2,
}

export const ThreeSteps = Template.bind({})
ThreeSteps.args = {
  steps: [1, 2, 3],
}

export const OneStep = Template.bind({})
OneStep.args = {
  steps: [1],
  currentStep: 1,
}

export const SixSteps = Template.bind({})
SixSteps.args = {
  steps: [1, 2, 3, 4, 5],
  currentStep: 4,
}
