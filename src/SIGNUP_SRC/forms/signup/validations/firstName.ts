import { userSchema } from "schemas";
import * as t from "SIGNUP_SRC/forms/signup/texts";

export const firstNameSchema = userSchema.shape.firstName
  .min(2, t.NAME_TOO_SHORT)
  .max(20, t.NAME_TOO_LONG);
