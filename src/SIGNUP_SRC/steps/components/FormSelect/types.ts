import { ControllerRenderProps, FieldPath, Noop, RefCallBack } from "react-hook-form";
import { SingleValue } from "react-select";
import { ReactSelectInterface } from "types/react-select";
import { IFormValues } from "SIGNUP_SRC/types";

export type OnChangeHandler = (newValue: SingleValue<ReactSelectInterface>) => void;

export interface IFormSelect<T extends FieldPath<IFormValues>> {
  id: string;
  options: ReactSelectInterface[] | null;
  field: ControllerRenderProps<IFormValues, T>;
  defaultValue?: string | ReactSelectInterface;
  disabled?: boolean;
  placeholder?: string;
  noOptionsMessage?: string;
  isLoading?: boolean;
}
