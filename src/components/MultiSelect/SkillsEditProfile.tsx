import Select from "react-select";
import { MultiSelectOptions, MultiSelectProps } from "./MultiSelect.types";
import { useTypedQuery } from "@hooks/useTypedQuery";
import { queriesIndex as api } from "services/apollo/queries/queries.index";

type SkillsEditProfileProps = MultiSelectProps & {
  uniqueSkill?: MultiSelectOptions[];
  onSelectedSkills: (skills: MultiSelectOptions[]) => void;
};

const SkillsEditProfile = ({
  label,
  uniqueSkill,
  onSelectedSkills,
}: SkillsEditProfileProps) => {
  const {
    loading: loadingSkills,
    data: skills,
    error,
  } = useTypedQuery(api.GET_SKILLS);
  if (error?.error) console.log("error", error);

  const options =
    skills?.findAllSkills.map(({ name }) => ({
      value: name,
      label: name,
    })) ?? [];

  return (
    <label htmlFor={"skills"} className="text-secondary-01 font-semibold">
      {label}
      <span title="Obrigatório" className="text-danger-01 mx-1">
        *
      </span>
      <Select
        name="skills"
        isLoading={loadingSkills}
        isMulti
        onChange={(newValue) =>
          onSelectedSkills(newValue as MultiSelectOptions[])
        }
        options={options}
        defaultValue={uniqueSkill}
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
