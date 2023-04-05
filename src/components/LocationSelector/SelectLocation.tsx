import Select from "react-select";
import { Dispatch, SetStateAction } from "react";
import { SelectProps } from "./SelectLocation.types";

const SelectLocation = ({
  options,
  onSelect,
  placeholder,
  defaultValue,
  label,
  name,
}: {
  options: [];
  onSelect: any;
  placeholder: string;
  defaultValue: SelectProps;
  label: string;
  name: string;
}) => {
  return (
    <label htmlFor={name} className="text-secondary-01 font-semibold w-full">
      {label}
      <span title="Obrigatório" className="text-danger-01 mx-1">
        *
      </span>
      <Select
        required
        name={name}
        defaultValue={defaultValue}
        options={options}
        isLoading={!options}
        isMulti={false}
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
          control: () =>
            `bg-neutral-03 hover:bg-neutral-01 hover:cursor-pointer rounded-md py-4 px-6 dark:bg-secondary-03 dark:text-neutral-01 border border-gray-03 mt-2`,
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
