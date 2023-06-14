import { ApolloError, OperationVariables, QueryResult } from "@apollo/client";
import { DocumentNode } from "graphql";
import { z } from "zod";

export type ExtractDataType<TSchema extends z.ZodType<any>> = z.infer<TSchema>;

export type FetchConfig<
  TDataSchema extends z.ZodType<any>,
  TVariablesSchema extends z.ZodType<any> | null | undefined
> = {
  query: DocumentNode;
  schema: TDataSchema;
  variables?: TVariablesSchema;
};

export type HookResponse<TData, TVariables extends OperationVariables> = Omit<
  QueryResult<TData, TVariables>,
  "error" | "data"
> & {
  data: TData | null;
  error: IErrorTypedFetch<TError<TData>> | null;
};

export type TError<TData> = unknown | z.ZodError<TData> | ApolloError;

export interface IErrorTypedFetch<TError> {
  error: TError;
  type: ErrorTypedFetchTypes;
  response_data?: Record<string, any> | Array<Record<string, any>>;
}

export type ErrorTypedFetchTypes =
  | "UNEXPECTED"
  | "PARSING_VARIABLES"
  | "PARSING_API_RESPONSE_DATA"
  | "FETCHING_API_RESPONSE_DATA"
  | "EXPECT_VARIABLES";
