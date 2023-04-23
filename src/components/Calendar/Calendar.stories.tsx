import Calendar from "./Calendar";
import { Meta, StoryObj } from "@storybook/react";

const today = new Date();
const meta = {
  title: "Data Display/Calendar",
  component: Calendar,
  argTypes: {
    availableDays: {
      description:
        'Informe uma lista de datas no formato "DD/MM/YYYY" para definir os dias disponíveis.',
      control: {
        type: "array",
        separator: ";",
        defaultValue: [today],
        name: "Disponibilidade",
      },
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Tyq7mFQg4xwrP29dXoSUgX/Principal---Mentor-Cycle?node-id=1921-5662&t=scrwOTUOhBH0l8tF-4",
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    availableDays: [
      `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
    ],
  },
};
