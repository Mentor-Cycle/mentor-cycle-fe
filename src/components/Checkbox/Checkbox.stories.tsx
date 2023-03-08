import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import CheckboxRadix from "./Checkbox";
import { Props } from "./Checkbox-types";

export default {
  title: "Components/Checkbox",
  component: CheckboxRadix,
} as Meta;

const Template: StoryFn<Props> = (args) => <CheckboxRadix {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Checkbox",
  id: "checkbox",
};
