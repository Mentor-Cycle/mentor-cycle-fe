import { IEditProfileSubmitData } from "@components/EditProfile/EditProfile.form";
import { Dispatch, SetStateAction } from "react";
import { SingleValue } from "react-select";

export interface EditProfileProps {
  openEditProfile: boolean;
  setOpenEditProfile: Dispatch<SetStateAction<boolean>>;
}

export type IEditProfileFormData = Omit<
  IEditProfileSubmitData,
  "countries" | "state" | "skills" | "id"
>;

export interface ILocationInterface {
  label: string;
  value: string;
}
