import { z } from "zod";

export const availabilitySchema = z.object({
  id: z.string(),
  mentorId: z.string(),
  weekDay: z.number(),
  startHour: z.string(),
  period: z.string(),
  endHour: z.string(),
  active: z.boolean(),
});
