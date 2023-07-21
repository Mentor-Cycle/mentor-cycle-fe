import { CitiesFactoryMethods } from "factories/useCitiesFactory/types";
import { IFormValues } from "providers/signup/register/types";
import { UseFormReturn } from "react-hook-form";
import { useId } from "react";
import { IUseGeoStates } from "@hooks/useGeoStates/types";
import { useGeoCities } from "@hooks/useGeoCities";
import { useGeoFetches } from "@hooks/useGeoFetches";

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
