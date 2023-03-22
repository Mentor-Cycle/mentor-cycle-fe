import { Meta, StoryFn } from "@storybook/react";
import MultiSelect from "./MultiSelect";

export default {
  title: "MultiSelect/MultiSelect",
  component: MultiSelect,
} as Meta;

const Template: StoryFn<typeof MultiSelect> = () => <MultiSelect />;
export const Default = Template.bind({});
