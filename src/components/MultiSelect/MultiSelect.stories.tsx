import { Meta, StoryObj } from "@storybook/react";
import MultiSelect from "./MultiSelect";

const meta = {
  title: "Forms/MultiSelect",
  component: MultiSelect,
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Especialização",
    name: "skills",
  },
};
