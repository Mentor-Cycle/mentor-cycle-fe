export const IBGE_PLACES_API_URL = "https://servicodados.ibge.gov.br/api/v1/localidades";

export const PUBLIC_ROUTES = [
  "/signin",
  "/signup/register",
  "/request-change-password",
  // "/mentors",
  // "/mentors/[id]",
];
export const ROUTES_WITHOUT_HEADER = [
  "/signin",
  "/signup/register",
  "/request-change-password",
  "/",
  "/landing-page",
];
export const DAYS_OF_THE_WEEK_SHORT = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
] as const;

export const DAYS_OF_THE_WEEK = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
] as const;

export const DAYS_OF_THE_WEEK_TO_NUMBER = {
  "segunda-feira": 1,
  "terça-feira": 2,
  "quarta-feira": 3,
  "quinta-feira": 4,
  "sexta-feira": 5,
  sábado: 6,
  domingo: 0,
} as const;

export type TWeekday_Short = (typeof DAYS_OF_THE_WEEK_SHORT)[number];
export type TWeekday = (typeof DAYS_OF_THE_WEEK)[number];
export type TWeekday_Lowercase = keyof typeof DAYS_OF_THE_WEEK_TO_NUMBER;
