import { z } from "zod";

export const notificationSchema = z.object({
  id: z.string().nullable(),
  read: z.boolean(),
  data: z
    .object({
      title: z.string(),
      description: z.string(),
      imageUrl: z.string().url(),
      notifierId: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
    .nullable(),
});

export const notificationAPISchema = z
  .object({
    id: z.string().nullable(),
    read: z.boolean(),
    __typename: z.literal("Notification"),
    data: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().url().optional(),
        notifierId: z.string().optional(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
        __typename: z.literal("NotificationData"),
      })
      .nullable(),
  })
  .strict();
