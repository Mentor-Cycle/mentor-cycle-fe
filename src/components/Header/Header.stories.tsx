import { StoryObj } from "@storybook/react";
import Header from "./Header";
export default {
  title: "Navigation/Header",
  component: Header,
};
export const Default: StoryObj<typeof Header> = {
  args: {
    isLogged: true,
  },
};
