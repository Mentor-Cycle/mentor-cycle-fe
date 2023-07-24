import { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import ModalRoot from "./ModalRoot/ModalRoot";

const meta = {
  title: "Data Display/Modal",
  component: Modal.Root,
};
export default meta;
type Story = StoryObj<typeof ModalRoot>;

export const Default: Story = {
  args: {
    children: (
      <Modal.Content>
        <Modal.Title text="Title" />
        <Modal.Description text="Description" />
        <div>Content</div>
      </Modal.Content>
    ),
    open: false,
    onOpenChange: () => {},
  },
};

export const ModalAlert: Story = {
  args: {
    children: (
      <Modal.ContentAlert>
        <Modal.Title text="Title" />
        <Modal.Description text="Description" />
      </Modal.ContentAlert>
    ),
    open: false,
  },
};
