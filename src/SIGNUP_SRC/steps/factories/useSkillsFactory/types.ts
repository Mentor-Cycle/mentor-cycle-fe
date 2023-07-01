import { Errors, Loading, InputId } from "SIGNUP_SRC/types/units/useGeo";
import { TGET_SKILLS_queryDataSchema } from "services/apollo/queries/queries-properties";
import { Pretify } from "types/helpers";

export type Skills = TGET_SKILLS_queryDataSchema[];

export type SkillsFactoryMethods = Pretify<InputId & Errors & Loading & CustomMethods>;

type CustomMethods = {
  options: string[];
};
