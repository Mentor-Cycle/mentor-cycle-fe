import * as Dialog from "@radix-ui/react-dialog";
import { ModalContentAlertProps } from "./Modal.types";

const ModalTitle = ({ children }: ModalContentAlertProps) => {
  return <Dialog.Title>{children}</Dialog.Title>;
};

export default ModalTitle;
