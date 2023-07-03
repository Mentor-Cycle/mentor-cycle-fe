import { z } from "zod";

export const estadosIBGESchema = z.array(
  z.object({ value: z.string(), label: z.string() })
);

export type IEstadosIBGESchema = z.infer<typeof estadosIBGESchema>;
