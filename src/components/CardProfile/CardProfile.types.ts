import { ChipProps } from "@components/Chip/Chip.types";
import { StaticImageData } from "next/image";

type SizeCard = "Medium" | "Large";

export interface CardProps {
  id: string;
  name: string;
  jobTitle: string;
  location: string;
  description: string;
  image: string | StaticImageData;
  chips: ChipProps[];
  variant?: SizeCard;
  isCurrentMentor?: boolean;
}
