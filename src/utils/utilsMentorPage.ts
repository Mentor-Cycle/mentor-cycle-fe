import imgCard from "../../public/imgCard.png";

export const formatMentorCardData = (data: any): any =>
  data.map(({ skills, country, chips, state, ...mentor }: any) => {
    const location = `${country} ${state}`;
    return {
      ...mentor,
      chips: skills,
      image: imgCard,
      jobTitle: "Software Engineer",
      location,
    };
  });
