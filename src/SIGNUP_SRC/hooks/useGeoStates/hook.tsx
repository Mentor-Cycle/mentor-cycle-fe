import { createGeoStates } from "SIGNUP_SRC/hooks/useGeoStates/factory";
import { IUseGeoStates, States } from "SIGNUP_SRC/hooks/useGeoStates/types";
import { useEffect, useState } from "react";

export function useGeoStates(statesInitialState: States, options?: IUseGeoStates) {
  const [states, setStates] = useState<States>(statesInitialState);
  useEffect(() => {
    const { newStates } = createGeoStates(statesInitialState, options);
    setStates(newStates);
  }, [statesInitialState]);

  return { states, setStates };
}
