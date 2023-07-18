import { TWeekday, TWeekday_Lowercase } from "config/constants";
import { OptionStatus } from "schemas/create_event_output";

export type Props = {
  day: TWeekday_Lowercase | TWeekday;
  description: string;
  chips: JSX.Element[];
};

export interface EventProps {
  id: string;
  status: OptionStatus;
  startDate: string;
}

export type Events = { events: EventProps[] };
