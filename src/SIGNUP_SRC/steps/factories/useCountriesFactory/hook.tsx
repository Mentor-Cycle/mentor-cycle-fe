import { useGeoFetches } from "SIGNUP_SRC/hooks/useGeoFetches";
import {
  Countries,
  CountriesFactoryMethods,
} from "SIGNUP_SRC/steps/factories/useCountriesFactory/types";
import { IFormValues } from "SIGNUP_SRC/types";
import { useEffect, useId } from "react";
import { UseFormReturn } from "react-hook-form";

export function useCountriesFactory(
  useFormMethods: UseFormReturn<IFormValues>
): CountriesFactoryMethods {
  const { watch, setValue, formState } = useFormMethods;
  const { errors: fsErrors } = formState;
  const errors = fsErrors.country?.message;
  const inputId = useId();

  const { data: countries, isLoading } = useGeoFetches("paises");

  const options = countries?.map((country) => ({
    label: country.nome,
    value: country.nome,
  }));

  const actualCountry = watch("country");
  const isInBrazil = actualCountry === "Brasil";

  useEffect(() => {
    if (actualCountry !== "Brasil") {
      setValue("state", "");
      setValue("city", "");
    }
  }, [actualCountry]);

  return {
    options: options ?? null,
    inputId,
    isInBrazil,
    errors,
    isLoading,
  };
}
