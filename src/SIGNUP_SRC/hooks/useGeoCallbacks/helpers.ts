import { statesObject } from "SIGNUP_SRC/constants";
import { SchemasType, UseGeoParams } from "SIGNUP_SRC/hooks/useGeoCallbacks/types";
import { IBGE_PLACES_API_URL } from "config/constants";

export function findUF(stateName: string) {
  const foundState = statesObject.find((state) => state.label === stateName);
  return foundState?.value;
}

export function getURL<T extends keyof SchemasType>(
  locationType: T,
  params?: UseGeoParams
): string {
  if (locationType === "cidades" && params) {
    const UF = findUF(params.stateName);
    return `${IBGE_PLACES_API_URL}/estados/${UF}/distritos`;
  }

  return `${IBGE_PLACES_API_URL}/${locationType}`;
}
