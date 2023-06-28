import { ReactSelectInterface } from "types/react-select";

export type States = ReactSelectInterface[] | null;
export interface IUseGeoStates {
  order?: "ascending" | "descending";
  limit?: number;
}
