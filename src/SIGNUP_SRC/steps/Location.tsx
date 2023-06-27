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
import React, { useId, useState } from "react";
import { useGeoCallbacks } from "SIGNUP_SRC/hooks/useGeoCallbacks";
import { MultipleInputsContainer } from "SIGNUP_SRC/components/Input/MultipleInputsContainer";
import { IPaisesIBGESchema } from "SIGNUP_SRC/schemas/paises";
import { IEstadosIBGESchema } from "SIGNUP_SRC/schemas/estados";
import { FormSelect } from "SIGNUP_SRC/steps/components/FormSelect/component";
import { logError } from "SIGNUP_SRC/helpers/logError";
import { useCountriesFactory } from "SIGNUP_SRC/steps/hooks/useCountriesFactory";

export const Location = () => {
  const methods = useFormContext<IFormValues>();

  const {
    register,
    control,
    formState: { errors },
  } = methods;

  const { data: skillsResponse, error: errorSkillsResponse } = useTypedQuery(
    api.GET_SKILLS
  );
  logError({ errorSkillsResponse });

  const [countries, setCountries] = useState<IPaisesIBGESchema | null>(null);
  const [states, setStates] = useState<IEstadosIBGESchema | null>(null);

  useGeoCallbacks("paises", setCountries, console.error);
  useGeoCallbacks("estados", setStates, console.error);

  const Countries = useCountriesFactory(countries, methods);

  const skillsId = useId();
  const countryId = useId();
  const stateId = useId();
  const birthDateId = useId();

  const skillsOptions = skillsResponse?.findAllSkills.map((skill) => skill.name) ?? null;

  return (
    <>
      <MultipleInputsContainer>
        <InputWrapper grow={1}>
          <InputLabel label="País:" htmlFor={countryId} />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <FormSelect
                id={countryId}
                field={field}
                options={Countries.options ?? null}
                placeholder="Selecione um país"
                defaultValue="Brasil"
              />
            )}
          />
          <InputErrorMessage errorMessage={errors.country?.message} />
        </InputWrapper>

        <InputWrapper grow={1} disabled={!Countries.isInBrazil}>
          <InputLabel
            label="Estados:"
            htmlFor={stateId}
            disabled={!Countries.isInBrazil}
          />
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <FormSelect
                id={stateId}
                field={field}
                options={states}
                disabled={!Countries.isInBrazil}
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
