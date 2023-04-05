import Input from "@components/Input";
import SelectCities from "@components/LocationSelector/SelectCities";
import { useState } from "react";
import { FormDataTypes } from "./FormSteps.types";
import MultiSelect from "@components/MultiSelect";
import SelectCountry from "@components/LocationSelector/SelectCountry";
import SelectStates from "@components/LocationSelector/SelectStates";

const PersonalInformation = ({ formData }: FormDataTypes) => {
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
  const [selectedState, setSelectedState] = useState<string | undefined>();

  const handleSelectedState = (selectedState?: string) => {
    setSelectedState(selectedState);
  };

  const handleSelectedCountry = (selectedCountry?: string) => {
    setSelectedCountry(selectedCountry);
  };
  const { skills } = formData;

  return (
    <>
      <div className="sm:flex gap-4">
        <SelectCountry
          label="Pais"
          name="country"
          handleSelectedCountry={handleSelectedCountry}
        />
        <SelectStates
          handleSelectedState={handleSelectedState}
          selectedCountry={selectedCountry}
          name="state"
          label="Estado"
        />
      </div>
      <div className="sm:flex gap-4 justify-center items-center">
        <SelectCities
          selectedState={selectedState}
          selectedCountry={selectedCountry}
          label="Cidade"
          name="city"
        />
        <Input
          label="Aniversário"
          name="birthDate"
          type="date"
          placeholder="XX/XX/XXXX"
          required
        />
      </div>
      <MultiSelect label="Especialização" name="skills" />
    </>
  );
};

export default PersonalInformation;
