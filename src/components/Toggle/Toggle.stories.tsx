import { Meta, StoryObj } from "@storybook/react";
import Toggle from "./Toggle";

const meta = {
  title: "Forms/Toggle",
  component: Toggle,
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IsToggle: Story = {
  args: {
    isToggle: true,
  },
};
