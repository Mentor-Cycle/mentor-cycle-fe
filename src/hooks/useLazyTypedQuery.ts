import React from "react";
import { z } from "zod";
import {
  ApolloError,
  LazyQueryExecFunction,
  OperationVariables,
  useLazyQuery,
  useQuery,
} from "@apollo/client";
import { InferedType, ValidationKeys } from "types/typed-queries";
import { queriesIndex } from "services/apollo/queries/queries.index";

export function useLazyTypedQuery<T extends ValidationKeys>(
  queryKey: T
): [
  fetcher: LazyQueryExecFunction<InferedType<T>, {}>,
  response: {
    data: InferedType<T> | null;
    error: ApolloError | z.ZodError<InferedType<T>> | null;
    isLoading: boolean;
  }
] {
  const [data, setData] = React.useState<InferedType<T> | null>(null);
  const [error, setError] = React.useState<
    ApolloError | z.ZodError<InferedType<T>> | null
  >(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const { query, schema } = queriesIndex[queryKey];

  const [fetcher, { data: unparsedData, loading, error: responseError }] =
    useLazyQuery(query);

  React.useEffect(() => {
    if (unparsedData) {
      const parsedData = schema.safeParse(unparsedData);
      if (!parsedData.success) {
        console.error(parsedData.error);
        setError(parsedData.error as z.ZodError);
      } else {
        setData(parsedData.data as InferedType<T>);
      }
    }
  }, [unparsedData]);

  React.useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  React.useEffect(() => {
    setError(responseError as ApolloError);
  }, [responseError]);

  return [fetcher, { data, isLoading, error }];
}
