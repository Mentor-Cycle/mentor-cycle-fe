import { availabilitySchema } from "schemas/availability";
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
  jobCompany: z.string().url(),
  biography: z.string(),
  description: z.string(),
  isMentor: z.boolean(),
  status: z.string(),
  availability: z.array(availabilitySchema),
  __typename: z.literal("User"),
});

export const userSessionSchema = userSchema
  .omit({
    password: true,
    active: true,
    isEmailVerified: true,
    isTermsAccepted: true,
    onBoardingCompleted: true,
    createdAt: true,
    updatedAt: true,
    googleId: true,
    facebookId: true,
    birthDate: true,
    city: true,
    status: true,
    website: true,
    jobCompany: true,
    __typename: true,
  })
  .merge(
    z.object({
      photoUrl: z.union([userSchema.shape.lastName.nullable(), z.literal("")]),
      isLogged: z.boolean(),
      jobTitle: userSchema.shape.jobTitle.nullable(),
      biography: userSchema.shape.biography.nullable(),
      yearsOfExperience: userSchema.shape.yearsOfExperience.nullable(),
      availability: z
        .array(
          z.object({
            weekDay: availabilitySchema.shape.weekDay,
            startHour: availabilitySchema.shape.startHour,
          })
        )
        .nullable(),
    })
  );
