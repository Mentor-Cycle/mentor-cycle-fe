import * as Dialog from "@radix-ui/react-dialog";
import { ModalRootProps } from "./Modal.types";

const ModalDescription = ({ children }: ModalRootProps) => {
  return <Dialog.Description>{children}</Dialog.Description>;
};

export default ModalDescription;
