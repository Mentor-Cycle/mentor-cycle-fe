import ModalSettings from "@components/Modal/ModalSettings";
import { ScheduleMentorshipModal } from "@components/ScheduleMentorshipModal";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Defina o tipo para o estado do ModalContext
type ModalState = {
  editProfileModal: boolean;
  settingsModal: boolean;
  scheduleMentorshipModal: boolean;
};

// Defina o tipo para as funções do ModalContext
type ModalActions = {
  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
};

// Defina o tipo para o contexto do ModalContext
type ModalContextType = ModalState & ModalActions;

// Crie o contexto do ModalContext
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Estado dos modais
  const [modalState, setModalState] = useState<ModalState>({
    editProfileModal: false,
    settingsModal: false,
    scheduleMentorshipModal: false,
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
      <ModalSettings />
      <ScheduleMentorshipModal />
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
