import { z } from "zod";

export const cidadesIBGESchema = z.array(
  z.object({
    id: z.number(),
    nome: z.string(),
    municipio: z.object({
      id: z.number(),
      nome: z.string(),
      microrregiao: z.object({
        id: z.number(),
        nome: z.string(),
        mesorregiao: z.object({
          id: z.number(),
          nome: z.string(),
          UF: z.object({
            id: z.number(),
            sigla: z.string(),
            nome: z.string(),
            regiao: z.object({
              id: z.number(),
              sigla: z.string(),
              nome: z.string(),
            }),
          }),
        }),
      }),
      "regiao-imediata": z.object({
        id: z.number(),
        nome: z.string(),
        "regiao-intermediaria": z.object({
          id: z.number(),
          nome: z.string(),
          UF: z.object({
            id: z.number(),
            sigla: z.string(),
            nome: z.string(),
            regiao: z.object({
              id: z.number(),
              sigla: z.string(),
              nome: z.string(),
            }),
          }),
        }),
      }),
    }),
  })
);

export type ICidadesIBGESchema = z.infer<typeof cidadesIBGESchema>;
