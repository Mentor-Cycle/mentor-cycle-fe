import { signupFormSchema } from "forms/signup/schema";
import { z } from "zod";

export type IFormValues = z.infer<typeof signupFormSchema>;
