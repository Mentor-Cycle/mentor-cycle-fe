import { useModal } from "contexts/ModalContext";
import { ModalActionTypes } from "contexts/types";
import { Modal } from "../Modal";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "@components/Button";

interface ModalAlertProps {
  Title: string;
  OnClick: () => void;
}

const ModalAlert = ({ Title, OnClick }: ModalAlertProps) => {
  const { openModal, closeModal, ALERT_MODAL } = useModal();

  return (
    <Modal.Root
      open={ALERT_MODAL}
      onOpenChange={() => closeModal(ModalActionTypes.ALERT_MODAL)}
    >
      <Modal.Content type="Alert">
        <div className="flex flex-col items-center">
          <div className="max-xl:px-5 py-16 w-[300px] xs:w-[380px] sm:w-[600px] md:w-auto p-2 lg:px-20 ">
            <h1 className="font-bold text-2xl">
              Tem certeza que deseja mudar a foto?
            </h1>
          </div>

          <div className="flex gap-6 w-[300px] xs:w-[380px] sm:w-[600px] md:w-[60%]">
            <Button
              type="submit"
              variant="primary"
              size="small"
              onClick={OnClick}
            >
              Sim, pode mudar
            </Button>

            <Dialog.Close asChild>
              <Button type="button" variant="secondary" size="small">
                Cancelar
              </Button>
            </Dialog.Close>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};

export default ModalAlert;
