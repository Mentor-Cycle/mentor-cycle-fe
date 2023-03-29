import { useState } from "react";

import Select from "react-select";
import { MultiSelectOptions, MultiSelectProps } from "./MultiSelect.types";

const options = [
  { value: "ui Design", label: "UI Design" },
  { value: "ux Design", label: "UX Design" },
  { value: "product Design", label: "Product Design" },
  { value: "graphic Design", label: "Graphic Design" },
  { value: "frontend", label: "FrontEnd" },
  { value: "backend", label: "Backend" },
];

const MultiSelect = ({ name, label }: MultiSelectProps) => {
  /*O estado está armazenando um array de strings para caso de problema ao enviar o onchange para o estado global
  do formulário.  
  */
  const [skills, setSkills] = useState<string[]>();

  function handleAddNewSkill(selectOptions: MultiSelectOptions) {
    const uniqueSkill = selectOptions.map((option) => option.value);
    setSkills(uniqueSkill);
  }
  return (
    <label className="text-secondary-01 font-semibold">
      {label}
      <Select
        isMulti
        name={name}
        onChange={(newValue) =>
          handleAddNewSkill(newValue as MultiSelectOptions)
        }
        options={options}
        className="w-[672px] font-normal "
        classNamePrefix="p-10"
        unstyled
        placeholder="Seleciona sua especialização"
        classNames={{
          option: (state) =>
            `py-2 px-4 rounded-md cursor-pointer text-gray-05 hover:bg-primary-01 hover:text-neutral-01 dark:text-neutral-05 dark:hover:text-neutral-01 dark:hover:bg-primary-02`,
          control: (state) =>
            `bg-neutral-01 rounded-md py-4 px-6 dark:bg-secondary-03 dark:text-neutral-01 border border-gray-03`,
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
