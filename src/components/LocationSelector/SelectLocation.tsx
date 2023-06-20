import Select from "react-select";
import { City, Country, State } from "@hooks/useFetch.types";
import clsx from "clsx";
import React from "react";

const SelectLocation = ({
  options,
  onSelect,
  placeholder,
  label,
  name,
  value,
  isDisabled,
  requiredField,
  defaultValue,
  autoFocus,
}: {
  options: State[] | City[] | Country[];
  onSelect: any;
  placeholder: string;
  label: string;
  name: string;
  value?: any;
  requiredField?: boolean;
  isDisabled?: boolean;
  defaultValue?: any;
  autoFocus?: boolean;
}) => {
  return (
    <label
      htmlFor={name}
      className={clsx(
        " font-semibold w-full",
        isDisabled ? "opacity-50 cursor-not-allowed" : "text-secondary-01"
      )}
    >
      {label}
      {requiredField && (
        <span title="Obrigatório" className="text-danger-01 mx-1">
          *
        </span>
      )}
      <Select
        required={requiredField}
        name={name}
        value={value}
        isDisabled={isDisabled}
        options={options}
        isLoading={!options}
        isMulti={false}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        onChange={onSelect}
        className="font-normal"
        classNamePrefix="p-10"
        unstyled
        placeholder={placeholder}
        classNames={{
          option: () =>
            `py-2 px-4 rounded-md cursor-pointer text-gray-05 hover:bg-primary-01 hover:text-neutral-01 dark:text-neutral-05 dark:hover:text-neutral-01 dark:hover:bg-primary-02`,
          control: ({ isDisabled }) =>
            `${
              isDisabled ? "opacity-30" : ""
            } bg-neutral-03 hover:bg-neutral-01 hover:cursor-pointer rounded-md py-4 px-6 dark:bg-secondary-03 dark:text-neutral-01 border border-gray-03 mt-2`,
          menu: () => `p-8 bg-neutral-01 mt-2 rounded-md dark:bg-secondary-01`,
          multiValue: () =>
            `py-1 px-4 bg-gray-01 text-secondary-03 rounded-full ml-1 mt-1 dark:bg-secondary-01 dark:text-neutral-01`,
          multiValueRemove: () =>
            `rounded-full hover:text-secondary-01 dark:hover:text-primary-02 ml-1 `,
        }}
      />
    </label>
  );
};

export default SelectLocation;
