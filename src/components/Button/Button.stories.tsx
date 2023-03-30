import { StoryFn, Meta } from "@storybook/react";
import { Button } from "./Button";
import { ButtonProps } from "./Button.types";
import { FcGoogle } from "react-icons/fc";

import "../../styles/globals.css";

export default {
  title: "Forms/Button",
  component: Button,
  argTypes: {
    children: { control: "text" },
    variant: {
      control: {
        type: "inline-radio",
        options: ["primary", "secondary"],
      },
    },
    size: {
      control: {
        type: "inline-radio",
        options: ["regular", "small"],
      },
    },
  },
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Primary Button",
  variant: "primary",
  size: "regular",
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Secondary Button",
  variant: "secondary",
  size: "small",
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: "Disabled Button",
  variant: "primary",
  size: "regular",
  disabled: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: (
    <>
      <Button.Icon icon={FcGoogle} className="text-primary-03" />
      Add Item
    </>
  ),
  variant: "primary",
  size: "regular",
};

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);
