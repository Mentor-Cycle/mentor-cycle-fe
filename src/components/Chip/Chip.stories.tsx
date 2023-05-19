import { Meta, StoryObj } from "@storybook/react";
import Chip from "./Chip";

/**
 * Primary UI component for user interaction
 */

const meta = {
  title: "Chip/Chips",
  component: Chip,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KnsardnDQ2lDKUYo58G8Pf/Mentor-Cycle?node-id=1921-5693&t=GMEw33yWzk1MdUGZ-0",
    },
  },
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
