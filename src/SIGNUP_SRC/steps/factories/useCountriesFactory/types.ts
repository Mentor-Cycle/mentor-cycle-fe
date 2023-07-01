import { IPaisesIBGESchema } from "SIGNUP_SRC/schemas/paises";
import { InputId, SelectOptions, Errors, Loading } from "SIGNUP_SRC/types/units/useGeo";
import { Pretify } from "types/helpers";

export type Countries = IPaisesIBGESchema | null;

export type CountriesFactoryMethods = Pretify<
  InputId & SelectOptions & Errors & Loading & CustomMethods
>;

type CustomMethods = {
  isInBrazil: boolean;
};
