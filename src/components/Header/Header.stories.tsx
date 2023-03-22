import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { HeaderProps } from "./Header.types";
import Header from "./Header";

export default {
  title: "Headers/Header",
  component: Header,
} as Meta;

const Template: StoryFn<HeaderProps> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  isLogged: true,
};
