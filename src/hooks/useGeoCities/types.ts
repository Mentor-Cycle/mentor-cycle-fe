import { FilterOrder, LimitFilter } from "@hooks/methods";
import { ReactSelectInterface } from "types/react-select";

export type Cities = ReactSelectInterface[] | null;
export interface IUseGeoCities {
  order?: FilterOrder;
  limit?: LimitFilter;
}
