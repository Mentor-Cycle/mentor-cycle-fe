import { ReactSelectInterface } from "types/react-select";

export function createReactSelectInterface(
  value: string | undefined | null
): ReactSelectInterface | null {
  if (!value) return null;
  return {
    label: value,
    value,
  };
}
