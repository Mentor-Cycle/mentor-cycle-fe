import CardNotification from "@components/CardNotification/CardNotification";
import { useUser } from "@hooks/useUser";
import { useModal } from "contexts/ModalContext";
import { ModalActionTypes } from "contexts/types";
import { OptionStatus } from "schemas/create_event_output";
import { eventStatusToPortugueseMap } from "utils/parser/eventStatusToPortuguese";
import { Modal } from "../ModalRoot";

const ModalNotifications = () => {
  const { user } = useUser();
  const { closeModal, NOTIFICATIONS_MODAL } = useModal();
  const { notifications } = user;

  const getTranslatedText = (text = "") => {
    const [eventStatusInEnglish] = Object.keys(
      eventStatusToPortugueseMap
    ).filter((key) => text.includes(key));
    if (!eventStatusInEnglish) return text;
    const eventStatusInPortuguese =
      eventStatusToPortugueseMap[eventStatusInEnglish as OptionStatus];
    if (!eventStatusInPortuguese) return text;
    return text.replace(eventStatusInEnglish, eventStatusInPortuguese);
  };

  return (
    <Modal.Root
      open={NOTIFICATIONS_MODAL}
      onOpenChange={() => closeModal(ModalActionTypes.NOTIFICATIONS_MODAL)}
    >
      <Modal.Content>
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
                    description={getTranslatedText(
                      notification.data?.description
                    )}
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
      </Modal.Content>
    </Modal.Root>
  );
};

export default ModalNotifications;
