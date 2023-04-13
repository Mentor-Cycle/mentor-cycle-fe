import Chip from "@components/Chip/Chip";
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
    chips: [
      <Chip variant="primary" key="1">
        primary
      </Chip>,
      <Chip variant="secondary" key="2">
        secondary
      </Chip>,
      <Chip variant="tertiary" key="3">
        tertiary
      </Chip>,
      <Chip variant="quartenary" key="4">
        quartenary
      </Chip>,
    ],
  },
};
