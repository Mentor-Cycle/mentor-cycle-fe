import {
  availabilityAPISchema,
  availabilitySchema,
} from "schemas/availability";
import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string(),
  active: z.boolean(),
  firstName: z.string(),
  lastName: z.string(),
  photoUrl: z.string().url(),
  yearsOfExperience: z.number(),
  isEmailVerified: z.boolean(),
  isTermsAccepted: z.boolean(),
  onBoardingCompleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  googleId: z.string(),
  facebookId: z.string(),
  birthDate: z.date(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  skills: z.array(z.string()),
  linkedin: z.string().url(),
  github: z.string().url(),
  website: z.string().url(),
  jobTitle: z.string(),
  jobCompany: z.string(),
  biography: z.string(),
  description: z.string(),
  isMentor: z.boolean(),
  status: z.string(),
  availability: z.array(availabilitySchema),
});

export const userAPISchema = z
  .object({
    id: userSchema.shape.id,
    email: userSchema.shape.email,
    password: userSchema.shape.password.nullable(),
    active: userSchema.shape.active.nullable(),
    firstName: userSchema.shape.firstName,
    lastName: userSchema.shape.lastName.nullable(),
    photoUrl: userSchema.shape.photoUrl.or(z.literal("")).nullable(),
    yearsOfExperience: userSchema.shape.yearsOfExperience.nullable(),
    isEmailVerified: userSchema.shape.isEmailVerified,
    isTermsAccepted: userSchema.shape.isTermsAccepted,
    onBoardingCompleted: userSchema.shape.onBoardingCompleted,
    createdAt: userSchema.shape.createdAt,
    updatedAt: userSchema.shape.updatedAt,
    googleId: userSchema.shape.googleId.nullable(),
    facebookId: userSchema.shape.facebookId.nullable(),
    birthDate: userSchema.shape.birthDate,
    country: userSchema.shape.country,
    state: userSchema.shape.state,
    city: userSchema.shape.city,
    skills: userSchema.shape.skills.nullable(),
    linkedin: userSchema.shape.linkedin.or(z.literal("")).nullable(),
    github: userSchema.shape.github.or(z.literal("")).nullable(),
    website: userSchema.shape.website.or(z.literal("")).nullable(),
    jobTitle: userSchema.shape.jobTitle.nullable(),
    jobCompany: userSchema.shape.jobCompany.nullable(),
    biography: userSchema.shape.biography.nullable(),
    description: userSchema.shape.description,
    isMentor: userSchema.shape.isMentor.nullable(),
    status: userSchema.shape.status.nullable(),
    availability: z.array(availabilityAPISchema).nullable(),
    __typename: z.literal("User"),
  })
  .strict();

export const userSessionSchema = userAPISchema
  .pick({
    id: true,
    firstName: true,
    lastName: true,
    photoUrl: true,
    email: true,
    jobTitle: true,
    isMentor: true,
    skills: true,
    biography: true,
    yearsOfExperience: true,
    country: true,
    description: true,
    github: true,
    linkedin: true,
    state: true,
  })
  .extend({
    isLogged: z.boolean(),
    availability: z
      .array(
        z.object({
          startHour: availabilityAPISchema.shape.startHour,
          weekDay: availabilityAPISchema.shape.weekDay,
          endHour: availabilityAPISchema.shape.endHour.optional(),
          active: availabilityAPISchema.shape.active.optional(),
        })
      )
      .nullable(),
  })
  .strict();
