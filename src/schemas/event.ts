import { z } from "zod";
import { userAPISchema } from "schemas/user";

export const eventSchema = z
  .object({
    id: z.string(),
    mentorId: z.string(),
    participants: z.array(userAPISchema),
    status: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    active: z.boolean(),
    meetingLink: z.string(),
  })
  .strict();

export const eventAPISchema = z.object({
  id: eventSchema.shape.id,
  mentorId: eventSchema.shape.mentorId,
  participants: eventSchema.shape.participants,
  status: eventSchema.shape.status,
  startDate: eventSchema.shape.startDate,
  endDate: eventSchema.shape.endDate,
  active: eventSchema.shape.active,
  meetingLink: eventSchema.shape.meetingLink,
  __typename: z.literal("Event"),
});
