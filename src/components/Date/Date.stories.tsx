import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { DateProps } from "./Date.types";
import Date from "./Date";

const meta = {
  title: "Forms/Date",
  component: Date,
  argTypes: {
    size: {
      options: ["standard", "small"],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof Date>;

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
