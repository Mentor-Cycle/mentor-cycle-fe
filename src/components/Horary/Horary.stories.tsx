import Horary from "./Horary";
import { Meta, StoryObj } from "@storybook/react";

const today = new Date();
const meta = {
  title: "Data Display/Horary",
  component: Horary,
  argTypes: {
    reservedDate: {
      description:
        'Informe uma lista de horários no formato "hh:mm" para definir horarios disponiveis disponíveis.',
      control: {
        type: "array",
        separator: ";",
        defaultValue: ["8:00"],
        name: "Horários Disponíveis",
      },
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Tyq7mFQg4xwrP29dXoSUgX/Principal---Mentor-Cycle?node-id=2622-22752&t=y2ggiKeIFvF8X2vA-4",
    },
  },
} satisfies Meta<typeof Horary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    reservedDate: [
      "8:00",
      "8:30",
      "9:00",
      "9:30",
      "10:00",
      "10:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
    ],
  },
};
