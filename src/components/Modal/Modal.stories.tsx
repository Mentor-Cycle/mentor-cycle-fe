import Modal from "./Modal";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Data Display/Modal",
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h1>Title</h1>
        <p>Content</p>
      </div>
    ),
    open: false,
    onOpenChange: () => {},
    type: "modal",
  },
};
