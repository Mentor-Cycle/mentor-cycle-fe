import { GET_MENTORS_queryDataSchema } from "services/apollo/queries/queries-properties";
import { z } from "zod";

export const mentorClientSchema = GET_MENTORS_queryDataSchema.pick({
  description: true,
  firstName: true,
  id: true,
  jobTitle: true,
  lastName: true,
  __typename: true,
})
  .extend({
    image: z.object({
      blurDataURL: z.string().optional(),
      blurHeight: z.number().optional(),
      blurWidth: z.number().optional(),
      height: z.number(),
      width: z.number(),
      src: z.string(),
    }),
    chips: z.array(z.string()).nullable(),
    location: z.string(),
  })
  .strict();

export type IMentorClient = z.infer<typeof mentorClientSchema>;
