import { StoryFn, Meta } from "@storybook/react";
import CheckBox from "./Checkbox";
import { CheckBoxTypes } from "./Checkbox.types";

export default {
  title: "Checkbox/Checkbox",
  component: CheckBox,
} as Meta;

const Template: StoryFn<CheckBoxTypes> = (args) => <CheckBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Checkbox",
  id: "checkbox",
  name: "checkbox",
};
