import { ChipProps } from "@components/Chip";
import { ChipVariant } from "@components/Chip/Chip.types";

export interface IMentor {
  id: string;
  chips: ChipProps[];
  description: string;
  image: string;
  jobTitle: string;
  location: string;
  firstName: string;
  lastName: string;
}
