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
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
    size: "regular",
  },
};
export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    variant: "primary",
    disabled: true,
  },
};
export const WithIcon: Story = {
  args: {
    children: "With Icon",
  },
  render: (args) => (
    <Button {...args}>
      <Button.Icon icon={FcGoogle} />
      {args.children}
    </Button>
  ),
};
