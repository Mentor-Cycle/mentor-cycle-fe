import { userAPISchema, userSchema } from "schemas";
import { createEventOutputAPISchema } from "schemas/create_event_output";
import { participantInfoAPISchema } from "schemas/participant_info";
import { z } from "zod";

export const GET_EVENTS_queryDataSchema = createEventOutputAPISchema
  .pick({
    id: true,
    mentorId: true,
    meetingLink: true,
    startDate: true,
    endDate: true,
    status: true,
    active: true,
    __typename: true,
  })
  .extend({
    participants: z.array(
      participantInfoAPISchema
        .pick({
          __typename: true,
          user: undefined,
        })
        .extend({
          user: userAPISchema.pick({
            id: true,
            firstName: true,
            lastName: true,
            jobTitle: true,
            isMentor: true,
            photoUrl: true,
            __typename: true,
          }),
          __typename: z.literal("ParticipantInfo"),
        })
    ),
  })
  .strict();

export const GET_EVENTS_queryResponseSchema = z
  .object({
    findEvents: z.array(GET_EVENTS_queryDataSchema),
  })
  .strict();

export const GET_EVENTS_variablesSchema = z
  .object({
    learnerId: userSchema.shape.id,
    mentorId: userSchema.shape.id.optional(),
  })
  .strict();

/**
 * Types
 */
export type TGET_EVENTS_queryDataSchema = z.infer<
  typeof GET_EVENTS_queryDataSchema
>;
export type TGET_EVENTS_queryResponseSchema = z.infer<
  typeof GET_EVENTS_queryResponseSchema
>;
export type TGET_EVENTS_variablesSchema = z.infer<
  typeof GET_EVENTS_variablesSchema
>;
