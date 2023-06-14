import { z } from "zod";
import { participantInfoAPISchema } from "schemas/participant_info";

export const createEventOutputSchema = z
  .object({
    id: z.string(),
    mentorId: z.string(),
    participants: z.array(participantInfoAPISchema),
    status: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    active: z.boolean(),
    meetingLink: z.string(),
  })
  .strict();

export const createEventOutputAPISchema = z
  .object({
    id: createEventOutputSchema.shape.id,
    mentorId: createEventOutputSchema.shape.mentorId,
    participants: createEventOutputSchema.shape.participants,
    status: createEventOutputSchema.shape.status,
    startDate: createEventOutputSchema.shape.startDate,
    endDate: createEventOutputSchema.shape.endDate,
    active: createEventOutputSchema.shape.active,
    meetingLink: createEventOutputSchema.shape.meetingLink,
    __typename: z.literal("CreateEventOutput"),
  })
  .strict();
