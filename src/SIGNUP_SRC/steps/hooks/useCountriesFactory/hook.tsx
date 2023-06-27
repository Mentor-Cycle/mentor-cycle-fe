import {
  Countries,
  CountriesFactoryMethods,
} from "SIGNUP_SRC/steps/hooks/useCountriesFactory/types";
import { IFormValues } from "SIGNUP_SRC/types";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

export function useCountriesFactory(
  countries: Countries,
  useFormMethods: UseFormReturn<IFormValues>
): CountriesFactoryMethods {
  const { watch, setValue } = useFormMethods;

  const actualCountry = watch("country");

  const options = countries?.map((country) => ({
    label: country.nome,
    value: country.nome,
  }));

  const isInBrazil = actualCountry === "Brasil";

  useEffect(() => {
    if (actualCountry !== "Brasil") {
      setValue("state", "");
    }
  }, [actualCountry]);

  return { options: options ?? null, isInBrazil };
}
