import { FilterOrder, LimitFilter } from "@hooks/methods";
import { ReactSelectInterface } from "types/react-select";

export type States = ReactSelectInterface[] | null;
export interface IUseGeoStates {
  order?: FilterOrder;
  limit?: LimitFilter;
}
