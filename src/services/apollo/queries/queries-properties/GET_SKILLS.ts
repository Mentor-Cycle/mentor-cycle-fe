import { skillsSchema } from "schemas";
import { z } from "zod";

export const GET_SKILLS_queryDataSchema = skillsSchema.pick({
  __typename: true,
  name: true,
});

export const GET_SKILLS_queryResponseSchema = z.object({
  findAllSkills: z.array(GET_SKILLS_queryDataSchema),
});
