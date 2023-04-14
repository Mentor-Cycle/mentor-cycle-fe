import { Meta, StoryObj } from "@storybook/react";
import imgPerfil from "../../public/imgCard.png";
import CardNotification from "./CardNotification";

/**
 * Primary UI component for user interaction
 */

const meta = {
  title: "CardNotification/Data Display",
  component: CardNotification,
  argTypes: {
    description: { control: "text" },
    name: { control: "text" },
    imgUrl: { control: "text" },
  },
} satisfies Meta<typeof CardNotification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet.",
    imgUrl: imgPerfil.src,
    name: "Ronald Richards",
  },
};
