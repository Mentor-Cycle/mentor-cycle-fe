import * as t from "SIGNUP_SRC/forms/signup/texts";
import { userSchema } from "schemas";

export const skillsSchema = userSchema.shape.skills.min(1, t.SKILLS_MIN);
