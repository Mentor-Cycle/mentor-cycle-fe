import { ChipProps } from "@components/Chip";

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
