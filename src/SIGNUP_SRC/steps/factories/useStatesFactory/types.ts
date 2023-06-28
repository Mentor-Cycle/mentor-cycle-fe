import { IEstadosIBGESchema } from "SIGNUP_SRC/schemas/estados";
import { InputId, Errors, SelectOptions } from "SIGNUP_SRC/types/units/useGeo";

export type States = IEstadosIBGESchema | null;

export interface StatesFactoryMethods extends InputId, Errors, SelectOptions {}
