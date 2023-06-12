import { availabilitySchema, userSessionSchema } from "schemas";
import { z } from "zod";

export const GET_ME_queryDataSchema = z.object({
  id: userSessionSchema.shape.id,
  firstName: userSessionSchema.shape.firstName,
  lastName: userSessionSchema.shape.lastName,
  photoUrl: userSessionSchema.shape.photoUrl,
  email: userSessionSchema.shape.email,
  jobTitle: userSessionSchema.shape.jobTitle,
  isMentor: userSessionSchema.shape.isMentor,
  skills: userSessionSchema.shape.skills,
  biography: userSessionSchema.shape.biography,
  yearsOfExperience: userSessionSchema.shape.yearsOfExperience,
  country: userSessionSchema.shape.country,
  description: userSessionSchema.shape.description,
  github: userSessionSchema.shape.github,
  linkedin: userSessionSchema.shape.linkedin,
  state: userSessionSchema.shape.state,
  availability: z
    .array(
      z.object({
        startHour: availabilitySchema.shape.startHour,
        weekDay: availabilitySchema.shape.weekDay,
      })
    )
    .nullable(),
});

export const GET_ME_queryResponseSchema = z.object({
  me: GET_ME_queryDataSchema,
});

export type TGET_ME_queryDataSchema = z.infer<typeof GET_ME_queryDataSchema>;
export type TGET_ME_queryResponseSchema = z.infer<
  typeof GET_ME_queryResponseSchema
>;
