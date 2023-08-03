import * as Dialog from "@radix-ui/react-dialog";
import { ModalRootProps } from "./Modal.types";

const ModalTitle = ({ text }: ModalRootProps) => {
  return (
    <Dialog.Title>
      <h1 className="text-xl font-bold">{text}</h1>
    </Dialog.Title>
  );
};

export default ModalTitle;
