import { IFormValues } from "SIGNUP_SRC/types";

export const defaultValues: IFormValues = {
  birthDate: "",
  city: "",
  country: "Brasil",
  description: "",
  email: "",
  firstName: "",
  github: "",
  isMentor: false,
  lastName: "",
  linkedin: "",
  password: "",
  repeatPassword: "",
  skills: [],
  state: "",
  isTermsAccepted: false,
};

export const statesObject = [
  {
    value: "AC",
    label: "Acre",
  },
  {
    value: "AL",
    label: "Alagoas",
  },
  {
    value: "AP",
    label: "Amapá",
  },
  {
    value: "AM",
    label: "Amazonas",
  },
  {
    value: "BA",
    label: "Bahia",
  },
  {
    value: "CE",
    label: "Ceará",
  },
  {
    value: "DF",
    label: "Distrito Federal",
  },
  {
    value: "ES",
    label: "Espírito Santo",
  },
  {
    value: "GO",
    label: "Goiás",
  },
  {
    value: "MA",
    label: "Maranhão",
  },
  {
    value: "MT",
    label: "Mato Grosso",
  },
  {
    value: "MS",
    label: "Mato Grosso do Sul",
  },
  {
    value: "MG",
    label: "Minas Gerais",
  },
  {
    value: "PR",
    label: "Paraná",
  },
  {
    value: "PB",
    label: "Paraíba",
  },
  {
    value: "PA",
    label: "Pará",
  },
  {
    value: "PE",
    label: "Pernambuco",
  },
  {
    value: "PI",
    label: "Piauí",
  },
  {
    value: "RN",
    label: "Rio Grande do Norte",
  },
  {
    value: "RS",
    label: "Rio Grande do Sul",
  },
  {
    value: "RJ",
    label: "Rio de Janeiro",
  },
  {
    value: "RO",
    label: "Rondônia",
  },
  {
    value: "RR",
    label: "Roraima",
  },
  {
    value: "SC",
    label: "Santa Catarina",
  },
  {
    value: "SE",
    label: "Sergipe",
  },
  {
    value: "SP",
    label: "São Paulo",
  },
  {
    value: "TO",
    label: "Tocantins",
  },
];
