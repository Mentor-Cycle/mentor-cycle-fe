import Button from "@components/Button/Button";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { ModalRootProps } from "./Modal.types";

const ModalRoot = ({
  openModalComponent,
  children,
  open,
  onOpenChange,
}: ModalRootProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{openModalComponent}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        {children}
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalRoot;
