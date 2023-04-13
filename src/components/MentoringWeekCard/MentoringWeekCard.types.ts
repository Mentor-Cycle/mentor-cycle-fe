import { ReactElement } from "react";

export type Props = {
  day:
    | "Domingo"
    | "Segunda-feira"
    | "Terça-feira"
    | "Quarta-feira"
    | "Quinta-feira"
    | "Sexta-feira"
    | "Sábado";
  description: string;
  chips: ReactElement[];
};
