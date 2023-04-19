import { StoryObj, Meta } from "@storybook/react";
import DashboardCardProfile from "./DashboardCardProfile";

const meta = {
  title: "Data Display/DashboardCardProfile",
  component: DashboardCardProfile,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KnsardnDQ2lDKUYo58G8Pf/Mentor-Cycle?node-id=2277-12486&t=GMEw33yWzk1MdUGZ-0",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          background: "gray",
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
} satisfies Meta<typeof DashboardCardProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Ronald Richards",
    job: "Software Engineer at Apple",
    skills: ["Full-Stack", "Back-End", "Front-End"],
    avatar: "/imgCard.png",
  },
};
