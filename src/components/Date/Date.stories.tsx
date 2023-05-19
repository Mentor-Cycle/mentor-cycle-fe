import { Meta, StoryObj } from "@storybook/react";
import DateInput from "./InputBirthday";

const meta = {
  title: "Forms/Date",
  component: DateInput,
  argTypes: {
    size: {
      options: ["standard", "small"],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "date",
    label: "Usuário",
  },
};

export const Required: Story = {
  args: {
    name: "date",
    label: "Date obrigatório",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    name: "date",
    label: "Date desabilitado",
    disabled: true,
  },
};
