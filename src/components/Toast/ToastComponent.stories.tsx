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
