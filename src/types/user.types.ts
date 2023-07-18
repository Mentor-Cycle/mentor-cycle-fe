import { z } from "zod";
import { userSchema, userSessionSchema, userAPISchema } from "schemas";

export type IUser = z.infer<typeof userSchema>;
export type IUserAPI = z.infer<typeof userAPISchema>;
export type IUserSession = z.infer<typeof userSessionSchema>;
