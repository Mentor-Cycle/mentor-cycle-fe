import ModalNotifications from "@components/Modal/ModalNotifications";
import ScheduleMentorshipModal from "@components/Modal/ModalScheduleMentorship";
import EditProfileModal from "@components/Modal/EditProfile/EditProfileModal";
import ModalSettings from "@components/Modal/ModalSettings";
import ModalAlert from "@components/Modal/ModalAlert";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React, {
  Children,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { ModalActionTypes, ModalContextType, ModalState } from "./types";
import { Cross1Icon } from "@radix-ui/react-icons";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Estado dos modais
  const [modalState, setModalState] = useState<ModalState>({
    [ModalActionTypes.EDIT_PROFILE_MODAL]: false,
    [ModalActionTypes.SETTINGS_MODAL]: false,
    [ModalActionTypes.NOTIFICATIONS_MODAL]: false,
    [ModalActionTypes.SCHEDULE_MENTORSHIP_MODAL]: false,
    [ModalActionTypes.ALERT_MODAL]: false,
  });

  const openModal = (modalName: string) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: true,
    }));
  };

  const closeModal = (modalName: string) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: false,
    }));
  };

  // Combine o estado dos modais e as funções em um único objeto para ser fornecido pelo contexto
  const contextValue: ModalContextType = {
    ...modalState,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <ScheduleMentorshipModal />
      <ModalSettings />
      <ModalNotifications />
      <ModalAlert />
      <EditProfileModal />
    </ModalContext.Provider>
  );
};

// Hook personalizado para usar o ModalContext
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal deve ser usado dentro do ModalProvider");
  }
  return context;
};
