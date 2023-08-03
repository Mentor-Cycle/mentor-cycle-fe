export enum ModalActionTypes {
  EDIT_PROFILE_MODAL = "EDIT_PROFILE_MODAL",
  SETTINGS_MODAL = "SETTINGS_MODAL",
  NOTIFICATIONS_MODAL = "NOTIFICATIONS_MODAL",
  SCHEDULE_MENTORSHIP_MODAL = "SCHEDULE_MENTORSHIP_MODAL",
  ALERT_MODAL = "ALERT_MODAL",
}

export type ModalState = {
  [ModalActionTypes.EDIT_PROFILE_MODAL]: boolean;
  [ModalActionTypes.SETTINGS_MODAL]: boolean;
  [ModalActionTypes.NOTIFICATIONS_MODAL]: boolean;
  [ModalActionTypes.SCHEDULE_MENTORSHIP_MODAL]: boolean;
  [ModalActionTypes.ALERT_MODAL]: boolean;
};

export type ModalActions = {
  openModal: (modalName: ModalActionTypes) => void;
  closeModal: (modalName: ModalActionTypes) => void;
};

export type ModalContextType = ModalState & ModalActions;
