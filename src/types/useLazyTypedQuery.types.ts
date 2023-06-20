import {
  LazyQueryHookOptions,
  OperationVariables,
  QueryResult,
} from "@apollo/client";
import { IErrorTypedFetch, TError } from "types/useTypedQuery.types";

export type HookResponse<TData, TVariables extends OperationVariables> = [
  Fetcher: (options?: Partial<LazyQueryHookOptions<TData, TVariables>>) => void,
  Options: Omit<QueryResult<TData, TVariables>, "error"> & {
    error: IErrorTypedFetch<TError<TData>> | null;
  }
];
