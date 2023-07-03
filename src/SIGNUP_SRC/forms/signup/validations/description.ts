import { userSchema } from "schemas";
import * as t from "SIGNUP_SRC/forms/signup/texts";

export const descriptionSchema = userSchema.shape.description
  .trim()
  .nonempty(t.FILL_FIELD)
  .min(2, t.DESCRIPTION_TOO_SHORT)
  .max(400, t.DESCRIPTION_TOO_LONG);
