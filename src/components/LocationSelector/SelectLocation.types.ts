import * as Select from "@radix-ui/react-select";

export type SelectItemProps = Select.SelectItemProps & {
  value: string | undefined;
};

export interface Country {
  nome: string;
  id: { M49: number };
}

export type SelectProps = {
  label: string;
  placeholder: string;
  items: Country[];
  onValueChange: (value: string) => void;
};

export type CountryProps = {
  handleSelectedCountry: (value: string) => void;
};

export interface StateProps {
  sigla: string;
  nome: string;
}

export interface StatePropsConect {
  handleSelectedCountry?: (value: string) => void;
  handleSelectedState: (value: string) => void;
  selectedCountry: string | null;
}

export interface CitiesProps {
  selectedState: string | null;
  selectedCountry: string | null;
  id?: number;
  nome?: string;
}
