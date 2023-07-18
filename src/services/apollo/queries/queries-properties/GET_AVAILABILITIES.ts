import {
  availabilityAPISchema,
  availabilitySchema,
  userAPISchema,
} from "schemas";
import { z } from "zod";

export const GET_AVAILABILITIES_queryDataSchema = userAPISchema
  .pick({
    firstName: true,
    lastName: true,
    __typename: true,
  })
  .extend({
    availability: z
      .array(
        availabilityAPISchema.pick({
          active: true,
          weekDay: true,
          startHour: true,
          endHour: true,
          startDate: true,
          endDate: true,
          __typename: true,
        })
      )
      .nullable(),
  });

export const GET_AVAILABILITIES_queryResponseSchema = z.object({
  findMentorAvailability: GET_AVAILABILITIES_queryDataSchema,
});

export const GET_AVAILABILITIES_variablesSchema = availabilitySchema.pick({
  mentorId: true,
});

/**
 * Types
 */
export type TGET_AVAILABILITIES_queryDataSchema = z.infer<
  typeof GET_AVAILABILITIES_queryDataSchema
>;

export type TGET_AVAILABILITIES_queryResponseSchema = z.infer<
  typeof GET_AVAILABILITIES_queryResponseSchema
>;

export type TGET_AVAILABILITIES_variablesSchema = z.infer<
  typeof GET_AVAILABILITIES_variablesSchema
>;
