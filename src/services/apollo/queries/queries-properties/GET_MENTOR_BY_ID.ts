import { availabilityAPISchema, userAPISchema } from "schemas";
import { z } from "zod";

export const GET_MENTOR_BY_ID_queryDataSchema = userAPISchema
  .pick({
    id: true,
    firstName: true,
    lastName: true,
    skills: true,
    country: true,
    state: true,
    description: true,
    photoUrl: true,
    jobTitle: true,
    jobCompany: true,
    biography: true,
    email: true,
    github: true,
    linkedin: true,
    yearsOfExperience: true,
  })
  .extend({
    availability: z
      .array(
        availabilityAPISchema.pick({
          weekDay: true,
          startHour: true,
        })
      )
      .nullable(),
  });

export const GET_MENTOR_BY_ID_queryResponseSchema = z.object({
  findOneMentor: GET_MENTOR_BY_ID_queryDataSchema,
});

export const GET_MENTOR_BY_ID_variablesSchema = z.object({
  id: userAPISchema.shape.id,
});

/**
 * Types
 */
export type TGET_MENTOR_BY_ID_queryDataSchema = z.infer<
  typeof GET_MENTOR_BY_ID_queryDataSchema
>;
export type TGET_MENTOR_BY_ID_queryResponseSchema = z.infer<
  typeof GET_MENTOR_BY_ID_queryResponseSchema
>;
export type TGET_MENTOR_BY_ID_variablesSchema = z.infer<
  typeof GET_MENTOR_BY_ID_variablesSchema
>;
