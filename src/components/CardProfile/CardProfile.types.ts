import { IMentorClient } from "schemas/mentor";

export type SizeCard = "Medium" | "Large";

export interface CardProps {
  id: string;
  name: string;
  jobTitle: string;
  location: string;
  description: string;
  image: string | IMentorClient["image"];
  // chips: ChipProps[];
  chips: string[] | null;
  lastName: string;
  variant?: SizeCard;
  isCurrentMentor?: boolean;
}
