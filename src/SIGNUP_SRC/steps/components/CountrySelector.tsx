import React from "react";
import { Noop, RefCallBack } from "react-hook-form";
import Select, { SingleValue } from "react-select";
import { ReactSelectInterface } from "types/react-select";
import { IFormValues } from "SIGNUP_SRC/types";

export type ControllerRenderProps = {
  onChange: (...event: any[]) => void;
  onBlur: Noop;
  value: string;
  name: keyof IFormValues;
  ref: RefCallBack;
};

interface CountrySelectorProps {
  id: string;
  countriesOptions: ReactSelectInterface[] | null;
  field: ControllerRenderProps;
}

export function CountrySelector(props: CountrySelectorProps) {
  const brasilOption: ReactSelectInterface = {
    label: "Brasil",
    value: "Brasil",
  };

  const defaultValue = brasilOption;

  const actualValue: ReactSelectInterface = {
    label: props.field.value,
    value: props.field.value,
  };

  function handleOnChange(newValue: SingleValue<ReactSelectInterface>) {
    if (newValue) props.field.onChange(newValue.value);
  }

  return (
    <Select
      id={props.id}
      options={props.countriesOptions ?? []}
      autoFocus
      unstyled
      value={actualValue}
      defaultValue={defaultValue}
      onChange={handleOnChange}
      onBlur={props.field.onBlur}
      styles={{
        control: (base) => ({
          ...base,
          minHeight: "unset",
          cursor: "pointer",
        }),
        menu: (base, props) => {
          return {
            ...base,
            left: "-1px",
            right: "-1px",
            transform: "translateY(-0.5rem)",
            borderRadius: "0 0 0.5rem 0.5rem",
            borderTop: "none",
            width: "unset",
          };
        },
        menuList: (base) => ({
          ...base,
          maxHeight: "18rem",
        }),
      }}
      classNames={{
        container: () => "input-sign",
        menu: () => "input-sign",
        option: () =>
          "py-2 px-4 hover:bg-secondary-02 rounded-lg hover:cursor-pointer",
      }}
    />
  );
}
