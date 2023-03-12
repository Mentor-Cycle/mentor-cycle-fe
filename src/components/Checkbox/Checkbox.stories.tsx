import { StoryFn, Meta } from "@storybook/react";
import { CheckBoxType } from "./Checkbox.types";
import CheckboxRadix from "./Checkbox";

export default {
  title: "Components/Checkbox",
  component: CheckboxRadix,
} as Meta;

const Template: StoryFn<CheckBoxType> = (args) => <CheckboxRadix {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Checkbox",
  id: "checkbox",
};
