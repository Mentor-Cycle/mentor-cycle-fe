import { StoryObj, Meta } from "@storybook/react";
import CheckBox from "./Checkbox";

const meta = {
  title: "Forms/Checkbox",
  component: CheckBox,
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
