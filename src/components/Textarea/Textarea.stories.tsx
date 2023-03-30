import { Meta, StoryObj } from "@storybook/react";
import Textarea from "./Textarea";

const meta = {
  title: "Forms/Textarea",
  component: Textarea,
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "textarea",
    label: "Usuário",
    placeholder: "Digite seu usuário",
  },
};
export const Required: Story = {
  args: {
    name: "textarea",
    label: "Textarea Obrigatório",
    required: true,
    placeholder: "Digite seu email",
  },
};

export const Disabled: Story = {
  args: {
    name: "textarea",
    label: "Textarea desabilitado",
    disabled: true,
    placeholder: "Digite seu nome",
  },
};
