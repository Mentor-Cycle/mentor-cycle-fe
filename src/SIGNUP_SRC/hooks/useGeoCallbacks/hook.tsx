import { statesObject } from "SIGNUP_SRC/constants";
import { getURL } from "SIGNUP_SRC/hooks/useGeoCallbacks/helpers";
import {
  SchemasType,
  OnSuccessCallbackType,
  OnErrorCallbackType,
  schemas,
  UseGeoParams,
} from "SIGNUP_SRC/hooks/useGeoCallbacks/types";
import { useCallback, useEffect } from "react";

export function useGeoCallbacks<T extends keyof SchemasType>(
  locationType: T,
  onSuccess: OnSuccessCallbackType[T],
  onError?: OnErrorCallbackType[T],
  params?: UseGeoParams
) {
  const schema = schemas[locationType];
  const hasValidStateName = params?.stateName.length;

  const fetchData = useCallback(async () => {
    if (locationType === "estados") {
      if (onSuccess) onSuccess(statesObject);
    } else {
      try {
        if (locationType === "cidades" && !hasValidStateName) {
          if (onSuccess) return onSuccess(null);
        }
        const URL = getURL(locationType, params);
        const res = await fetch(URL);
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
  }, [params?.stateName]);

  useEffect(() => {
    fetchData();
  }, [fetchData, params?.stateName]);
}
