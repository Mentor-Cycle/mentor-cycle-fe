import { ICidadesIBGESchema } from "schemas/cidades";
import { InputId, Errors, SelectOptions, Loading } from "types/units/useGeo";
import { Pretify } from "types/helpers";

export type CitiesAPI = ICidadesIBGESchema | null;

export type CitiesFactoryMethods = Pretify<
  InputId & Errors & SelectOptions & Loading & CustomMethods
>;

type CustomMethods = {
  stateName?: string;
};
