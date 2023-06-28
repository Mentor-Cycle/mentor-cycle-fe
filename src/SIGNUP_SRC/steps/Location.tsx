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
import React, { useId, useState } from "react";
import { useGeoCallbacks } from "SIGNUP_SRC/hooks/useGeoCallbacks";
import { MultipleInputsContainer } from "SIGNUP_SRC/components/Input/MultipleInputsContainer";
import { IPaisesIBGESchema } from "SIGNUP_SRC/schemas/paises";
import { IEstadosIBGESchema } from "SIGNUP_SRC/schemas/estados";
import { FormSelect } from "SIGNUP_SRC/steps/components/FormSelect/component";
import { useCountriesFactory } from "SIGNUP_SRC/steps/factories/useCountriesFactory";
import { useSkillsFactory } from "SIGNUP_SRC/steps/factories/useSkillsFactory";
import { useStatesFactory } from "SIGNUP_SRC/steps/factories/useStatesFactory";
import { IUseGeoStates } from "SIGNUP_SRC/hooks/useGeoStates/types";

const geoStatesOptions: IUseGeoStates = {
  order: "ascending",
};

export const Location = () => {
  const methods = useFormContext<IFormValues>();

  const {
    register,
    control,
    formState: { errors },
  } = methods;

  const [countries, setCountries] = useState<IPaisesIBGESchema | null>(null);
  const [states, setStates] = useState<IEstadosIBGESchema | null>(null);

  useGeoCallbacks("paises", setCountries, console.error);
  useGeoCallbacks("estados", setStates, console.error);

  const Country = useCountriesFactory(countries, methods);
  const State = useStatesFactory(states, methods, geoStatesOptions);
  const Skills = useSkillsFactory(methods);

  const birthDateId = useId();

  return (
    <>
      <MultipleInputsContainer>
        {/* Países */}
        <InputWrapper grow={1}>
          <InputLabel label="País:" htmlFor={Country.inputId} />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <FormSelect
                id={Country.inputId}
                field={field}
                options={Country.options ?? null}
                placeholder="Selecione um país"
                defaultValue="Brasil"
              />
            )}
          />
          <InputErrorMessage errorMessage={Country.errors} />
        </InputWrapper>

        {/* Estados */}
        <InputWrapper grow={1} disabled={!Country.isInBrazil}>
          <InputLabel
            label="Estados:"
            htmlFor={State.inputId}
            disabled={!Country.isInBrazil}
          />
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <FormSelect
                id={State.inputId}
                field={field}
                options={State.options}
                disabled={!Country.isInBrazil}
                placeholder="Selecione um estado"
              />
            )}
          />
          <InputErrorMessage errorMessage={State.errors} />
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
        <InputLabel label="Especializações:" htmlFor={Skills.inputId} />
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
