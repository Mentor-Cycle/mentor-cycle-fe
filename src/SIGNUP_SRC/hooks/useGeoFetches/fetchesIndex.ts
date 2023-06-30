import { cidadesIBGESchema } from "SIGNUP_SRC/schemas/cidades";
import { paisesIBGESchema } from "SIGNUP_SRC/schemas/paises";
import { IBGE_PLACES_API_URL } from "config/constants";

export const whichFetchIndex = {
  cidades: {
    schema: cidadesIBGESchema,
    generateURL: (UF: string) => `${IBGE_PLACES_API_URL}/estados/${UF}/distritos`,
  },
  estados: {
    schema: paisesIBGESchema,
    generateURL: () => `${IBGE_PLACES_API_URL}/estados`,
  },
  paises: {
    schema: paisesIBGESchema,
    generateURL: () => `${IBGE_PLACES_API_URL}/paises`,
  },
};
