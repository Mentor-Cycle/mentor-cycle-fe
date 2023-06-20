import { OperationVariables, QueryHookOptions, useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import {
  ExtractDataType,
  FetchConfig,
  HookResponse,
  IErrorTypedFetch,
  TError,
} from "types/useTypedQuery.types";
import { SafeParseError, z } from "zod";

export function useTypedQuery<
  TDataSchema extends z.ZodType<any>,
  TVariablesSchema extends z.ZodType<any> | null | undefined
>(
  queryProperties: FetchConfig<TDataSchema, TVariablesSchema>,
  options?: QueryHookOptions<
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<IErrorTypedFetch<TError<TData>> | null>(
    null
  );
  const { query, schema, variables: variablesSchema } = queryProperties;

  const parsedVariables = useMemo(() => {
    if (variablesSchema) {
      return variablesSchema.safeParse(options?.variables ?? {});
    } else if (options?.variables) {
      return { data: options?.variables, success: true };
    } else {
      return { data: {}, success: true };
    }
  }, [variablesSchema, options?.variables]);

  const variables = parsedVariables.success ? parsedVariables.data : undefined;

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
    ...rest
  } = useQuery(query, {
    ...options,
    skip: !parsedVariables.success || options?.skip,
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

  useEffect(() => {
    if (variablesSchema && (!options || !options.variables)) {
      setError({
        error: "You must provide variables to this query.",
        type: "EXPECT_VARIABLES",
      });
      setLoading(false);
    } else if (!parsedVariables.success && !options?.skip) {
      setError({
        error: (parsedVariables as SafeParseError<TVariables>).error,
        issue_cause: options?.variables,
        type: "PARSING_VARIABLES",
      });
      setLoading(false);
    }
  }, [parsedVariables.success]);

  useEffect(() => {
    if (options?.skip) {
      setLoading(false);
    }
  }, [options?.skip]);

  // useEffect(() => console.log("error", error), [error]);

  return { data, error, loading, ...rest };
}
