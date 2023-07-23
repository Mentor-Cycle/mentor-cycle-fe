import { DialogProps } from "@radix-ui/react-dialog";
import { Pretify } from "types/helpers";

export type ModalProps = Pretify<
  {
    openModalComponent?: React.ReactElement;
    children: React.ReactNode;
    closeModalComponent?: React.ReactElement;
  } & Pick<DialogProps, "open" | "onOpenChange">
>;
