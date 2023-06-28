export type FilterOrder = "ascending" | "descending";

export function order<T extends Array<{ label: string }>>(
  value: T | null,
  order: FilterOrder
): T | null {
  if (!value || !order) return value;
  const sortingIndex = order === "ascending" ? 1 : -1;
  return value.sort((a, b) =>
    a.label > b.label ? sortingIndex : a.label < b.label ? -sortingIndex : 0
  );
}
