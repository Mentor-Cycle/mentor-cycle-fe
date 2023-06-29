import { z } from "zod";
import moment from "moment";

export const birthDateSchema = z
  .string()
  .refine((stringDate) => !!stringDate.length, "Preencha a data corretamente.")
  .refine(
    (stringDate) => !(stringDate.split("")[9] === "_"),
    "Preencha a data corretamente."
  )
  .refine(
    (stringDate) => moment(stringDate, "DD/MM/YYYY").isValid(),
    "Insira uma data válida."
  )
  .refine(
    (stringDate) => moment(stringDate, "DD/MM/YYYY").isBefore(moment()),
    "A data precisa ser antes de agora."
  )
  .refine((stringDate) => {
    const date18YearsAgo = moment().subtract(18, "years");
    return moment(stringDate, "DD/MM/YYYY").isBefore(date18YearsAgo);
  }, "Você precisa ser acima de 18 anos para se registrar no site.");
