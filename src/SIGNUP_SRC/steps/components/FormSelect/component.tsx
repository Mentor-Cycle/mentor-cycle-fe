import React from "react";
import Select from "react-select";
import { createReactSelectInterface } from "SIGNUP_SRC/helpers/createReactSelectInterface";
import {
  IFormSelect,
  OnChangeHandler,
} from "SIGNUP_SRC/steps/components/FormSelect/types";

export function FormSelect(props: IFormSelect) {
  const hasValidValue = props.field.value.length;

  const handleOnChange: OnChangeHandler = (newValue) => {
    props.field.onChange(newValue?.label ?? "");
    // return props.onChange(newValue);
  };

  const defaultValue =
    typeof props.defaultValue === "string"
      ? createReactSelectInterface(props.defaultValue)
      : props.defaultValue;
  const selectValue = createReactSelectInterface(props.field.value);

  // null ativa o placeholder, string vazia não
  const value = hasValidValue ? selectValue : null;

  return (
    <Select
      id={props.id}
      options={props.options ?? []}
      autoFocus
      unstyled
      isDisabled={props.disabled}
      placeholder={props.placeholder}
      defaultValue={defaultValue}
      value={value}
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