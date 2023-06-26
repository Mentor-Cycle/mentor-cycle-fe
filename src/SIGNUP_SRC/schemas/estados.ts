import { z } from "zod";

export const estadosIBGESchema = z.array(
  z.object({
    id: z.number(),
    sigla: z.string(),
    nome: z.string(),
    regiao: z.object({ id: z.number(), sigla: z.string(), nome: z.string() }),
  })
);

export type IEstadosIBGESchema = z.infer<typeof estadosIBGESchema>;
