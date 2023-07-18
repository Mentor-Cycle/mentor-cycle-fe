import { userSchema } from "schemas/user";
import { z } from "zod";

export const participantInfoSchema = z.object({
  user: userSchema,
  assignedBy: z.string(),
  assignedAt: z.date(),
});

export const participantInfoAPISchema = z.object({
  user: participantInfoSchema.shape.user,
  assignedBy: participantInfoSchema.shape.assignedBy,
  assignedAt: participantInfoSchema.shape.assignedAt,
  __typename: z.literal("ParticipantInfo"),
});
