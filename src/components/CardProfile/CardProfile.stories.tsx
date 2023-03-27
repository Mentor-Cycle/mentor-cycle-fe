import { ChipOption } from "@components/Chip";
import { Meta, StoryObj } from "@storybook/react";
import CardProfile from "./CardProfile";

const meta = {
  title: "Data Display/CardProfile",
  component: CardProfile,
  argTypes: {
    name: { control: "text" },
    jobTitle: { control: "text" },
    location: { control: "text" },
    description: { control: "text" },
    chips: { control: "array" },
    image: { control: "text" },
  },
} satisfies Meta<typeof CardProfile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "John Doe",
    jobTitle: "Software Engineer",
    location: "New York, NY",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada bibendum ligula, vel tincidunt enim. ",
    chips: [ChipOption.FRONTEND, ChipOption.BACKEND, ChipOption.FULLSTACK],
    image: "https://via.placeholder.com/80",
  },
};
