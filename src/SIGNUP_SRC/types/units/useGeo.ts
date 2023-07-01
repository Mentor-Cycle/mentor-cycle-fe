import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import { ReactSelectInterface } from "types/react-select";

export type InputId = { inputId: string };
export type SelectOptions = { options: ReactSelectInterface[] | null };
export type Errors = { errors?: string | undefined };
export type Loading = { isLoading: boolean };
export type GetFieldController = {
  getFieldController: <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
  >(
    field: ControllerRenderProps<TFieldValues, TName>
  ) => ControllerRenderProps<TFieldValues, TName>;
};
