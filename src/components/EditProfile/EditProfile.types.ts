import { MultiSelectOptions } from "@components/MultiSelect/MultiSelect.types";
import { Country, State } from "@hooks/useFetch.types";
import { Dispatch, SetStateAction } from "react";
import { SingleValue } from "react-select";

export interface EditProfileProps {
  openEditProfile: boolean;
  setOpenEditProfile: Dispatch<SetStateAction<boolean>>;
}

export interface IEditProfileFormData {
  email: string;

  id: string;
  firstName: string;
  lastName: string | null;
  jobTitle: string | null;
  biography: string | null;
  description: string | null;
  github: string | null;
  linkedin: string | null;
  state: string;
  country: string;
  skills: string[];
  yearsOfExperience: number;
}
