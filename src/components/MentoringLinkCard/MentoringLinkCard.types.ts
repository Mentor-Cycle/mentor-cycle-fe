import { ReactNode } from "react";

export type Props = {
  avatar?: string;
  name: string;
  id?: string;
  job: string;
  date: ReactNode;
  hour: ReactNode;
  status: "Não realizada" | "Realizada" | "A confirmar";
};

export type StatusToVariantMap = {
  [key: string]: "primary" | "secondary" | "tertiary";
};
