export type Props = {
  avatar?: string;
  name: string;
  job: string;
  date: Date;
  hour: Date;
  status: "Não realizada" | "Realizada" | "A confirmar";
};

export type StatusToVariantMap = {
  [key: string]: "primary" | "secondary" | "tertiary";
};
