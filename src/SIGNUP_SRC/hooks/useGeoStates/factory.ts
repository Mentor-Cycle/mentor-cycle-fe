import { limitStates, orderStates } from "SIGNUP_SRC/hooks/useGeoStates/methods";
import { IUseGeoStates, States } from "SIGNUP_SRC/hooks/useGeoStates/types";

type GetStatesResponse = { newStates: States };

export function createGeoStates(
  initialStates: States,
  options?: IUseGeoStates
): GetStatesResponse {
  let newStates = initialStates;

  if (!options) return { newStates };

  if (options.limit) {
    newStates = limitStates(newStates, options.limit);
  }

  if (options.order) {
    newStates = orderStates(newStates, options.order);
  }

  return { newStates };
}
