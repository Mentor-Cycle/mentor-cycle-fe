import { IEditProfileSubmitData } from "@components/Modal/EditProfile/EditProfileModal.form";

export type IEditProfileFormData = Omit<
  IEditProfileSubmitData,
  "countries" | "state" | "skills" | "id"
>;

export interface ILocationInterface {
  label: string;
  value: string;
}
