import { Meta, StoryObj } from "@storybook/react";
import MentoringLinkCard from "./MentoringLinkCard";

const meta = {
  title: "Data Display/MentoringLinkCard",
  component: MentoringLinkCard,
} satisfies Meta<typeof MentoringLinkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "João Silva",
    job: "Desenvolvedor Full Stack",
    status: "A confirmar",
    date: new Date("2023-05-15"),
    hour: new Date("2023-05-15T19:30:00"),
  },
};
