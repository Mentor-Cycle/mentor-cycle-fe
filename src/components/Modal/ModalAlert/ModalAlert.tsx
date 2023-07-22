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
        <div className="max-xl:px-5 py-16 w-[300px] xs:w-[380px] sm:w-[600px] md:w-auto p-2 lg:px-20 ">
          <Modal.Title text="Tem certeza que deseja mudar a foto do perfil?" />
          <Modal.Description text=" " />
        </div>
      </Modal.ContentAlert>
    </Modal.Root>
  );
};

export default ModalAlert;
