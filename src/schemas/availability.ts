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

export const availabilityAPISchema = z
  .object({
    id: availabilitySchema.shape.mentorId,
    mentorId: availabilitySchema.shape.mentorId,
    weekDay: availabilitySchema.shape.weekDay,
    startHour: availabilitySchema.shape.startHour,
    startDate: availabilitySchema.shape.startDate,
    period: availabilitySchema.shape.period,
    endHour: availabilitySchema.shape.endHour,
    endDate: availabilitySchema.shape.endDate,
    active: availabilitySchema.shape.active,
    __typename: z.literal("Availability"),
  })
  .strict();
