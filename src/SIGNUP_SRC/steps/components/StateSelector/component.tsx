import React from "react";
import Select, { SingleValue } from "react-select";
import { ReactSelectInterface } from "types/react-select";
import { useGeoStates } from "SIGNUP_SRC/steps/hooks/useGeoStates";
import type { StateSelectorProps } from "SIGNUP_SRC/steps/components/StateSelector/types";

export function StateSelector(props: StateSelectorProps) {
  const { states } = useGeoStates(props.options, {
    order: "asceding",
  });
  const hasValidValue = props.field.value.length;

  const actualValue: ReactSelectInterface = {
    label: props.field.value,
    value: props.field.value,
  };

  function handleOnChange(newValue: SingleValue<ReactSelectInterface>) {
    if (newValue) props.field.onChange(newValue.label);
  }

  return (
    <Select
      id={props.id}
      isDisabled={props.disabled}
      options={states ?? []}
      placeholder={props.placeholder}
      autoFocus
      unstyled
      value={hasValidValue ? actualValue : null}
      onChange={handleOnChange}
      onBlur={props.field.onBlur}
      styles={{
        control: (base) => ({
          ...base,
          minHeight: "unset",
          cursor: "pointer",
        }),
        menu: (base) => {
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
        container: ({ isDisabled }) =>
          `input-sign ${
            isDisabled ? "bg-secondary-02 text-gray-02 border-secondary-01" : ""
          }`,
        menu: () => "input-sign",
        option: () => "py-2 px-4 hover:bg-secondary-02 rounded-lg hover:cursor-pointer",
      }}
    />
  );
}
