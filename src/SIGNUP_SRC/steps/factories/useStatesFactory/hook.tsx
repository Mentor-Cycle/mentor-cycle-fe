import { StatesFactoryMethods } from "SIGNUP_SRC/steps/factories/useStatesFactory/types";
import { IFormValues } from "SIGNUP_SRC/types";
import {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  PathValue,
  UseFormReturn,
} from "react-hook-form";
import { useEffect, useId } from "react";
import { useGeoStates } from "SIGNUP_SRC/hooks/useGeoStates";
import { IUseGeoStates } from "SIGNUP_SRC/hooks/useGeoStates/types";
import { statesObject } from "SIGNUP_SRC/constants";

export function useStatesFactory(
  useFormMethods: UseFormReturn<IFormValues>,
  options?: IUseGeoStates | undefined
): StatesFactoryMethods {
  const { formState, watch, setValue } = useFormMethods;
  const { errors: fsErrors } = formState;
  const errors = fsErrors.state?.message;

  const states = statesObject;
  const { states: processedStates } = useGeoStates(states, options);

  const state = watch("state");
  const userAlreadyChooseState = state !== "";
  const inputId = useId();

  function getFieldController<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
  >(
    field: ControllerRenderProps<TFieldValues, TName>
  ): ControllerRenderProps<TFieldValues, TName> {
    const foundValue = statesObject.find(({ value }) => field.value === value);
    const finalValue = foundValue?.label ?? "";
    return { ...field, value: finalValue as PathValue<TFieldValues, TName> };
  }

  useEffect(() => {
    setValue("city", "");
  }, [state]);

  return {
    inputId,
    errors,
    options: processedStates,
    userAlreadyChooseState,
    getFieldController,
  };
}
