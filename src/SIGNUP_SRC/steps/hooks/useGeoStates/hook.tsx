import { createGeoStates } from "SIGNUP_SRC/steps/hooks/useGeoStates/factory";
import { IUseGeoStates, States } from "SIGNUP_SRC/steps/hooks/useGeoStates/types";
import { useEffect, useState } from "react";

export function useGeoStates(statesInitialState: States, options?: IUseGeoStates) {
  const [states, setStates] = useState<States>(statesInitialState);
  const { limit, order } = options ?? {};

  useEffect(() => {
    const GeoStates = createGeoStates(statesInitialState);
    GeoStates.order(order);
    GeoStates.limit(limit);

    setStates(GeoStates.getStates());
  }, [statesInitialState, limit, order]);

  return { states, setStates };
}
