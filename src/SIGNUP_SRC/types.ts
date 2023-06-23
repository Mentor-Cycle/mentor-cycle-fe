import { signupFormSchema } from "SIGNUP_SRC/formSchema";
import { z } from "zod";

export type IFormValues = z.infer<typeof signupFormSchema>;
