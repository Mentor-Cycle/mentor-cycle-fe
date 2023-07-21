import { createGeoCities } from "@hooks/useGeoCities/factory";
import { Cities, IUseGeoCities } from "@hooks/useGeoCities/types";
import { CitiesAPI } from "factories/useCitiesFactory/types";
import { useEffect, useState } from "react";

export function useGeoCities(citiesInitialState: CitiesAPI, options?: IUseGeoCities) {
  const [cities, setCities] = useState<Cities | null>(null);
  useEffect(() => {
    const { newCities } = createGeoCities(citiesInitialState, options);
    setCities(newCities);
  }, [citiesInitialState]);

  return { cities, setCities };
}
