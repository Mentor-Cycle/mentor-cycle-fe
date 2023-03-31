import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { InputProps } from "./Input.types";
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

export const Required: Story = {
  args: {
    name: "input",
    label: "Input Obrigatório",
    required: true,
    placeholder: "Digite seu email",
  },
};

export const Disabled: Story = {
  args: {
    name: "input",
    label: "Input desabilitado",
    disabled: true,
    placeholder: "Digite seu nome",
  },
};
