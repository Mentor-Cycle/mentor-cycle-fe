import {
  Input,
  InputErrorMessage,
  InputLabel,
  InputWrapper,
} from "SIGNUP_SRC/components/Input";
import { IFormValues } from "SIGNUP_SRC/types";
import { Controller, useFormContext } from "react-hook-form";
import { InputAttributes, PatternFormat, PatternFormatProps } from "react-number-format";
import { Select as MultiSelect } from "SIGNUP_SRC/components/SelectControlled";
import { useTypedQuery } from "@hooks/useTypedQuery";
import { queriesIndex as api } from "services/apollo/queries/queries.index";
import React, { useEffect, useId, useState } from "react";
import { useGeoCallbacks } from "SIGNUP_SRC/hooks/useGeoCallbacks";
import { MultipleInputsContainer } from "SIGNUP_SRC/components/Input/MultipleInputsContainer";
import { ReactSelectInterface } from "types/react-select";
import { CountrySelector } from "SIGNUP_SRC/steps/components/CountrySelector";
import { IPaisesIBGESchema } from "SIGNUP_SRC/schemas/paises";
import { IEstadosIBGESchema } from "SIGNUP_SRC/schemas/estados";
import { StateSelector } from "SIGNUP_SRC/steps/components/StateSelector";

export const Location = () => {
  const [countries, setCountries] = useState<IPaisesIBGESchema | null>(null);
  const [states, setStates] = useState<IEstadosIBGESchema | null>(null);

  const skillsId = useId();
  const countryId = useId();
  const stateId = useId();
  const birthDateId = useId();

  useGeoCallbacks("paises", setCountries, console.error);
  useGeoCallbacks("estados", setStates, console.error);

  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<IFormValues>();

  const country = watch("country");
  const isInBrazil = country === "Brasil";

  const { data: skillsResponse, error: errorSkillsResponse } = useTypedQuery(
    api.GET_SKILLS
  );
  if (errorSkillsResponse?.error) {
    console.log("errorSkillsResponse", errorSkillsResponse);
  }

  const skillsOptions = skillsResponse?.findAllSkills.map((skill) => skill.name) ?? null;

  const countriesOptions: ReactSelectInterface[] | undefined = countries?.map(
    ({ nome }) => ({
      value: nome,
      label: nome,
    })
  );

  const statesOptions: ReactSelectInterface[] | undefined = states?.map(
    ({ nome, sigla }) => ({
      value: sigla,
      label: nome,
    })
  );

  useEffect(() => {
    if (country !== "Brasil") {
      setValue("state", "");
    }
  }, [country]);

  return (
    <>
      <MultipleInputsContainer>
        <InputWrapper grow={1}>
          <InputLabel label="País:" htmlFor={countryId} />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <CountrySelector
                id={countryId}
                field={field}
                options={countriesOptions ?? null}
              />
            )}
          />
          <InputErrorMessage errorMessage={errors.country?.message} />
        </InputWrapper>

        <InputWrapper grow={1} disabled={!isInBrazil}>
          <InputLabel label="Estados:" htmlFor={stateId} disabled={!isInBrazil} />
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <StateSelector
                id={stateId}
                field={field}
                options={statesOptions ?? null}
                disabled={!isInBrazil}
                placeholder="Selecione um estado"
              />
            )}
          />
          <InputErrorMessage errorMessage={errors.state?.message} />
        </InputWrapper>
      </MultipleInputsContainer>
      <MultipleInputsContainer>
        <Input
          {...register("city")}
          errorMessage={errors.city?.message}
          label="Cidade:"
          placeholder="Campinas"
        />

        <InputWrapper grow={1}>
          <InputLabel label="Data de Nascimento:" htmlFor={birthDateId} />
          <Controller
            name="birthDate"
            control={control}
            render={({ field: { value, ...rest } }) => (
              <DateInput
                id={birthDateId}
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
        <InputLabel label="Especializações:" htmlFor={skillsId} />
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
