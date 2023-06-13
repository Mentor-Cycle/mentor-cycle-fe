import { z } from "zod";

export const skillsSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const skillsAPISchema = z.object({
  id: skillsSchema.shape.id,
  name: skillsSchema.shape.name,
  __typename: z.literal("Skill"),
});
