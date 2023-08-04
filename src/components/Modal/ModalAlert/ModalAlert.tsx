import { useModal } from "contexts/ModalContext";
import { ModalActionTypes } from "contexts/types";
import { Modal } from "../Modal";

const ModalAlert = () => {
  const { openModal, closeModal, ALERT_MODAL } = useModal();
  return (
    <Modal.Root
      open={ALERT_MODAL}
      onOpenChange={() => closeModal(ModalActionTypes.ALERT_MODAL)}
    >
      <Modal.ContentAlert>
        <Modal.Title text="Tem certeza que deseja mudar a foto do perfil?" />
        <Modal.Description text=" " />
      </Modal.ContentAlert>
    </Modal.Root>
  );
};

export default ModalAlert;
