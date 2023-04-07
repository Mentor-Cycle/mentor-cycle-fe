import { StoryObj, Meta } from "@storybook/react";
import DashboardCardProfile from "./DashboardCardProfile";

const meta = {
  title: "Data Display/DashboardCardProfile",
  component: DashboardCardProfile,
  decorators: [
    (Story) => (
      <div
        style={{
          background: "gray",
          height: "35vh",
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
    avatar: "https://via.placeholder.com/98",
  },
};
