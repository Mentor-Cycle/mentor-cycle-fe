export interface CountryProps {
  name: string;
  label: string;
}

export interface StateProps {
  name: string;
  label: string;
}

export interface CityProps {
  name: string;
  label: string;
}

export interface PersonalInformationProps {
  formData: FormDataTypes;
}

export interface FormDataTypes {
  skills: string[];
}

import { ActionMeta } from "react-select";

export interface SelectStatesProps {
  name: string;
  label: string;
}

export interface StateOption {
  label: string;
  value: string;
}

export type StateSelectOption = ActionMeta<StateOption>;

export interface CityOption {
  id: number;
  nome: string;
}

export interface SelectCitiesProps {
  name: string;
  label: string;
}
