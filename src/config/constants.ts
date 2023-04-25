export const IBGE_PLACES_API_URL =
  "https://servicodados.ibge.gov.br/api/v1/localidades";

export const PUBLIC_ROUTES = [
  "/signin",
  "/signup/plan",
  "/signup/register",
  "/request-change-password",
  // "/mentors",
  // "/mentors/[id]",
];
export const ROUTES_WITHOUT_HEADER = ["/signin", "/request-change-password"];
export const DAYS_OF_THE_WEEK_SHORT = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

export const DAYS_OF_THE_WEEK = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export type DAY_OF_WEEK = (typeof DAYS_OF_THE_WEEK)[number];
