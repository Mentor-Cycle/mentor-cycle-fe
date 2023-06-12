import { availabilitySchema, userSessionSchema } from "schemas";
import { z } from "zod";

export const GET_AVAILABILITIES_queryDataSchema = userSessionSchema
  .pick({
    firstName: true,
    lastName: true,
  })
  .merge(
    z.object({
      availability: z.array(
        availabilitySchema.pick({
          active: true,
          weekDay: true,
          startHour: true,
          endHour: true,
          startDate: true,
          endDate: true,
        })
      ),
    })
  );

export const GET_AVAILABILITIES_queryResponseSchema = z.object({
  findMentorAvailability: GET_AVAILABILITIES_queryDataSchema,
});

export const GET_AVAILABILITIES_variablesSchema = availabilitySchema.pick({
  mentorId: true,
});
