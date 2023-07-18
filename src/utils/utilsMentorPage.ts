import { IMentorClient, mentorClientSchema } from "schemas/mentor";
import imgCard from "../../public/imgCard.png";
import { validateUndefined } from "./nullable/validateUndefined";
import { TGET_MENTORS_queryDataSchema as IMentorAPIReponse } from "services/apollo/queries/queries-properties";
import { z } from "zod";

export const formatMentorCardData = (
  mentors: IMentorAPIReponse[]
): IMentorClient[] => {
  const mentorsClient = mentors.map(
    ({ photoUrl, skills, country, jobTitle, state, ...mentor }) => {
      const location = `${validateUndefined(country)} ${validateUndefined(
        state
      )}`;
      return {
        ...mentor,
        chips: skills,
        image: photoUrl || imgCard,
        jobTitle: jobTitle || "Profissão não fornecida",
        location: location || "Localização não fornecida",
      };
    }
  );

  const parseMentorsClient = z
    .array(mentorClientSchema)
    .safeParse(mentorsClient);
  if (!parseMentorsClient.success) console.error(parseMentorsClient.error);
  return parseMentorsClient.success ? parseMentorsClient.data : [];
};
// allow user to change month
// allow user to close
// block continue button
