import { Meta, StoryObj } from "@storybook/react";
import { InputElement } from "./Input";

const meta = {
  title: "Forms/Input",
  component: InputElement,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KnsardnDQ2lDKUYo58G8Pf/Mentor-Cycle?node-id=1921-5594&t=GMEw33yWzk1MdUGZ-0",
    },
  },
  argTypes: {
    size: {
      options: ["standard", "small"],
      control: { type: "select" },
    },
    type: {
      options: ["text", "password", "email"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof InputElement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "input",
    label: "Usuário",
    placeholder: "Digite seu usuário",
    type: "text",
  },
};
