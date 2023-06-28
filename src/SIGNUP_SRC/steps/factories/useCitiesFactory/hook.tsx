import {
  CitiesAPI,
  CitiesFactoryMethods,
} from "SIGNUP_SRC/steps/factories/useCitiesFactory/types";
import { IFormValues } from "SIGNUP_SRC/types";
import { UseFormReturn } from "react-hook-form";
import { useId } from "react";
import { IUseGeoStates } from "SIGNUP_SRC/hooks/useGeoStates/types";
import { useGeoCities } from "SIGNUP_SRC/hooks/useGeoCities";

export function useCitiesFactory(
  cities: CitiesAPI,
  useFormMethods: UseFormReturn<IFormValues>,
  options?: IUseGeoStates | undefined
): CitiesFactoryMethods {
  const { cities: processedCities } = useGeoCities(cities, options);
  const { formState } = useFormMethods;
  const { errors: fsErrors } = formState;
  const errors = fsErrors.city?.message;

  const inputId = useId();

  return {
    inputId,
    errors,
    options: processedCities,
  };
}
