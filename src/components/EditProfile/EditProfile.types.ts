import { Dispatch, SetStateAction } from "react";

export interface EditProfileProps {
  openEditProfile: boolean;
  setOpenEditProfile: Dispatch<SetStateAction<boolean>>;
}
