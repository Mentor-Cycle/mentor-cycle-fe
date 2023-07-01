import { IEstadosIBGESchema } from "SIGNUP_SRC/schemas/estados";
import {
  InputId,
  Errors,
  SelectOptions,
  GetFieldController,
} from "SIGNUP_SRC/types/units/useGeo";
import { Pretify } from "types/helpers";

export type StatesAPI = IEstadosIBGESchema | null;

export type StatesFactoryMethods = Pretify<
  InputId & Errors & SelectOptions & GetFieldController & CustomMethods
>;

type CustomMethods = {
  userAlreadyChooseState: boolean;
};
