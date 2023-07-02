import {
  birthDateSchema,
  firstNameSchema,
  lastNameSchema,
} from "SIGNUP_SRC/forms/signup/validations";
import { userSchema } from "schemas";
import { z } from "zod";

export const signupFormSchema = z
  .object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    email: userSchema.shape.email,
    password: userSchema.shape.password,
    repeatPassword: userSchema.shape.password,
    state: userSchema.shape.state,
    country: userSchema.shape.country,
    city: userSchema.shape.city,
    birthDate: birthDateSchema,
    skills: userSchema.shape.skills,
    linkedin: userSchema.shape.linkedin,
    github: userSchema.shape.github,
    description: userSchema.shape.description,
    isMentor: userSchema.shape.isMentor,
    isTermsAccepted: z
      .boolean()
      .refine(Boolean, "Você deve aceitar os termos de serviço para prosseguir."),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.repeatPassword)
      ctx.addIssue({
        code: "invalid_intersection_types",
        path: ["repeatPassword"],
        message: "As senhas não coincidem.",
      });
  });
