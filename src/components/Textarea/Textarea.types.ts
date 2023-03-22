export interface TextareaProps
  extends Omit<React.HTMLProps<HTMLTextAreaElement>, "size"> {
  name: string;
  label?: string;
  required?: boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}
