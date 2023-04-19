import React from "react";
import { useQuery } from "@apollo/client";
import Select from "react-select";
import { GET_SKILLS } from "services/apollo/querys";

export interface SelectSkillsProps {
  placeholder: string;
  setSelectedSkills: (value: string | null) => void;
}

const SelectSkills: React.FC<SelectSkillsProps> = ({
  placeholder,
  setSelectedSkills,
}) => {
  const { data, loading, error } = useQuery(GET_SKILLS);
  const options = [
    { value: null, label: "Todas" },
    ...(data?.findAllSkills.map(({ name }: { name: string }) => ({
      value: name,
      label: name,
    })) || []),
  ];

  return (
    <Select
      placeholder={error ? "Especialidade" : placeholder}
      isLoading={loading}
      onChange={(selected) => setSelectedSkills(selected.value)}
      options={options}
      unstyled
      classNames={{
        option: (state) =>
          `py-2 px-2 rounded-md cursor-pointer text-gray-05 hover:bg-primary-01 hover:text-neutral-01 dark:text-neutral-05 dark:hover:text-neutral-01 dark:hover:bg-primary-02`,
        control: (state) =>
          `bg-neutral-03 hover:bg-neutral-01 hover:cursor-pointer rounded-md py-4 px-6 dark:bg-secondary-03 dark:text-neutral-01 border border-gray-03 mt-2 mb-2 sm:min-w-[180px]`,
        menu: (state) =>
          `p-4 bg-neutral-01 mt-2 rounded-md border border-gray-03 dark:bg-secondary-01`,
        multiValue: (state) =>
          `py-1 px-4 bg-gray-01 text-secondary-03 rounded-full ml-1 mt-1 dark:bg-secondary-01 dark:text-neutral-01`,
        multiValueRemove: (state) =>
          `rounded-full hover:text-secondary-01 dark:hover:text-primary-02 ml-1 `,
      }}
    />
  );
};

export default SelectSkills;
