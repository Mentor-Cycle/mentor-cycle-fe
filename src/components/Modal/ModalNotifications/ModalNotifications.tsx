import CardNotification from "@components/CardNotification/CardNotification";
import { useUser } from "@hooks/useUser";
import { useModal } from "contexts/ModalContext";
import Modal from "..";
import { ModalActionTypes } from "contexts/types";

const ModalNotifications = () => {
  const { user } = useUser();
  const { closeModal, NOTIFICATIONS_MODAL } = useModal();
  const { notifications } = user;

  return (
    <Modal
      open={NOTIFICATIONS_MODAL}
      onOpenChange={() => closeModal(ModalActionTypes.NOTIFICATIONS_MODAL)}
    >
      <div className="flex flex-col p-6 gap-12 m-auto ">
        <h1 className=" self-start text-secondary-02 text-2xl font-bold">
          Notificações
        </h1>
        <div className="flex flex-col gap-8 ">
          {notifications?.length ? (
            notifications
              ?.slice(0, 5)
              .map((notification) => (
                <CardNotification
                  key={notification.id}
                  description={notification.data?.description || ""}
                  name={notification.data?.title || ""}
                  imgUrl={notification.data?.imageUrl || ""}
                  alreadyViewed={notification.read}
                />
              ))
          ) : (
            <p className="text-secondary-02 text-xl font-bold">
              Nenhuma notificação
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalNotifications;
