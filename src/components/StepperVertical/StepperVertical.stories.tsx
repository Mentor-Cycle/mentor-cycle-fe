import { Meta, StoryObj } from "@storybook/react";
import StepperVertical from "./StepperVertical";

const meta = {
  title: "Navigation/StepperVertical",
  component: StepperVertical,
} satisfies Meta<typeof StepperVertical>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    steps: ["Perfil", "Dados pessoais", "Descrição de trabalho"],
    currentStep: 1,
  },
};
