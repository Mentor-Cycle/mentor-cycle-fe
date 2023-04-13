import { StoryObj, Meta } from "@storybook/react";
import CheckBox from "./Checkbox";

const meta = {
  title: "Forms/Checkbox",
  component: CheckBox,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Tyq7mFQg4xwrP29dXoSUgX/Principal---Mentor-Cycle?node-id=2107-16661&t=5VEDZyGbU0zaaeNw-0",
    },
  },
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Checkbox",
    id: "checkbox",
    name: "checkbox",
  },
};
