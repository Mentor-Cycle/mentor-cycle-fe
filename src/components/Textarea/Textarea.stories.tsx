import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { TextareaProps } from "./Textarea.types";
import Textarea from "./Textarea";

export default {
  title: "Forms/Textarea",
  component: Textarea,
} as Meta;

const Template: StoryFn<TextareaProps> = (args) => <Textarea {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Usuário",
  placeholder: "Digite seu usuário",
};

export const Required = Template.bind({});
Required.args = {
  label: "Textarea Obrigatório",
  required: true,
  placeholder: "Digite seu email",
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Textarea desabilitado",
  disabled: true,
  placeholder: "Digite seu nome",
};
