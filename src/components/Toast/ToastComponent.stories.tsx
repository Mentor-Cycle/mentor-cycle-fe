import { Meta, StoryObj } from "@storybook/react";
import { ToastComponent } from "./ToastComponent";
import "react-toastify/dist/ReactToastify.css";

const meta = {
  title: "Navigation/ToastComponent",
  component: ToastComponent,
} as Meta<typeof ToastComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: "Exemplo de mensagem",
    type: "info",
    buttonText: "Default",
  },
};
export const Success: Story = {
  args: {
    message: "Exemplo de mensagem",
    type: "success",
    buttonText: "Success",
  },
};
export const ErrorToast: Story = {
  args: {
    message: "Exemplo de mensagem",
    type: "error",
    buttonText: "Error",
  },
};
export const Warning: Story = {
  args: {
    message: "Exemplo de mensagem",
    type: "warning",
    buttonText: "Warning",
  },
};
