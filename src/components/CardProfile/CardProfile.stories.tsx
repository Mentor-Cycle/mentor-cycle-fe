import { Meta, StoryFn } from "@storybook/react";
import CardProfile from "./CardProfile";
import { CardProps } from "./CardProfile.types";

export default {
  title: "Cards/CardProfile",
  component: CardProfile,
  argTypes: {
    name: { control: "text" },
    jobTitle: { control: "text" },
    location: { control: "text" },
    description: { control: "text" },
    chips: { control: "array" },
    image: { control: "text" },
  },
} as Meta;

const Template: StoryFn<CardProps> = (args) => <CardProfile {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: "John Doe",
  jobTitle: "Software Engineer",
  location: "New York, NY",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada bibendum ligula, vel tincidunt enim. ",
  chips: [
    { variant: "primary", children: "Backend" },
    { variant: "primary", children: "FrontEnd" },
    { variant: "primary", children: "FullStack" },
  ],
  image: "https://via.placeholder.com/80",
};
