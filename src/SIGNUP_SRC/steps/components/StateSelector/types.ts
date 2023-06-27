import { Noop, RefCallBack } from "react-hook-form";
import { ReactSelectInterface } from "types/react-select";
import { IFormValues } from "SIGNUP_SRC/types";

type ControllerRenderProps = {
  onChange: (...event: any[]) => void;
  onBlur: Noop;
  value: string;
  name: keyof IFormValues;
  ref: RefCallBack;
};

export interface StateSelectorProps {
  id: string;
  options: ReactSelectInterface[] | null;
  field: ControllerRenderProps;
  disabled?: boolean;
  placeholder: string;
}
