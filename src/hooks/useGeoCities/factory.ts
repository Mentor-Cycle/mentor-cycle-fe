import { limit, order } from "@hooks/methods";
import { Cities, IUseGeoCities } from "@hooks/useGeoCities/types";
import { CitiesAPI } from "factories/useCitiesFactory/types";

type GetCitiesResponse = { newCities: Cities | null };

export function createGeoCities(
  initialCities: CitiesAPI,
  options?: IUseGeoCities
): GetCitiesResponse {
  let newCities: CitiesAPI | Cities;

  if (!initialCities) return { newCities: null };
  newCities = initialCities.map((city) => ({
    label: city.nome,
    value: city.nome,
  }));

  if (!options) return { newCities };

  if (options.limit) {
    newCities = limit(newCities, options.limit);
  }

  if (options.order) {
    newCities = order(newCities, options.order);
  }

  return { newCities };
}
