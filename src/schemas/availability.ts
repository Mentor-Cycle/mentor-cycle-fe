import { z } from "zod";

export const availabilitySchema = z.object({
  id: z.string(),
  mentorId: z.string(),
  weekDay: z.number(),
  startHour: z.string(),
  startDate: z.string(),
  period: z.string(),
  endHour: z.string(),
  endDate: z.string(),
  active: z.boolean(),
});

export const availabilityAPISchema = z.object({
  id: availabilitySchema.shape.mentorId,
  mentorId: availabilitySchema.shape.mentorId,
  weekDay: z.coerce.string(),
  startHour: availabilitySchema.shape.mentorId,
  startDate: availabilitySchema.shape.mentorId,
  period: availabilitySchema.shape.mentorId,
  endHour: availabilitySchema.shape.mentorId,
  endDate: availabilitySchema.shape.mentorId,
  active: availabilitySchema.shape.mentorId,
  __typename: z.literal("Availability"),
});
