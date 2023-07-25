import { useGeoFetches } from "@hooks/useGeoFetches";
import { CountriesFactoryMethods } from "factories/useCountriesFactory/types";
import { IFormValues } from "providers/signup/register/types";
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
