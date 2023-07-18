import { z } from "zod";

export const skillsSchema = z.object({
  id: z.string(),
  name: z.string(),
  __typename: z.literal("Skill"),
});
