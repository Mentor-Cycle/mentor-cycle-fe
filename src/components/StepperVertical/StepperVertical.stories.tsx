import { Meta, StoryObj } from "@storybook/react";
import StepperVertical from "./StepperVertical";

const meta = {
  title: "Navigation/StepperVertical",
  component: StepperVertical,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KnsardnDQ2lDKUYo58G8Pf/Mentor-Cycle?node-id=1921-5806&t=GMEw33yWzk1MdUGZ-0",
    },
  },
} satisfies Meta<typeof StepperVertical>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    steps: ["Perfil", "Dados pessoais", "Descrição de trabalho"],
    currentStep: 1,
  },
};
