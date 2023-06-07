import { availabilitySchema, userSchema } from "schemas";
import { skillsSchema } from "schemas/skills";
import { z } from "zod";

export const GET_ME_queryUserSchema = userSchema
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
  .merge(
    z.object({
      availability: z
        .array(
          availabilitySchema.pick({
            startHour: true,
            weekDay: true,
          })
        )
        .nullable(),
    })
  );

export const GET_SKILLS_querySkillsSchema = skillsSchema.pick({
  __typename: true,
  name: true,
});

export const GET_ME_querySchema = z.object({
  me: GET_ME_queryUserSchema,
});

export const GET_SKILLS_querySchema = z.object({
  findAllSkills: z.array(GET_SKILLS_querySkillsSchema),
});
