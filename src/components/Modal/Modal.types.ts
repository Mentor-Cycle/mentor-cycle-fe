export type ModalProps = {
  openModalComponent?: React.ReactElement;
  children: React.ReactElement;
  closeModalComponent?: React.ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};
