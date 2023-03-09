import { ChipOption } from "@components/Chip/Chip.types";

export interface CardProps {
  name: string;
  jobTitle: string;
  location: string;
  description: string;
  image: any;
  chips: ChipOption[];
}
