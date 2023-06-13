export type Pretify<T> = {
  [K in keyof T]: T[K];
} & {};
