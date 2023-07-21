export type ModalRootProps = {
  openModalComponent?: React.ReactElement;
  closeModalComponent?: React.ReactElement;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};
