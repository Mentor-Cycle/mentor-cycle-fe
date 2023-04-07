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
  status: "A confirmar" | "Confirmada";
  hour: string;
};
