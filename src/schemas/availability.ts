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
