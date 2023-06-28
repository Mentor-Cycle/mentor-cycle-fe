import { IPaisesIBGESchema } from "SIGNUP_SRC/schemas/paises";
import { InputId, SelectOptions, Errors } from "SIGNUP_SRC/types/units/useGeo";

export type Countries = IPaisesIBGESchema | null;

export interface CountriesFactoryMethods extends InputId, SelectOptions, Errors {
  isInBrazil: boolean;
}
