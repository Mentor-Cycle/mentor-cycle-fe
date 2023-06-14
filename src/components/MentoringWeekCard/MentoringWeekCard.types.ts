import { OptionStatus } from "schemas/create_event_output";

export type Props = {
  day: string;
  description: string;
  chips: JSX.Element[];
};

export interface EventProps {
  id: string;
  status: OptionStatus;
  startDate: string;
}

export type Events = { events: EventProps[] };
