import { Ref } from "react";
export type InputSize = "standard" | "small";

export interface InputProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "size"> {
  name: string;
  size?: InputSize;
  label?: string;
  required?: boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

export interface InputComponentProps extends InputProps {
  forwardedRef: Ref<HTMLInputElement>;
}
