import { z } from "zod";
import { userSchema, userSessionSchema } from "schemas";

export type IUser = z.infer<typeof userSchema>;
export type IUserSession = z.infer<typeof userSessionSchema>;
