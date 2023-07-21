export type ModalProps = {
  openModalComponent?: React.ReactElement;
  type: React.ReactNode;
  children: React.ReactNode;
  closeModalComponent?: React.ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};
