import { statesObject } from "SIGNUP_SRC/constants";
import {
  SchemasType,
  OnSuccessCallbackType,
  OnErrorCallbackType,
  schemas,
} from "SIGNUP_SRC/hooks/useGeoCallbacks/types";
import { IBGE_PLACES_API_URL } from "config/constants";
import { useCallback, useEffect } from "react";

export function useGeoCallbacks<T extends keyof SchemasType>(
  locationType: T,
  onSuccess: OnSuccessCallbackType[T],
  onError?: OnErrorCallbackType[T]
) {
  const schema = schemas[locationType];

  const fetchData = useCallback(async () => {
    if (locationType === "estados") {
      if (onSuccess) onSuccess(statesObject);
    } else {
      try {
        const res = await fetch(`${IBGE_PLACES_API_URL}/${locationType}`);
        const unparsedData = await res.json();
        try {
          const data = schema.parse(unparsedData);
          if (onSuccess) onSuccess(data);
        } catch (error) {
          if (onError) {
            onError({
              error,
              issue_cause: unparsedData,
            });
          }
        }
      } catch (error) {
        if (onError)
          onError({
            error,
          });
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
}
