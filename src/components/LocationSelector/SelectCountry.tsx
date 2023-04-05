import Select from "react-select";
import { useFetch } from "@hooks/useFetch";
import { useState, useEffect, ChangeEvent } from "react";
import { CountryProps } from "./SelectLocation.types";
import { ActionType } from "Providers/form";
import { useMultiStepFormContext } from "@hooks/useForm";

const SelectCountry = ({ name, label }: CountryProps) => {
  const [countries, setCountries] = useState<
    Array<{ label: string; value: string }>
  >([]);
  const { dispatch, formData } = useMultiStepFormContext();
  const { getCountries } = useFetch();

  useEffect(() => {
    getCountries().then((fetchedCountries) => {
      const listCountries = fetchedCountries.map(({ nome }) => ({
        label: nome,
        value: nome,
      }));
      setCountries(listCountries);
    });
  }, [getCountries]);

  const handleInputChange = (newValue: any) => {
    const { value } = newValue;
    dispatch({ type: ActionType.UPDATE_FORM_DATA, payload: { [name]: value } });
  };

  return (
    <label htmlFor={name} className="text-secondary-01 font-semibold w-full">
      {label}
      <span title="Obrigatório" className="text-danger-01 mx-1">
        *
      </span>
      <Select
        required
        name={name}
        defaultInputValue={formData.country}
        defaultValue={{ label: "Brasil", value: "br" }}
        options={countries}
        isLoading={!countries}
        isMulti={false}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        onChange={(newValue) => handleInputChange(newValue)}
        className="font-normal"
        classNamePrefix="p-10"
        unstyled
        placeholder="Selecione o país"
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

export default SelectCountry;
