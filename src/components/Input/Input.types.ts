import { Ref } from "react";
export type InputSize = "standard" | "small";

export interface InputProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "size"> {
  name: string;
  size?: InputSize;
  label?: string;
  required?: boolean;
  pattern?: string;
  search?: boolean;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  mask?: string;
  type?: string;
  disabled?: boolean;
  ref?: React.Ref<HTMLInputElement>;
  onValidChange?: (valid: boolean) => void;
}

export interface InputComponentProps extends InputProps {
  forwardedRef: Ref<HTMLInputElement>;
}
