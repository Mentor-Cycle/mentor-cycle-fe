import { Meta, StoryObj } from "@storybook/react";
import Stepper from "./Stepper";

const meta = {
  title: "Navigation/Stepper",
  component: Stepper,
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KnsardnDQ2lDKUYo58G8Pf/Mentor-Cycle?node-id=1921-5677&t=GMEw33yWzk1MdUGZ-0",
    },
  },
} as Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    steps: [1, 2, 3],
    currentStep: 2,
  },
};
