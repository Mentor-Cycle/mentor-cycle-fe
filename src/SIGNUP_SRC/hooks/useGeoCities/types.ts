import { FilterOrder, LimitFilter } from "SIGNUP_SRC/hooks/methods";
import { ReactSelectInterface } from "types/react-select";

export type Cities = ReactSelectInterface[] | null;
export interface IUseGeoCities {
  order?: FilterOrder;
  limit?: LimitFilter;
}
