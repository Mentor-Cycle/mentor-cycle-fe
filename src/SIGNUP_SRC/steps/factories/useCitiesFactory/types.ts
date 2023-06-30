import { ICidadesIBGESchema } from "SIGNUP_SRC/schemas/cidades";
import { InputId, Errors, SelectOptions, Loading } from "SIGNUP_SRC/types/units/useGeo";

export type CitiesAPI = ICidadesIBGESchema | null;

export interface CitiesFactoryMethods extends InputId, Errors, SelectOptions, Loading {
  stateName?: string;
}
