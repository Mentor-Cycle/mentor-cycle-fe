import { Meta, StoryObj } from "@storybook/react";
import CardProfile from "./CardProfile";

const meta = {
  title: "Data Display/CardProfile",
  component: CardProfile,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KnsardnDQ2lDKUYo58G8Pf/Mentor-Cycle?node-id=1921-5642&t=GMEw33yWzk1MdUGZ-0",
    },
  },
} satisfies Meta<typeof CardProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "123",
    name: "João Silva",
    jobTitle: "Software Engineer",
    location: "New York, NY",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada bibendum ligula, vel tincidunt enim. ",
    chips: [
      { variant: "primary", children: "Backend" },
      { variant: "primary", children: "FrontEnd" },
      { variant: "primary", children: "FullStack" },
    ],
    image: "https://via.placeholder.com/80",
  },
};
