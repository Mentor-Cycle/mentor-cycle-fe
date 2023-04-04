import Select from "react-select";
import { useState, useEffect, ChangeEvent } from "react";
import { useFetch } from "@hooks/useFetch";
import { ActionType } from "Providers/form";
import { useMultiStepFormContext } from "@hooks/useForm";
import { CityOption, SelectCitiesProps } from "./SelectLocation.types";

const SelectCities = ({ name, label }: SelectCitiesProps) => {
  const [cities, setCities] = useState<CityOption[] | null>(null);
  const { dispatch, formData } = useMultiStepFormContext();
  const { state, country } = formData;
  const { getCities } = useFetch();

  useEffect(() => {
    if (state) {
      getCities({ state: state }).then((res) => {
        setCities(res);
      });
    }
  }, [state, getCities]);

  const isDisabled = !state || country !== "Brasil";
  const isLoading = Boolean(!cities && state);

  const renderCities = () => {
    if (!state) {
      return [];
    }
    if (country === "Brasil") {
      return cities?.map(({ nome }) => ({ label: nome, value: nome })) ?? [];
    }
    return [];
  };

  const handleInputChange = (newValue: any) => {
    const { value } = newValue;
    dispatch({ type: ActionType.UPDATE_FORM_DATA, payload: { [name]: value } });
  };

  return (
    <label className="text-secondary-01 font-semibold w-full">
      {label}
      <Select
        name={name}
        isDisabled={isDisabled}
        defaultValue={{ label: formData.city, value: formData.city }}
        isLoading={isLoading}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        onChange={(newValue) => handleInputChange(newValue)}
        options={renderCities()}
        isMulti={false}
        className="font-normal"
        classNamePrefix="p-10"
        unstyled
        placeholder="Selecione a cidade"
        classNames={{
          option: () =>
            `py-2 px-4 rounded-md cursor-pointer text-gray-05 hover:bg-primary-01 hover:text-neutral-01 dark:text-neutral-05 dark:hover:text-neutral-01 dark:hover:bg-primary-02 mt-4`,
          control: ({ isDisabled }) =>
            `bg-neutral-03  hover:bg-neutral-01 hover:cursor-pointer rounded-md py-4 px-6 dark:bg-secondary-03 dark:text-neutral-01 mt-2 border border-gray-03 ${
              isDisabled ? "opacity-30" : ""
            }`,
          menu: () => `p-8 bg-neutral-01 mt-2 rounded-md dark:bg-secondary-01 `,
          menuPortal: () => `bg-link-02`,
          multiValue: () =>
            `py-1 px-4 bg-gray-01 text-secondary-03 rounded-full ml-1 mt-1 dark:bg-secondary-01 dark:text-neutral-01`,
          multiValueRemove: () =>
            `rounded-full hover:text-secondary-01 dark:hover:text-primary-02 ml-1 `,
        }}
      />
    </label>
  );
};

export default SelectCities;
