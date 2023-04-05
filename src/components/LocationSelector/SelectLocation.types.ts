export interface CountryProps {
  name: string;
  label: string;
  handleSelectedCountry: (value?: string) => void;
}

export interface StateProps {
  name: string;
  label: string;
  selectedCountry?: string;
  handleSelectedState: (value?: string) => void;
}

export interface CityProps {
  name: string;
  label: string;
  selectedCountry?: string;
  selectedState?: string;
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
  selectedCountry?: string;
  handleSelectedState: (selectedState?: string) => void;
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
  selectedState?: string | undefined;
  selectedCountry?: string | undefined;
  name: string;
  label: string;
}
