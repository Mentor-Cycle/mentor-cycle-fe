import { Dispatch, SetStateAction } from "react";
import {
  TGET_MENTOR_BY_ID_variablesSchema as MentorVariables,
  TGET_MENTOR_BY_ID_queryResponseSchema as MentorResponse,
} from "services/apollo/queries/queries-properties";
import { ApolloQueryResult } from "@apollo/client";
import { IAvailabilityAPI } from "types/availability.types";
import { TWeekday_Short } from "config/constants";

export interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetchMentorProfile: (
    variables?: Partial<MentorVariables>
  ) => Promise<ApolloQueryResult<MentorResponse>>;
}

export type AvailabilitySlot = Pick<
  IAvailabilityAPI,
  "startHour" | "endHour"
> & {
  weekDay: TWeekday_Short;
};

// export type AvailabilitySlot = Pick<
//   IAvailabilityAPI,
//   "startHour" | "endHour" | "weekDay"
// >;
