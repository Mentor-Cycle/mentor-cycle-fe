import { Meta, StoryObj } from "@storybook/react";
import MentoringWeekCard from "./MentoringWeekCard";

const meta = {
  title: "Data Display/MentoringWeekCard",
  component: MentoringWeekCard,
  argTypes: {
    day: {
      options: [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
      ],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof MentoringWeekCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    day: "Segunda-feira",
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet.",
    hour: "19h30",
    status: "A confirmar",
  },
};
