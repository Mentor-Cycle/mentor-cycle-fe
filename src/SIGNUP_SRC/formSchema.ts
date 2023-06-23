import { userSchema } from "schemas";
import { z } from "zod";

export const signupFormSchema = z.object({
  firstName: userSchema.shape.firstName,
  lastName: userSchema.shape.lastName,
  email: userSchema.shape.email,
  password: userSchema.shape.password,
  repeatPassword: userSchema.shape.password,
  state: userSchema.shape.state,
  country: userSchema.shape.country,
  city: userSchema.shape.city,
  birthDate: z.string(),
  skills: userSchema.shape.skills,
  linkedin: userSchema.shape.linkedin,
  github: userSchema.shape.github,
  description: userSchema.shape.description,
  isMentor: userSchema.shape.isMentor,
  cities: z.array(z.string()),
  states: z.array(z.string()),
});
