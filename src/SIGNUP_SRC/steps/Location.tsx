import {
  Input,
  InputErrorMessage,
  InputLabel,
  InputWrapper,
} from "SIGNUP_SRC/components/Input";
import { IFormValues } from "SIGNUP_SRC/types";
import { Controller, useFormContext } from "react-hook-form";
import {
  InputAttributes,
  PatternFormat,
  PatternFormatProps,
} from "react-number-format";
import { Select as MultiSelect } from "SIGNUP_SRC/components/SelectControlled";
import { useTypedQuery } from "@hooks/useTypedQuery";
import { queriesIndex as api } from "services/apollo/queries/queries.index";
import React, { useId, useState } from "react";
import Select from "react-select";
import { useGeoCallbacks } from "SIGNUP_SRC/hooks/useGeoCallbacks";
import { MultipleInputsContainer } from "SIGNUP_SRC/components/Input/MultipleInputsContainer";
import { ReactSelectInterface } from "types/react-select";
import { CountrySelector } from "SIGNUP_SRC/steps/components/CountrySelector";
import { IPaisesIBGESchema } from "SIGNUP_SRC/schemas/paises";
import { IEstadosIBGESchema } from "SIGNUP_SRC/schemas/estados";

export const Location = () => {
  const [countries, setCountries] = useState<IPaisesIBGESchema | null>(null);
  const [states, setStates] = useState<IEstadosIBGESchema | null>(null);
  const skillsId = useId();

  useGeoCallbacks("paises", setCountries, console.error);
  useGeoCallbacks("estados", setStates, console.error);

  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext<IFormValues>();

  const { data: skillsResponse, error: errorSkillsResponse } = useTypedQuery(
    api.GET_SKILLS
  );
  if (errorSkillsResponse?.error) {
    console.log("errorSkillsResponse", errorSkillsResponse);
  }

  const skillsOptions =
    skillsResponse?.findAllSkills.map((skill) => skill.name) ?? null;

  const countriesOptions: ReactSelectInterface[] | null =
    countries?.map(({ nome }) => ({
      value: nome,
      label: nome,
    })) ?? null;

  const country = watch("country");
  console.log("Country", country);

  return (
    <>
      <MultipleInputsContainer>
        <InputWrapper grow={1}>
          <InputLabel label="País:" />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <CountrySelector
                field={field}
                countriesOptions={countriesOptions}
              />
            )}
          />
          <InputErrorMessage errorMessage={errors.country?.message} />
        </InputWrapper>
        <Input
          {...register("state")}
          errorMessage={errors.state?.message}
          label="Estado:"
          placeholder="SP"
        />
      </MultipleInputsContainer>
      <MultipleInputsContainer>
        <Input
          {...register("city")}
          errorMessage={errors.city?.message}
          label="Cidade:"
          placeholder="Campinas"
        />

        <InputWrapper grow={1}>
          <InputLabel label="Data de Nascimento:" />
          <Controller
            name="birthDate"
            control={control}
            render={({ field: { value, ...rest } }) => (
              <DateInput
                valueIsNumericString
                format="##/##/####"
                mask="_"
                placeholder="__/__/____"
                defaultValue={value.replace(/\D/g, "")}
                className="input-sign"
                {...rest}
              />
            )}
          />
          <InputErrorMessage errorMessage={errors.birthDate?.message} />
        </InputWrapper>
      </MultipleInputsContainer>

      <InputWrapper grow={1}>
        <InputLabel label="Especializações:" />
        <Controller
          name="skills"
          control={control}
          render={({ field }) => {
            return (
              <MultiSelect
                id={skillsId}
                options={skillsOptions}
                tabIndex={20}
                className="input-sign"
                {...field}
                ref={null}
              />
            );
          }}
        />
        <InputErrorMessage errorMessage={errors.skills?.message} />
      </InputWrapper>
    </>
  );
};

export interface IDateInput extends PatternFormatProps<InputAttributes> {}

export const DateInput = React.forwardRef<HTMLInputElement, IDateInput>(
  function DateInputComponent({ className, format, ...rest }, ref) {
    const _cn = className ? ` ${className}` : "";

    return (
      <>
        <input type="hidden" ref={ref} />
        <PatternFormat
          valueIsNumericString
          format="##/##/####"
          mask="_"
          className={"" + _cn}
          {...rest}
        />
      </>
    );
  }
);
