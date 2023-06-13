import { TGET_MENTOR_BY_ID_queryDataSchema } from "services/apollo/queries/queries-properties";
import { IAvailabilityAPI } from "types/availability.types";
import { Pretify } from "types/helpers";

export type IMentor = Pretify<
  Omit<TGET_MENTOR_BY_ID_queryDataSchema, "availability"> & {
    availability: Array<
      Pick<IAvailabilityAPI, "weekDay"> & {
        slots: string[];
      }
    > | null;
  }
>;
