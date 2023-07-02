import { signupFormSchema } from "SIGNUP_SRC/forms/signup/schema";
import { z } from "zod";

export type IFormValues = z.infer<typeof signupFormSchema>;
