import { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";

const meta = {
  title: "Navigation/Header",
  component: Header,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KnsardnDQ2lDKUYo58G8Pf/Mentor-Cycle?node-id=1921-5754&t=GMEw33yWzk1MdUGZ-0",
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isLogged: true,
  },
};
