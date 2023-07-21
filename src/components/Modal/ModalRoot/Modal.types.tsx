export type ModalRootProps = {
  openModalComponent?: React.ReactElement;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export type ModalContentProps = {
  type?: string;
  children: React.ReactNode;
  closeModalComponent?: React.ReactElement;
};
