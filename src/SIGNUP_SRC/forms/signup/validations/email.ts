import * as t from "SIGNUP_SRC/forms/signup/texts";
import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .nonempty(t.FILL_FIELD)
  .email(t.EMAIL_INVALID);
