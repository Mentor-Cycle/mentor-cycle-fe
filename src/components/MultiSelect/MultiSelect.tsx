import { useState } from "react";

import Select, { StylesConfig } from "react-select";
import { MultiSelectOptions } from "./MultiSelect.types";

const options = [
  { value: "ui Design", label: "UI Design" },
  { value: "ux Design", label: "UX Design" },
  { value: "product Design", label: "Product Design" },
  { value: "graphic Design", label: "Graphic Design" },
  { value: "frontend", label: "FrontEnd" },
  { value: "backend", label: "Backend" },
];

const stylesOptions: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#FEFEFE",
    padding: "4px 16px ",
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "#CECECE",
    padding: "4px 16px",
    borderRadius: "16px",
  }),
  input: (styles) => ({
    ...styles,
    margin: "0",
  }),
  menu: (styles) => ({ ...styles, padding: "32px" }),
  multiValueLabel: (styles) => ({
    ...styles,
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    borderRadius: "100%",
    transitionDuration: "0.3s",
    ":hover": {
      backgroundColor: "#FEFEFE",
    },
  }),

  option: (styles, { isFocused }) => {
    return {
      ...styles,
      fontFamily: ["Poppins", "sans-serif"],
      backgroundColor: isFocused ? "#F36B6B" : undefined,
      color: isFocused ? "#FEFEFE" : undefined,
      transitionDuration: "0.7ms",
      cursor: "pointer",
      borderRadius: "12px",
    };
  },
};

const MultiSelect = () => {
  /*O estado está armazenando um array de strings para caso de problema ao enviar o onchange para o estado global
  do formulário.  
  */
  const [skills, setSkills] = useState<string[]>();

  function handleAddNewSkill(selectOptions: MultiSelectOptions) {
    const uniqueSkill = selectOptions.map((option) => option.value);
    setSkills(uniqueSkill);
  }
  return (
    <Select
      isMulti
      name="skills"
      onChange={(newValue) => handleAddNewSkill(newValue as MultiSelectOptions)}
      options={options}
      className="w-[672px]"
      classNamePrefix="p-10"
      styles={stylesOptions}
    />
  );
};

export default MultiSelect;
