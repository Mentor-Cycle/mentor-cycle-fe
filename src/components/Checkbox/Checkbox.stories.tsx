import { StoryFn, Meta } from "@storybook/react";
import { CheckBoxType } from "./Checkbox.types";
import CheckBox from "./Checkbox";

export default {
  title: "Components/Checkbox",
  component: CheckBox,
} as Meta;

const Template: StoryFn<CheckBoxType> = (args) => <CheckBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Checkbox",
  id: "checkbox",
};
