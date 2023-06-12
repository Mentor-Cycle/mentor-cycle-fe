import {
  GET_AVAILABILITIES_queryDataSchema,
  GET_AVAILABILITIES_queryResponseSchema,
} from "services/apollo/queries/queries-properties/GET_AVAILABILITIES";
import {
  GET_ME_queryDataSchema,
  GET_ME_queryResponseSchema,
} from "services/apollo/queries/queries-properties/GET_ME";
import {
  GET_SKILLS_queryDataSchema,
  GET_SKILLS_queryResponseSchema,
} from "services/apollo/queries/queries-properties/GET_SKILLS";
import { z } from "zod";

export type IData_GET_ME = z.infer<typeof GET_ME_queryDataSchema>;
export type IResponse_GET_ME = z.infer<typeof GET_ME_queryResponseSchema>;

export type IData_GET_SKILLS = z.infer<typeof GET_SKILLS_queryDataSchema>;
export type IResponse_GET_SKILLS = z.infer<
  typeof GET_SKILLS_queryResponseSchema
>;

export type IData_GET_AVAILABILITY = z.infer<
  typeof GET_AVAILABILITIES_queryDataSchema
>;
export type IResponse_GET_AVAILABILITY = z.infer<
  typeof GET_AVAILABILITIES_queryResponseSchema
>;
