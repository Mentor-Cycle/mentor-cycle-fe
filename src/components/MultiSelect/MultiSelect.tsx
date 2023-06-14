import Select from "react-select";
import useForm from "@hooks/useForm";
import { MultiSelectOptions, MultiSelectProps } from "./MultiSelect.types";
import { ActionType } from "providers/form";
import useLocalStorage from "@hooks/useLocalStorage";
import { queriesIndex as api } from "services/apollo/queries/queries.index";
import { useTypedQuery } from "@hooks/useTypedQuery";

const MultiSelect = ({ name, label }: MultiSelectProps) => {
  const { dispatch, formData } = useForm();
  const [formStorage, setFormStorage] = useLocalStorage("form-data", formData);

  const {
    loading: loadingSkills,
    data: skills,
    error: errorSkills,
  } = useTypedQuery(api.GET_SKILLS);
  if (errorSkills?.error) console.log("errorSkills", errorSkills);

  function handleAddNewSkill(selectOptions: MultiSelectOptions[]) {
    const uniqueSkill = selectOptions.map((option) => option.value);
    const updatedFormData = { ...formData, [name]: uniqueSkill };

    dispatch({
      type: ActionType.UPDATE_FORM_DATA,
      payload: updatedFormData,
    });

    setFormStorage({
      ...formStorage,
      ...updatedFormData,
    });
  }

  const defaultValue = formData?.skills.map((skill) => ({
    label: skill,
    value: skill,
  }));

  const options = skills?.findAllSkills?.map(({ name }: { name: string }) => ({
    value: name,
    label: name,
  }));

  return (
    <label htmlFor={name} className="text-secondary-01 font-semibold">
      {label}
      <span title="Obrigatório" className="text-danger-01 mx-1">
        *
      </span>
      <Select
        isLoading={loadingSkills}
        required
        isMulti
        name={name}
        defaultValue={defaultValue}
        onChange={(newValue) =>
          handleAddNewSkill(newValue as MultiSelectOptions[])
        }
        options={options}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        className="font-normal"
        classNamePrefix="p-10"
        unstyled
        placeholder="Seleciona sua especialização"
        classNames={{
          option: (state) =>
            `py-2 px-4 rounded-md cursor-pointer text-gray-05 hover:bg-primary-01 hover:text-neutral-01 dark:text-neutral-05 dark:hover:text-neutral-01 dark:hover:bg-primary-02`,
          control: (state) =>
            `bg-neutral-03 hover:bg-neutral-01 hover:cursor-pointer rounded-md py-4 px-6 dark:bg-secondary-03 dark:text-neutral-01 border border-gray-03 mt-2`,
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

export default MultiSelect;
