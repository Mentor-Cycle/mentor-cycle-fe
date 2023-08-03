import * as Dialog from "@radix-ui/react-dialog";
import { ModalRootProps } from "./Modal.types";

const ModalDescription = ({ text }: ModalRootProps) => {
  return <Dialog.Description className="text-base">{text}</Dialog.Description>;
};

export default ModalDescription;
