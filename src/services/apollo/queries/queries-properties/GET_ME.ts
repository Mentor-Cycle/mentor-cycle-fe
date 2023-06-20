import { availabilityAPISchema, userAPISchema } from "schemas";
import { z } from "zod";

export const GET_ME_queryDataSchema = userAPISchema
  .pick({
    id: true,
    firstName: true,
    lastName: true,
    photoUrl: true,
    email: true,
    jobTitle: true,
    isMentor: true,
    skills: true,
    biography: true,
    yearsOfExperience: true,
    country: true,
    description: true,
    github: true,
    linkedin: true,
    state: true,
    __typename: true,
  })
  .extend({
    availability: z
      .array(
        availabilityAPISchema.pick({
          startHour: true,
          weekDay: true,
          __typename: true,
        })
      )
      .nullable(),
  })
  .strict();

export const GET_ME_queryResponseSchema = z
  .object({
    me: GET_ME_queryDataSchema,
  })
  .strict();

/**
 * Types
 */
export type TGET_ME_queryDataSchema = z.infer<typeof GET_ME_queryDataSchema>;

export type TGET_ME_queryResponseSchema = z.infer<
  typeof GET_ME_queryResponseSchema
>;
