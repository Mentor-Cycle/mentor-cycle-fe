import {
  LazyQueryHookOptions,
  OperationVariables,
  useLazyQuery,
} from "@apollo/client";
import { useCallback, useState } from "react";
import { HookResponse } from "types/useLazyTypedQuery.types";
import {
  ExtractDataType,
  FetchConfig,
  IErrorTypedFetch,
  TError,
} from "types/useTypedQuery.types";
import { z } from "zod";

export function useLazyTypedQuery<
  TDataSchema extends z.ZodType<any>,
  TVariablesSchema extends z.ZodType<any> | undefined | null
>(
  queryProperties: FetchConfig<TDataSchema, TVariablesSchema>,
  options?: LazyQueryHookOptions<
    ExtractDataType<TDataSchema>,
    ExtractDataType<NonNullable<TVariablesSchema>> & OperationVariables
  >
): HookResponse<
  ExtractDataType<TDataSchema>,
  ExtractDataType<NonNullable<TVariablesSchema>>
> {
  type TData = ExtractDataType<TDataSchema>;
  type TVariables = ExtractDataType<NonNullable<TVariablesSchema>>;

  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<IErrorTypedFetch<TError<TData>> | null>(
    null
  );
  const { query, schema, variables: variablesSchema } = queryProperties;

  const parsedVariables = variablesSchema
    ? variablesSchema.safeParse(options?.variables ?? {})
    : options?.variables
    ? { data: options?.variables, success: true }
    : { data: {}, success: true };

  const variables = parsedVariables.success ? parsedVariables.data : undefined;

  const [
    fetchData,
    { data: queryData, error: queryError, loading: queryLoading, ...rest },
  ] = useLazyQuery(query, {
    ...options,
    variables,
    onError: (error) => {
      setError({
        error,
        type: "FETCHING_API_RESPONSE_DATA",
      });
      setLoading(false);
      if (options?.onError) options.onError(error);
    },
    onCompleted: (unparsedData) => {
      schema
        .parseAsync(unparsedData)
        .then((parsedData) => {
          setData(parsedData);
          if (options?.onCompleted) options.onCompleted(parsedData);
        })
        .catch((error) => {
          setError({
            error,
            type: "PARSING_API_RESPONSE_DATA",
            issue_cause: unparsedData,
          });
          if (options?.onCompleted) options.onCompleted(unparsedData);
        })
        .finally(() => setLoading(false));
    },
  });

  const fetcherCallback = useCallback(
    (options?: Partial<LazyQueryHookOptions<TData, TVariables>>) => {
      if (variablesSchema) {
        if (!options || options.variables) {
          setError({
            error: "You must provide variables for this query.",
            type: "EXPECT_VARIABLES",
          });
          setLoading(false);
        } else {
          variablesSchema
            .parseAsync(options.variables)
            .then((variables) => fetchData({ ...options, variables }))
            .catch((error) => {
              setError({
                error,
                type: "PARSING_VARIABLES",
                issue_cause: options.variables,
              });
              setLoading(false);
            });
        }
      } else {
        fetchData(options);
      }
    },
    [fetchData, variablesSchema]
  );

  return [fetcherCallback, { data, error, loading, ...rest }];
}
