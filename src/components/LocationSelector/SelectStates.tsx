import { useFetch } from "@hooks/useFetch";
import { useState, useEffect } from "react";
import Select from "react-select";
import { SelectStatesProps, StateOption } from "./SelectLocation.types";
import { State } from "@hooks/useFetch.types";

const SelectStates = ({
  name,
  label,
  selectedCountry,
  handleSelectedState,
}: SelectStatesProps) => {
  const [states, setStates] = useState<Array<StateOption>>([]);
  const { getStates } = useFetch();

  useEffect(() => {
    getStates().then((res: State[]) => {
      const stateOptions: StateOption[] = res.map(({ nome, sigla }) => ({
        label: nome,
        value: sigla,
      }));
      setStates(stateOptions);
    });
  }, [getStates]);

  const isDisabled = selectedCountry !== "Brasil";

  const renderStates = (): { options: Array<StateOption> } => {
    const listStates = states.map(({ value, label }) => ({ label, value }));
    return { options: listStates };
  };

  const handleChange = (selectedOption: StateOption | null) => {
    if (selectedOption) {
      handleSelectedState(selectedOption.value);
    }
  };

  return (
    <label htmlFor={name} className="text-secondary-01 font-semibold w-full">
      {label}
      <Select
        name={name}
        isLoading={!states.length}
        onChange={handleChange}
        options={renderStates().options}
        isMulti={false}
        className="font-normal"
        classNamePrefix="p-10"
        unstyled
        placeholder="Selecione o estado"
        isDisabled={isDisabled}
        classNames={{
          option: (state) =>
            `py-2 px-4 rounded-md cursor-pointer text-gray-05 hover:bg-primary-01 hover:text-neutral-01 dark:text-neutral-05 dark:hover:text-neutral-01 dark:hover:bg-primary-02`,
          control: (state) =>
            `bg-neutral-03 hover:bg-neutral-01 hover:cursor-pointer rounded-md py-4 px-6 dark:bg-secondary-03 dark:text-neutral-01 border border-gray-03 ${
              state.isDisabled ? "opacity-30" : ""
            }`,
          menu: (state) =>
            `p-8 bg-neutral-01 mt-2 rounded-md dark:bg-secondary-01`,
          multiValue: (state) =>
            `py-1 px-4 bg-gray-01 text-secondary-03 rounded-full ml-1 mt-1 dark:bg-secondary-01 dark:text-neutral-01`,
          multiValueRemove: (state) =>
            `rounded-full hover:text-secondary-01 dark:hover:text-primary-02 ml-1 `,
        }}
      />
    </label>
  );
};

export default SelectStates;
