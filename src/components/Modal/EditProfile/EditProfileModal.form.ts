import { z } from "zod";
import { userSchema } from "schemas";

export const editProfileFormSchema = z
  .object({
    firstName: userSchema.shape.firstName.min(
      2,
      "O primeiro nome deve ter 2 caracteres ou mais."
    ),
    lastName: userSchema.shape.lastName.min(
      2,
      "O segundo nome deve ter 2 caracteres ou mais."
    ),
    biography: userSchema.shape.biography,
    description: userSchema.shape.description,
    country: userSchema.shape.country,
    state: userSchema.shape.state,
    skills: userSchema.shape.skills,
    github: userSchema.shape.github.or(z.literal("")),
    linkedin: userSchema.shape.linkedin.or(z.literal("")),
    // email: userSchema.shape.email,
    jobTitle: userSchema.shape.jobTitle,
    yearsOfExperience: z.coerce.string().transform(Number),
    id: userSchema.shape.id,
  })
  .strict();

export type IEditProfileSubmitData = z.output<typeof editProfileFormSchema>;
