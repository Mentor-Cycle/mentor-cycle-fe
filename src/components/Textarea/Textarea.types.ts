export interface TextareaProps
  extends Omit<React.HTMLProps<HTMLTextAreaElement>, "size"> {
  name: string;
  label?: string;
}
