import { ICidadesIBGESchema } from "SIGNUP_SRC/schemas/cidades";
import { InputId, Errors, SelectOptions } from "SIGNUP_SRC/types/units/useGeo";

export type CitiesAPI = ICidadesIBGESchema | null;

export interface CitiesFactoryMethods extends InputId, Errors, SelectOptions {}
