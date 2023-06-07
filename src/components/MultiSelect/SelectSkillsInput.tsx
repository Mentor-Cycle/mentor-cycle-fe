import { MultiSelectOptions, MultiSelectProps } from "./MultiSelect.types";
import { useQuery } from "@apollo/client";
import { Select } from "@components/Select";
import { Dispatch, SetStateAction } from "react";

type SelectSkillsInputProps = MultiSelectProps & {
  uniqueSkill?: MultiSelectOptions[];
  options: string[];
  state: [string[], Dispatch<SetStateAction<string[]>>];
};

const SelectSkillsInput = ({
  label,
  state,
  options,
}: SelectSkillsInputProps) => {
  return (
    <label htmlFor={"skills"} className="text-secondary-01 font-semibold">
      {label}
      <span title="Obrigatório" className="text-danger-01 mx-1">
        *
      </span>
      <Select options={options} state={state} />
    </label>
  );
};

export default SelectSkillsInput;
