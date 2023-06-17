import { userAPISchema, userSchema } from "schemas";
import { z } from "zod";

export const GET_MENTORS_queryDataSchema = userAPISchema
  .pick({
    id: true,
    firstName: true,
    lastName: true,
    skills: true,
    country: true,
    state: true,
    description: true,
    photoUrl: true,
    jobTitle: true,
    __typename: true,
  })
  .strict();

export const GET_MENTORS_queryResponseSchema = z
  .object({
    findMentors: z.array(GET_MENTORS_queryDataSchema),
  })
  .strict();

export const periodSchema = z.union([
  z.literal("MORNING"),
  z.literal("AFTERNOON"),
  z.literal("EVENING"),
]);

export const mentorsFilterSchema = z.object({
  firstName: userSchema.shape.firstName,
  orderBy: z.string(),
  order: z.string(),
  skip: z.number(),
  pageSize: z.number(),
  pageNumber: z.number(),
  period: periodSchema.nullable(),
  skills: z.string().nullable(),
  limit: z.number(),
  take: z.number(),
});

export const GET_MENTORS_variablesSchema = z
  .object({
    firstName: mentorsFilterSchema.shape.firstName.nullable().optional(),
    orderBy: mentorsFilterSchema.shape.orderBy.nullable().optional(),
    order: mentorsFilterSchema.shape.order.nullable().optional(),
    skip: mentorsFilterSchema.shape.skip.nullable().optional(),
    pageSize: mentorsFilterSchema.shape.pageSize.nullable().optional(),
    pageNumber: mentorsFilterSchema.shape.pageNumber.nullable().optional(),
    period: mentorsFilterSchema.shape.period.optional(),
    skills: mentorsFilterSchema.shape.skills.optional(),
    limit: mentorsFilterSchema.shape.limit.nullable().optional(),
    take: mentorsFilterSchema.shape.take.nullable().optional(),
  })
  .strict();

/**
 * Types
 */
export type TGET_MENTORS_queryDataSchema = z.infer<
  typeof GET_MENTORS_queryDataSchema
>;

export type TGET_MENTORS_queryResponseSchema = z.infer<
  typeof GET_MENTORS_queryResponseSchema
>;

export type TGET_MENTORS_variablesSchema = z.infer<
  typeof GET_MENTORS_variablesSchema
>;

export type TGET_MENTORS_filterSchema = z.infer<typeof mentorsFilterSchema>;
export type TPeriod = z.infer<typeof periodSchema>;
