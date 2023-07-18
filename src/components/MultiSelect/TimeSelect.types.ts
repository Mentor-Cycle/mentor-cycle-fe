import { Filter } from "pages/mentors/mentors";
import { TPeriod } from "services/apollo/queries/queries-properties";

export interface TimeSelectProps {
  placeholder: string;
  setSelectedTime: (selectedPeriod: Filter["period"]) => void;
}

export interface IOptionsTimes {
  value: TPeriod | null;
  label: string;
}
