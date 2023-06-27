import { Noop, RefCallBack } from "react-hook-form";
import { SingleValue } from "react-select";
import { ReactSelectInterface } from "types/react-select";
import { IFormValues } from "SIGNUP_SRC/types";

export type OnChangeHandler = (newValue: SingleValue<ReactSelectInterface>) => void;

type ControllerRenderProps = {
  onChange: (newValue: string) => void;
  onBlur: Noop;
  value: string;
  name: keyof IFormValues;
  ref: RefCallBack;
};

export interface IFormSelect {
  id: string;
  options: ReactSelectInterface[] | null;
  field: ControllerRenderProps;
  defaultValue?: string | ReactSelectInterface;
  disabled?: boolean;
  placeholder?: string;
}
