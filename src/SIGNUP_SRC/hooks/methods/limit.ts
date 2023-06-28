export type LimitFilter = number;

export function limit<T extends unknown[] | null>(value: T, limit: LimitFilter): T {
  if (!value || !limit) return value;
  return value.slice(0, limit) as T;
}
