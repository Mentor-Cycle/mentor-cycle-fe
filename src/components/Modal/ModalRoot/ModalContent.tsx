import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { ModalContentProps } from "./Modal.types";

const ModalContent = ({
  closeModalComponent,
  children,
  type = "modal",
}: ModalContentProps) => {
  return (
    <Dialog.Content
      className={`text-center py-6 text-secondary-03 z-50 rounded-lg bg-scroll overflow-y-auto bg-neutral-01 dark:bg-secondary-02 fixed top-[50%] left-[50%] max-h-[90vh] w-auto translate-x-[-50%] translate-y-[-50%]  shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] 
    ${type == "modal" ? "border border-neutral-02" : ""}`}
    >
      {children}
      {type == "modal" ? (
        <Dialog.Close asChild>
          <div>
            <button
              className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] items-center justify-center rounded-full dark:text-neutral-02"
              aria-label="Close"
            >
              <Cross1Icon />
            </button>
            {closeModalComponent}
          </div>
        </Dialog.Close>
      ) : (
        ""
      )}
    </Dialog.Content>
  );
};

export default ModalContent;
