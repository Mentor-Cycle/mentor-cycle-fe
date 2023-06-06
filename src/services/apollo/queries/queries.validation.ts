import { availabilitySchema, userSchema } from "schemas";
import { z } from "zod";

export const GET_ME_queryUserSchema = userSchema
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
  })
  .merge(
    z.object({
      availability: z.array(
        availabilitySchema.pick({
          startHour: true,
          weekDay: true,
        })
      ),
    })
  );

export const GET_ME_querySchema = z.object({
  data: z.object({
    me: GET_ME_queryUserSchema,
  }),
});
