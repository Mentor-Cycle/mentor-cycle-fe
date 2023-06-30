import { CitiesFactoryMethods } from "SIGNUP_SRC/steps/factories/useCitiesFactory/types";
import { IFormValues } from "SIGNUP_SRC/types";
import { UseFormReturn } from "react-hook-form";
import { useId } from "react";
import { IUseGeoStates } from "SIGNUP_SRC/hooks/useGeoStates/types";
import { useGeoCities } from "SIGNUP_SRC/hooks/useGeoCities";
import { useGeoFetches } from "SIGNUP_SRC/hooks/useGeoFetches";

export function useCitiesFactory(
  useFormMethods: UseFormReturn<IFormValues>,
  options?: IUseGeoStates | undefined
): CitiesFactoryMethods {
  const { formState, watch } = useFormMethods;
  const { errors: fsErrors } = formState;

  const stateName = watch("state");

  const { data: cities, isLoading } = useGeoFetches("cidades", { stateName });
  const { cities: processedCities } = useGeoCities(cities, options);

  const errors = fsErrors.city?.message;
  const inputId = useId();

  return {
    inputId,
    errors,
    options: processedCities,
    isLoading,
  };
}
