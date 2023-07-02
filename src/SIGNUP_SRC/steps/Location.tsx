import { Input } from "SIGNUP_SRC/components/Input";
import { IFormValues } from "SIGNUP_SRC/types";
import { Controller, useFormContext } from "react-hook-form";
import React, { useId } from "react";
import { CountriesFactoryMethods } from "SIGNUP_SRC/steps/factories/useCountriesFactory/types";
import { StatesFactoryMethods } from "SIGNUP_SRC/steps/factories/useStatesFactory/types";
import { CitiesFactoryMethods } from "SIGNUP_SRC/steps/factories/useCitiesFactory/types";
import { SkillsFactoryMethods } from "SIGNUP_SRC/steps/factories/useSkillsFactory/types";
import { Form } from "SIGNUP_SRC/components/Form";

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
      <Form.MultipleInRow>
        {/* Países */}
        <Input.Root grow={1}>
          <Input.Label label="País:" htmlFor={Country.inputId} required />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Input.Select
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
          <Input.Error errorMessage={Country.errors} />
        </Input.Root>

        {/* Estados */}
        <Input.Root grow={1} disabled={userIsNotInBrazil}>
          <Input.Label
            label="Estados:"
            htmlFor={State.inputId}
            disabled={userIsNotInBrazil}
          />
          <Controller
            name="state"
            control={control}
            render={({ field }) => {
              return (
                <Input.Select
                  id={State.inputId}
                  field={State.getFieldController(field)}
                  options={State.options}
                  disabled={userIsNotInBrazil}
                  noOptionsMessage="Nenhum estado encontrado."
                  placeholder="Selecione um estado"
                />
              );
            }}
          />
          <Input.Error errorMessage={State.errors} />
        </Input.Root>
      </Form.MultipleInRow>
      <Form.MultipleInRow>
        {/* Cidades */}
        <Input.Root grow={1} disabled={userIsNotInBrazil || userHasNotChosenStateYet}>
          <Input.Label
            label="Cidade:"
            htmlFor={City.inputId}
            disabled={userIsNotInBrazil || userHasNotChosenStateYet}
          />
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input.Select
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
          <Input.Error errorMessage={City.errors} />
        </Input.Root>

        <Input.Root grow={1}>
          <Input.Label label="Data de Nascimento:" htmlFor={birthDateId} />
          <Controller
            name="birthDate"
            control={control}
            render={({ field: { value, ...rest } }) => (
              <Input.Date
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
          <Input.Error errorMessage={errors.birthDate?.message} />
        </Input.Root>
      </Form.MultipleInRow>

      <Input.Root grow={1}>
        <Input.Label label="Especializações:" htmlFor={Skills.inputId} required />
        <Controller
          name="skills"
          control={control}
          render={({ field }) => {
            return (
              <Input.MultiSelect
                id={Skills.inputId}
                options={Skills.options}
                tabIndex={20}
                isLoading={Skills.isLoading}
                className="input-sign"
                {...field}
                ref={null}
              />
            );
          }}
        />
        <Input.Error errorMessage={Skills.errors} />
      </Input.Root>
    </>
  );
};
