export type DateSize = "standard" | "small";

export interface DateProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "size"> {
  name: string;
  size?: DateSize;
  label?: string;
}
