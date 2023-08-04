import Button from "@components/Button";
import { Modal } from "@components/Modal/Modal";

export const SuccessfullyCreated = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal.Root open={open} onOpenChange={onClose}>
      <section className="py-10 px-16">
        <h1 className="text-3xl font-extrabold text-secondary-02">
          Agenda criada!
        </h1>
        <p className="font-semibold mt-10 text-success-01">
          Sua agenda foi criada com sucesso!
        </p>
        <Button
          size="small"
          onClick={onClose}
          variant="secondary"
          className="mt-28 w-2/3 mx-auto"
        >
          Finalizar
        </Button>
      </section>
    </Modal.Root>
  );
};
