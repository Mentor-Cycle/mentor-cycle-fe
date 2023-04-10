import { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

const meta = {
  title: "Forms/Input",
  component: Input,
  argTypes: {
    size: {
      options: ["standard", "small"],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "input",
    label: "Usuário",
    placeholder: "Digite seu usuário",
  },
};
