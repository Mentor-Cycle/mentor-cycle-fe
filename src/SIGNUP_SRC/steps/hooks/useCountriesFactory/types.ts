import { IPaisesIBGESchema } from "SIGNUP_SRC/schemas/paises";
import { ReactSelectInterface } from "types/react-select";

export type Countries = IPaisesIBGESchema | null;

export interface CountriesFactoryMethods {
  options: ReactSelectInterface[] | null;
  isInBrazil: boolean;
}
