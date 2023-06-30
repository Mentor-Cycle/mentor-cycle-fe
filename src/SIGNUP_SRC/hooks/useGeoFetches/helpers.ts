import { statesObject } from "SIGNUP_SRC/constants";

export function getStateUF(stateName: string | undefined) {
  const foundState = statesObject.find((s) => s.label === stateName);
  return foundState?.value ?? "State_not_found";
}
