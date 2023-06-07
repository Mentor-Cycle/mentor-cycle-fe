import { queriesIndex } from "services/apollo/queries/queries.index";
import { z } from "zod";

export type Validations = typeof queriesIndex;
export type ValidationKeys = keyof Validations;

export type InferedType<T extends ValidationKeys> = Validations[T] extends {
  schema: z.Schema<infer U>;
}
  ? U
  : never;
