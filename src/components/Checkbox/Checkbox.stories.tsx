import { StoryFn, Meta } from "@storybook/react";
import CheckBox from "./Checkbox";
import { CheckboxProps } from "./Checkbox.types";

export default {
  title: "Components/Checkbox",
  component: CheckBox,
} as Meta;

const Template: StoryFn<CheckboxProps> = (args) => <CheckBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Checkbox",
  id: "checkbox",
  name: "checkbox",
};
