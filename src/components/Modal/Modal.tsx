import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { ModalProps } from "./Modal.types";

const Modal = ({
  modalTitle,
  modalDescription,
  modalOpen,
  modalClose,
}: ModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{modalOpen}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="bg-neutral-01 fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[582px] translate-x-[-50%] translate-y-[-50%] py-16 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] ">
          <Dialog.Title className="text-center text-secondary-03">
            {modalTitle}
          </Dialog.Title>
          <Dialog.Description className="text-center py-6 text-secondary-03">
            {modalDescription}
          </Dialog.Description>
          <Dialog.Close asChild>
            <div>
              <button
                className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] items-center justify-center rounded-full"
                aria-label="Close"
              >
                <Cross1Icon />
              </button>
              {modalClose}
            </div>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
