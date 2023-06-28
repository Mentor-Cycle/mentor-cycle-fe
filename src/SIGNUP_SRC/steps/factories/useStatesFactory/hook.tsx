import {
  States,
  StatesFactoryMethods,
} from "SIGNUP_SRC/steps/factories/useStatesFactory/types";
import { IFormValues } from "SIGNUP_SRC/types";
import { UseFormReturn } from "react-hook-form";
import { useId } from "react";
import { useGeoStates } from "SIGNUP_SRC/hooks/useGeoStates";
import { IUseGeoStates } from "SIGNUP_SRC/hooks/useGeoStates/types";

export function useStatesFactory(
  states: States,
  useFormMethods: UseFormReturn<IFormValues>,
  options?: IUseGeoStates | undefined
): StatesFactoryMethods {
  const { states: processedStates } = useGeoStates(states, options);
  const { formState } = useFormMethods;
  const { errors: fsErrors } = formState;
  const errors = fsErrors.state?.message;

  const inputId = useId();

  return {
    inputId,
    errors,
    options: processedStates,
  };
}
