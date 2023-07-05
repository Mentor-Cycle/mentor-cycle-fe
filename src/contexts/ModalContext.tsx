import ModalSettings from "@components/Modal/ModalSettings";
import React, { createContext, useContext, useState, ReactNode } from "react";
import ModalNotifications from "@components/Modal/ModalNotifications";
import { ModalActionTypes, ModalContextType, ModalState } from "./types";
import ScheduleMentorshipModal from "@components/Modal/ModalScheduleMentorship";

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
