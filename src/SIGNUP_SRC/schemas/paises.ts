import { z } from "zod";

export const paisesIBGESchema = z.array(
  z.union([
    z.object({
      id: z.object({
        M49: z.number(),
        "ISO-ALPHA-2": z.string(),
        "ISO-ALPHA-3": z.string(),
      }),
      nome: z.string(),
      "regiao-intermediaria": z.null(),
      "sub-regiao": z.object({
        id: z.object({ M49: z.number() }),
        nome: z.string(),
        regiao: z.object({
          id: z.object({ M49: z.number() }),
          nome: z.string(),
        }),
      }),
    }),
    z.object({
      id: z.object({
        M49: z.number(),
        "ISO-ALPHA-2": z.string(),
        "ISO-ALPHA-3": z.string(),
      }),
      nome: z.string(),
      "regiao-intermediaria": z.object({
        id: z.object({ M49: z.number() }),
        nome: z.string(),
      }),
      "sub-regiao": z.object({
        id: z.object({ M49: z.number() }),
        nome: z.string(),
        regiao: z.object({
          id: z.object({ M49: z.number() }),
          nome: z.string(),
        }),
      }),
    }),
  ])
);

export type IPaisesIBGESchema = z.infer<typeof paisesIBGESchema>;
