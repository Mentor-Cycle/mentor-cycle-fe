import { Meta, StoryObj } from "@storybook/react";
import Chip from "./Chip";

/**
 * Primary UI component for user interaction
 */

const meta = {
  title: "Chip/Chips",
  component: Chip,
  argTypes: {
    children: { control: "text" },
    variant: {
      defaultValue: "primary",
      control: { type: "radio" },
      options: ["primary", "secondary", "tertiary"],
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    children: "Tertiary",
  },
};

export const Quartenary: Story = {
  args: {
    variant: "quartenary",
    children: "Quartenary",
  },
};
