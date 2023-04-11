import { StoryObj } from "@storybook/react";
import Modal from "./Modal";
export default {
  title: "Data Display/Modal",
  component: Modal,
};
export const Default: StoryObj<typeof Modal> = {
  args: {
    modalTitle: "TITULO MODAL",
    modalDescription: "DESCRIÇÃO MODAL",
    modalOpen: <button>Abrir</button>,
  },
};
