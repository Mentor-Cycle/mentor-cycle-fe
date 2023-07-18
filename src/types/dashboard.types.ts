import { ChipVariant } from "@components/Chip/Chip.types";
import { OptionStatus } from "schemas/create_event_output";
import { TGET_EVENTS_queryDataSchema as IEvents } from "services/apollo/queries/queries-properties";
import { Pretify } from "types/helpers";

export type IGroupEventsByDay = Pretify<
  Record<
    string,
    {
      date: string;
      events: IEvents[];
    }
  >
>;

export type IStatusOption = {
  value: OptionStatus | "";
  label: string;
};

export type IStatusDisplay = {
  label: string;
  variant: ChipVariant;
};
