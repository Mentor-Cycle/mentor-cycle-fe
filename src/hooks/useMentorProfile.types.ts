import { TWeekday } from "config/constants";
import { TGET_MENTOR_BY_ID_queryDataSchema } from "services/apollo/queries/queries-properties";
import { Pretify } from "types/helpers";

export type IMentor = Pretify<
  Omit<TGET_MENTOR_BY_ID_queryDataSchema, "availability"> & {
    availability: Array<{
      weekDay: TWeekday;
      slots: string[];
    }> | null;
  }
>;
