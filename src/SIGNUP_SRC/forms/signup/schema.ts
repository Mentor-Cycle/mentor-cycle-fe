import {
  birthDateSchema,
  descriptionSchema,
  emailSchema,
  firstNameSchema,
  githubSchema,
  isTermsAcceptedSchema,
  lastNameSchema,
  linkedinSchema,
  passwordSchema,
  repeatPasswordSchema,
  skillsSchema,
} from "SIGNUP_SRC/forms/signup/validations";
import { userSchema } from "schemas";
import { z } from "zod";

export const signupFormSchema = z
  .object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    email: emailSchema,
    password: passwordSchema,
    repeatPassword: repeatPasswordSchema,
    state: userSchema.shape.state,
    country: userSchema.shape.country,
    city: userSchema.shape.city,
    birthDate: birthDateSchema,
    skills: skillsSchema,
    linkedin: linkedinSchema,
    github: githubSchema,
    description: descriptionSchema,
    isMentor: userSchema.shape.isMentor,
    isTermsAccepted: isTermsAcceptedSchema,
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.repeatPassword)
      ctx.addIssue({
        code: "invalid_intersection_types",
        path: ["repeatPassword"],
        message: "As senhas não coincidem.",
      });
  });
