import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { InputProps } from "./Input.types";
import { Input } from "./Input";

export default {
  title: "Input/Input",
  component: Input,
} as Meta;

const Template: StoryFn<InputProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Usuário",
  placeholder: "Digite seu usuário",
};

export const Required = Template.bind({});
Required.args = {
  label: "Input Obrigatório",
  required: true,
  placeholder: "Digite seu email",
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Input desabilitado",
  disabled: true,
  placeholder: "Digite seu nome",
};
