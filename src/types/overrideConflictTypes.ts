export type OverrideConflict<T, R> = Omit<T, keyof R> & R;
