import CardNotification from "@components/CardNotification/CardNotification";
import { useUser } from "@hooks/useUser";
import { useModal } from "contexts/ModalContext";
import { ModalActionTypes } from "contexts/types";
import { OptionStatus } from "schemas/create_event_output";
import { eventStatusToPortugueseMap } from "utils/parser/eventStatusToPortuguese";
import { Modal } from "../Modal";

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
        <div className="m-auto flex flex-col gap-4 sm:p-6 ">
          <h1 className="self-start text-2xl font-bold text-secondary-02">
            Notificações
          </h1>
          <div className="flex flex-col gap-4 ">
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
              <p className="text-xl font-bold text-secondary-02">
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
