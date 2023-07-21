import { userSchema } from "schemas";
import * as t from "forms/signup/texts";

export const firstNameSchema = userSchema.shape.firstName
  .trim()
  .nonempty(t.FILL_FIELD)
  .min(2, t.NAME_TOO_SHORT)
  .max(100, t.NAME_TOO_LONG);
