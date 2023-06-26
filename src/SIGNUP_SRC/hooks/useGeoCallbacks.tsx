import { estadosIBGESchema } from "SIGNUP_SRC/schemas/estados";
import { paisesIBGESchema } from "SIGNUP_SRC/schemas/paises";
import { IBGE_PLACES_API_URL } from "config/constants";
import { useCallback, useEffect } from "react";
import { z } from "zod";

const schemas = {
  estados: estadosIBGESchema,
  paises: paisesIBGESchema,
};

type SchemasType = typeof schemas;
type OnSuccessCallbackType = {
  [K in keyof SchemasType]: (data: z.infer<SchemasType[K]> | null) => void;
};
type OnErrorCallbackType = {
  [K in keyof SchemasType]: (
    data: {
      error: unknown;
      issue_cause?: z.infer<SchemasType[K]> | null;
    } | null
  ) => void;
};

export function useGeoCallbacks<T extends keyof SchemasType>(
  locationType: T,
  onSuccess: OnSuccessCallbackType[T],
  onError?: OnErrorCallbackType[T]
) {
  const schema = schemas[locationType];

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`${IBGE_PLACES_API_URL}/${locationType}`);
      const unparsedData = await res.json();
      try {
        const data = schema.parse(unparsedData);
        if (onSuccess) onSuccess(data);
        if (onError) onError(null);
      } catch (error) {
        if (onSuccess) onSuccess(null);
        if (onError) {
          onError({
            error,
            issue_cause: unparsedData,
          });
        }
      }
    } catch (error) {
      if (onSuccess) onSuccess(null);
      if (onError)
        onError({
          error,
        });
    }
  }, [locationType, schema, onSuccess, onError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
}
