import { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import { FcGoogle } from "react-icons/fc";

import "../../styles/globals.css";
/**
 * Primary UI component for user interaction
 */
const meta = {
  title: "Forms/Button",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Tyq7mFQg4xwrP29dXoSUgX/Principal---Mentor-Cycle?node-id=1921-5556&t=5VEDZyGbU0zaaeNw-0",
    },
  },
  argTypes: {
    children: { control: "text" },
    variant: {
      options: ["primary", "secondary"],
      control: { type: "radio" },
    },
    size: {
      options: ["regular", "small"],
      control: { type: "radio" },
    },
    disabled: { active: { control: "boolean" } },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
    size: "regular",
  },
};
