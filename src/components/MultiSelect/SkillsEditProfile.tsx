import Select from "react-select";
import { MultiSelectOptions, MultiSelectProps } from "./MultiSelect.types";
import { useQuery } from "@apollo/client";
import { GET_SKILLS } from "services/apollo/queries";
import { useUser } from "@hooks/useUser";

type SkillsEditProfileProps = MultiSelectProps & {
  uniqueSkill: MultiSelectOptions;
  onSelectedSkills: (skills: MultiSelectOptions) => void;
};

const SkillsEditProfile = ({
  label,
  onSelectedSkills,
}: SkillsEditProfileProps) => {
  const { loading, data } = useQuery(GET_SKILLS);
  const { user } = useUser();

  const options = data?.findAllSkills?.map(({ name }: { name: string }) => ({
    value: name,
    label: name,
  }));

  const defaultValue = user?.skills.map((skill: string) => ({
    label: skill,
    value: skill,
  }));

  return (
    <label htmlFor={"skills"} className="text-secondary-01 font-semibold">
      {label}
      <span title="Obrigatório" className="text-danger-01 mx-1">
        *
      </span>
      <Select
        name="skills"
        isLoading={loading}
        isMulti
        onChange={(newValue) =>
          onSelectedSkills(newValue as MultiSelectOptions)
        }
        options={options}
        defaultValue={defaultValue}
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

export default SkillsEditProfile;
