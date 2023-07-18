import { OperationVariables } from "@apollo/client";
import { queriesIndex } from "services/apollo/queries/queries.index";
import { z } from "zod";

export type Validations = typeof queriesIndex;
export type ValidationKeys = keyof Validations;

export type SchemaInferedType<T extends ValidationKeys> =
  Validations[T] extends {
    schema: z.Schema<infer U>;
  }
    ? U
    : never;

export type VariablesInferedType<T extends ValidationKeys> =
  Validations[T] extends {
    variables: z.Schema<infer U extends OperationVariables>;
  }
    ? U
    : never;
