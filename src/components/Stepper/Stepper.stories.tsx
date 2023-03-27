import { Meta, StoryObj } from "@storybook/react";
import Stepper from "./Stepper";

const meta = {
  title: "Navigation/Stepper",
  component: Stepper,
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    steps: [1, 2, 3],
    currentStep: 2,
  },
};

export const ThreeSteps: Story = {
  args: {
    steps: [1, 2, 3],
    currentStep: 1,
  },
};

export const OneStep: Story = {
  args: {
    steps: [1],
    currentStep: 1,
  },
};

export const SixSteps: Story = {
  args: {
    steps: [1, 2, 3, 4, 5],
    currentStep: 4,
  },
};
