import { IUseGeoStates, States } from "SIGNUP_SRC/hooks/useGeoStates/types";

export function orderStates<T extends States | null>(
  value: T,
  order: IUseGeoStates["order"]
) {
  if (!value || !order) return value;
  const sortingIndex = order === "ascending" ? 1 : -1;
  return value.sort((a, b) =>
    a.label > b.label ? sortingIndex : a.label < b.label ? sortingIndex * -1 : 0
  );
}

export function limitStates<T extends States | null>(
  value: T,
  limit: IUseGeoStates["limit"]
) {
  if (!value || !limit) return value;
  return value.slice(0, limit);
}
