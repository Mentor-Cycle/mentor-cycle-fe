import { InputErrorMessage, InputLabel, InputWrapper } from "SIGNUP_SRC/components/Input";
import { IFormValues } from "SIGNUP_SRC/types";
import { Controller, useFormContext } from "react-hook-form";
import { Select as MultiSelect } from "SIGNUP_SRC/components/SelectControlled";
import React, { useId, useState } from "react";
import { MultipleInputsContainer } from "SIGNUP_SRC/components/Input/MultipleInputsContainer";
import { FormSelect } from "SIGNUP_SRC/steps/components/FormSelect/component";
import { DateInput } from "SIGNUP_SRC/steps/components/DateInput";
import { CountriesFactoryMethods } from "SIGNUP_SRC/steps/factories/useCountriesFactory/types";
import { StatesFactoryMethods } from "SIGNUP_SRC/steps/factories/useStatesFactory/types";
import { CitiesFactoryMethods } from "SIGNUP_SRC/steps/factories/useCitiesFactory/types";
import { SkillsFactoryMethods } from "SIGNUP_SRC/steps/factories/useSkillsFactory/types";

export interface LocationProps {
  countryFactory: CountriesFactoryMethods;
  stateFactory: StatesFactoryMethods;
  cityFactory: CitiesFactoryMethods;
  skillsFactory: SkillsFactoryMethods;
}

export const Location = (props: LocationProps) => {
  const methods = useFormContext<IFormValues>();

  const {
    control,
    formState: { errors },
  } = methods;

  const Country = props.countryFactory;
  const State = props.stateFactory;
  const City = props.cityFactory;
  const Skills = props.skillsFactory;

  const birthDateId = useId();

  const userIsNotInBrazil = !Country.isInBrazil;
  const userHasNotChosenStateYet = !State.userAlreadyChooseState;

  return (
    <>
      <MultipleInputsContainer>
        {/* Países */}
        <InputWrapper grow={1}>
          <InputLabel label="País:" htmlFor={Country.inputId} required />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <FormSelect
                id={Country.inputId}
                field={field}
                isLoading={Country.isLoading}
                options={Country.options ?? null}
                noOptionsMessage="Nenhum país encontrado."
                placeholder="Selecione um país"
                defaultValue="Brasil"
              />
            )}
          />
          <InputErrorMessage errorMessage={Country.errors} />
        </InputWrapper>

        {/* Estados */}
        <InputWrapper grow={1} disabled={userIsNotInBrazil}>
          <InputLabel
            label="Estados:"
            htmlFor={State.inputId}
            disabled={userIsNotInBrazil}
          />
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <FormSelect
                id={State.inputId}
                field={field}
                options={State.options}
                disabled={userIsNotInBrazil}
                noOptionsMessage="Nenhum estado encontrado."
                placeholder="Selecione um estado"
              />
            )}
          />
          <InputErrorMessage errorMessage={State.errors} />
        </InputWrapper>
      </MultipleInputsContainer>
      <MultipleInputsContainer>
        {/* Cidades */}
        <InputWrapper grow={1} disabled={userIsNotInBrazil || userHasNotChosenStateYet}>
          <InputLabel
            label="Cidade:"
            htmlFor={City.inputId}
            disabled={userIsNotInBrazil || userHasNotChosenStateYet}
          />
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <FormSelect
                id={City.inputId}
                field={field}
                isLoading={City.isLoading}
                options={City.options}
                disabled={userIsNotInBrazil || userHasNotChosenStateYet}
                noOptionsMessage="Nenhuma cidade encontrada."
                placeholder="Selecione uma cidade"
              />
            )}
          />
          <InputErrorMessage errorMessage={City.errors} />
        </InputWrapper>

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
        <InputLabel label="Especializações:" htmlFor={Skills.inputId} required />
        <Controller
          name="skills"
          control={control}
          render={({ field }) => {
            return (
              <MultiSelect
                id={Skills.inputId}
                options={Skills.options}
                tabIndex={20}
                className="input-sign"
                {...field}
                ref={null}
              />
            );
          }}
        />
        <InputErrorMessage errorMessage={Skills.errors} />
      </InputWrapper>
    </>
  );
};
