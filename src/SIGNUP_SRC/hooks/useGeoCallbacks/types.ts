import { estadosIBGESchema } from "SIGNUP_SRC/schemas/estados";
import { paisesIBGESchema } from "SIGNUP_SRC/schemas/paises";
import { z } from "zod";

export const schemas = {
  estados: estadosIBGESchema,
  paises: paisesIBGESchema,
};

export type SchemasType = typeof schemas;

export type OnSuccessCallbackType = {
  [K in keyof SchemasType]: (data: z.infer<SchemasType[K]>) => void;
};

export type OnErrorCallbackType = {
  [K in keyof SchemasType]: (data: {
    error: unknown;
    issue_cause?: z.infer<SchemasType[K]> | null;
  }) => void;
};
