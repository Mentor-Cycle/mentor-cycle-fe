import cardImage from "../../public/imgCard.png";
import { CardProps } from "./CardProfile.types";

export const cardMock: CardProps[] = [
  {
    id: "123",
    lastName: "Jr",
    name: "Ronald Richards",
    jobTitle: "Software Engineer at Apple",
    location: "São Paulo, SP - Brasil",
    description:
      "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum id quis ad qu minim sss ss... ",
    image: cardImage,
    chips: [
      { variant: "primary", children: "Backend" },
      { variant: "primary", children: "FrontEnd" },
    ],
  },
];
