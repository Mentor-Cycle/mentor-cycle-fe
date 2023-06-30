import { Errors, Loading, InputId } from "SIGNUP_SRC/types/units/useGeo";
import { TGET_SKILLS_queryDataSchema } from "services/apollo/queries/queries-properties";

export type Skills = TGET_SKILLS_queryDataSchema[];

export interface SkillsFactoryMethods extends InputId, Errors, Loading {
  options: string[];
}
