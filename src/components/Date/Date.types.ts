import { InputHTMLAttributes } from "react";

export type DateSize = "standard" | "small";

export interface InputBirthdayProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: DateSize;
  label: string;
  name: string;
  disabled?: boolean;
}
