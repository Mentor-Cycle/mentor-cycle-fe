import { z } from "zod";
import { userSchema } from "schemas";
import { GET_ME_queryUserSchema } from "services/apollo/queries/queries.validation";

export type IUserResponse = z.infer<typeof GET_ME_queryUserSchema>;
export type IUser = z.infer<typeof userSchema>;

export interface IUserSession extends IUserResponse {
  isLogged: boolean;
}
