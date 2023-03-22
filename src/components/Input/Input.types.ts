export type InputSize = "standard" | "small";

export interface InputProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "size"> {
  name: string;
  size?: InputSize;
  label?: string;
}
