import { cidadesIBGESchema } from "schemas/cidades";
import { paisesIBGESchema } from "schemas/paises";
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
