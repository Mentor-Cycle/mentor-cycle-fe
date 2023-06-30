import { whichFetchIndex } from "SIGNUP_SRC/hooks/useGeoFetches/fetchesIndex";
import { getStateUF } from "SIGNUP_SRC/hooks/useGeoFetches/helpers";
import { useCallback, useEffect, useMemo, useState } from "react";
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

export function useGeoFetches<T extends WhichFetchKeys>(
  fetchType: T,
  params?: FetchesParams
): GeoFetchesResponse<T> {
  type TData = FetchType<T>;
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const { generateURL, schema } = whichFetchIndex[fetchType];

  const stateName = useMemo(() => getStateUF(params?.stateName), [params?.stateName]);
  const URL = useMemo(() => generateURL(stateName), [stateName]);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(URL);
      const data = await response.json();
      schema
        .parseAsync(data)
        .then((data) => setData(data as TData))
        .catch(setError);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [URL]);

  useEffect(() => {
    if (fetchType === "cidades") {
      if (params?.stateName) {
        fetchData();
      }
    } else {
      fetchData();
    }
  }, [params?.stateName, schema, URL]);

  return {
    data,
    isLoading,
    error,
  };
}
