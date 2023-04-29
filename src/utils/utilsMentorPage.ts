import imgCard from "../../public/imgCard.png";
import { validateUndefined } from "./nullable/validateUndefined";

export const formatMentorCardData = (data: any): any =>
  data.map(({ photoUrl, skills, country, chips, state, ...mentor }: any) => {
    const location = `${validateUndefined(country)} ${validateUndefined(
      state
    )}`;

    return {
      ...mentor,
      chips: skills,
      image: photoUrl || imgCard,
      jobTitle: "Software Engineer",
      location,
    };
  });

// allow user to change month
// allow user to close
// block continue button
