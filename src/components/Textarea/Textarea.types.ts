import { TextareaHTMLAttributes } from "react";

export interface ITextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
}

// export interface TextareaProps
//   extends Omit<React.HTMLProps<HTMLTextAreaElement>, "size"> {
//   name: string;
//   label?: string;
// }
