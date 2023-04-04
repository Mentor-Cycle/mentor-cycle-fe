import Select, { SingleValue } from "react-select";
import { useState, useEffect } from "react";
import { useFetch } from "@hooks/useFetch";
import { ActionType } from "Providers/form";
import { useMultiStepFormContext } from "@hooks/useForm";
import { State } from "@hooks/useFetch.types";
import { SelectStatesProps, StateOption } from "./SelectLocation.types";

const SelectStates = ({ name, label }: SelectStatesProps) => {
  const [states, setStates] = useState<Array<StateOption>>([]);
  const { dispatch, formData } = useMultiStepFormContext();
  const { getStates } = useFetch();

  useEffect(() => {
    getStates().then((res: State[]) => {
      const stateOptions: StateOption[] = res.map(({ nome, sigla }) => ({
        label: nome,
        value: sigla,
      }));

      setStates(stateOptions);
      dispatch({
        type: ActionType.UPDATE_GLOBAL,
        payload: { states: stateOptions },
      });
    });
  }, [dispatch, getStates]);

  const isDisabled = formData.country !== "Brasil";

  const renderStates = (): { options: Array<StateOption> } => {
    const listStates = states.map(({ value, label }) => ({ label, value }));
    return { options: listStates };
  };

  const handleInputChange = (newValue: SingleValue<StateOption>) => {
    const state = (newValue as StateOption).label;
    dispatch({
      type: ActionType.UPDATE_FORM_DATA,
      payload: { [name]: state },
    });
  };

  return (
    <label htmlFor={name} className="text-secondary-01 font-semibold w-full">
      {label}
      <Select
        name={name}
        isLoading={!states.length}
        defaultValue={{
          value: formData.state,
          label: formData.state,
        }}
        onChange={handleInputChange}
        options={renderStates().options}
        isMulti={false}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        className="font-normal"
        classNamePrefix="p-10"
        unstyled
        placeholder="Selecione o estado"
        isDisabled={isDisabled}
        classNames={{
          option: () =>
            `py-2 px-4 rounded-md cursor-pointer text-gray-05 hover:bg-primary-01 hover:text-neutral-01 dark:text-neutral-05 dark:hover:text-neutral-01 dark:hover:bg-primary-02`,
          control: ({ isDisabled }) =>
            `bg-neutral-03 mt-2 hover:bg-neutral-01 hover:cursor-pointer rounded-md py-4 px-6 dark:bg-secondary-03 dark:text-neutral-01 border border-gray-03 ${
              isDisabled ? "opacity-30" : ""
            }`,
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

export default SelectStates;
