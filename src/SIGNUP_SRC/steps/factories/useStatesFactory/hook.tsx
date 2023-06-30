import { StatesFactoryMethods } from "SIGNUP_SRC/steps/factories/useStatesFactory/types";
import { IFormValues } from "SIGNUP_SRC/types";
import { UseFormReturn } from "react-hook-form";
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

  useEffect(() => {
    setValue("city", "");
  }, [state]);

  return {
    inputId,
    errors,
    options: processedStates,
    userAlreadyChooseState,
  };
}
