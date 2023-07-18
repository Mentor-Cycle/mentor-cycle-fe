import { Meta, StoryObj } from "@storybook/react";
import MentoringLinkCard from "./MentoringLinkCard";
import { formatHour } from "utils/dashboard-helpers";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

const meta = {
  title: "Data Display/MentoringLinkCard",
  component: MentoringLinkCard,
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KnsardnDQ2lDKUYo58G8Pf/Mentor-Cycle?node-id=1921-5642&t=GMEw33yWzk1MdUGZ-0",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MentoringLinkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "João Silva",
    job: "Desenvolvedor Full Stack",
    status: "PENDING",
    date: format(new Date(), "EEEE", { locale: ptBR }),
    hour: formatHour(new Date()),
    eventId: "123",
  },
};
