import { limit, order } from "@hooks/methods";
import { IUseGeoStates, States } from "@hooks/useGeoStates/types";

type GetStatesResponse = { newStates: States | null };

export function createGeoStates(
  initialStates: States,
  options?: IUseGeoStates
): GetStatesResponse {
  let newStates = initialStates;

  if (!options) return { newStates };

  if (options.limit) {
    newStates = limit(newStates, options.limit);
  }

  if (options.order) {
    newStates = order(newStates, options.order);
  }

  return { newStates };
}
