export type ModalProps = {
  openModalComponent?: React.ReactElement;
  children: React.ReactNode;
  closeModalComponent?: React.ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};
