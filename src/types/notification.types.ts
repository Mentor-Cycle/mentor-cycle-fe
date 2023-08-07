import { z } from "zod";
import { notificationSchema, notificationAPISchema } from "schemas";

export type INotification = z.infer<typeof notificationSchema>;
export type INotificationApi = z.infer<typeof notificationAPISchema>;
