import { whichFetchIndex } from "SIGNUP_SRC/hooks/useGeoFetches/fetchesIndex";
import {
  FetchType,
  FetchesParams,
  GeoFetchesResponse,
  WhichFetchKeys,
} from "SIGNUP_SRC/hooks/useGeoFetches/types";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useGeoFetches<T extends WhichFetchKeys>(
  fetchType: T,
  params?: FetchesParams
): GeoFetchesResponse<T> {
  type TData = FetchType<T>;
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const { generateURL, schema } = whichFetchIndex[fetchType];

  const stateName = params?.stateName;
  const URL = useMemo(() => generateURL(stateName ?? "STATE_NOT_FOUND"), [stateName]);

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
