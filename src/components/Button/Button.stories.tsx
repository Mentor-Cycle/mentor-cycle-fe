import { StoryFn, Meta } from "@storybook/react";
import { Button, Props } from "./Button";
import { MdAccountCircle } from "react-icons/md";
import "../../styles/globals.css";

export default {
  title: "Components/Button",
  component: Button,
  description: "The reusable button component",
  argTypes: {
    size: {
      control: {
        type: "inline-radio",
        options: ["regular", "small"],
      },
    },
    onClick: { action: "clicked" },
    disabled: { control: "boolean" },
    variant: {
      control: {
        type: "inline-radio",
        options: ["primary", "primarySmall", "secondary", "secondarySmall"],
      },
    },
    iconPosition: {
      control: {
        type: "inline-radio",
        options: ["left", "right"],
      },
    },
  },
} as Meta;

const Template: StoryFn<Props> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  children: "Primary Button",
  disabled: false,
  href: "/",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  children: "Secondary Button",
  disabled: false,
  href: "/",
};

export const PrimaryWithIcon = Template.bind({});
PrimaryWithIcon.args = {
  variant: "primary",
  children: "Button with Icon",
  icon: MdAccountCircle,
  disabled: false,
  iconPosition: "left",
  href: "/",
};

export const SecondaryWithIcon = Template.bind({});
SecondaryWithIcon.args = {
  variant: "secondary",
  children: "Button with Icon",
  icon: MdAccountCircle,
  disabled: false,
  iconPosition: "right",
  href: "/",
};

export const PrimarySmall = Template.bind({});
PrimarySmall.args = {
  variant: "primarySmall",
  children: "Primary Small Button",
  disabled: false,
  href: "/",
};

export const SecondarySmall = Template.bind({});
SecondarySmall.args = {
  variant: "secondarySmall",
  children: "Secondary Small Button",
  disabled: false,
  size: "small",
  href: "/",
};

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
  variant: "primary",
  children: "Disabled Primary Button",
  disabled: true,
  href: "/",
};

export const SecondaryDisabled = Template.bind({});
SecondaryDisabled.args = {
  variant: "secondary",
  children: "Disabled Secondary Button",
  disabled: true,
  href: "/",
};

export const PrimaryWithIconDisabled = Template.bind({});
PrimaryWithIconDisabled.args = {
  variant: "primary",
  children: "Disabled Button with Icon",
  icon: MdAccountCircle,
  disabled: true,
  iconPosition: "left",
  href: "/",
};

export const SecondaryWithIconDisabled = Template.bind({});
SecondaryWithIconDisabled.args = {
  variant: "secondary",
  children: "Disabled Button with Icon",
  icon: MdAccountCircle,
  disabled: true,
  iconPosition: "right",
  href: "/",
};
