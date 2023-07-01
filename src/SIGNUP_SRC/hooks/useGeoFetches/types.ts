import { whichFetchIndex } from "SIGNUP_SRC/hooks/useGeoFetches/fetchesIndex";
import { z } from "zod";

export type WhichFetch = typeof whichFetchIndex;
export type WhichFetchKeys = keyof WhichFetch;

export type FetchType<T extends WhichFetchKeys> = {
  [K in WhichFetchKeys]: z.infer<WhichFetch[K]["schema"]>;
}[T];

export interface GeoFetchesResponse<T extends WhichFetchKeys> {
  data: FetchType<T> | null;
  isLoading: boolean;
  error: unknown | null;
}

export interface FetchesParams {
  stateName?: string;
}
