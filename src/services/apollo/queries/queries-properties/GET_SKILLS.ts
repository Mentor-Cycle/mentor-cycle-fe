import { skillsAPISchema } from "schemas";
import { z } from "zod";

export const GET_SKILLS_queryDataSchema = skillsAPISchema.pick({
  __typename: true,
  name: true,
});

export const GET_SKILLS_queryResponseSchema = z.object({
  findAllSkills: z.array(GET_SKILLS_queryDataSchema),
});

/**
 * Types
 */
export type TGET_SKILLS_queryDataSchema = z.infer<
  typeof GET_SKILLS_queryDataSchema
>;
export type TGET_SKILLS_queryResponseSchema = z.infer<
  typeof GET_SKILLS_queryResponseSchema
>;
