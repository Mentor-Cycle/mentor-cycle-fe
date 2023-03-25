import Input from "@components/Input";
import SelectCities from "@components/LocationSelector/SelectCities";
import SelectCountry from "@components/LocationSelector/SelectCountry";
import SelectState from "@components/LocationSelector/SelectState";
import { useState } from "react";
import { FormDataTypes } from "./FormSteps.types";

const PersonalInformation = ({ formData }: FormDataTypes) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const handleSelectedState = (selectedState: string) => {
    setSelectedState(selectedState);
  };
  const handleSelectedCountry = (selectedCountry: string) => {
    setSelectedCountry(selectedCountry);
  };
  const { skills } = formData;

  return (
    <>
      <div className="sm:flex gap-4">
        <SelectCountry handleSelectedCountry={handleSelectedCountry} />
        <SelectState
          handleSelectedState={handleSelectedState}
          selectedCountry={selectedCountry}
        />
      </div>
      <div className="sm:flex gap-4">
        <SelectCities
          selectedState={selectedState}
          selectedCountry={selectedCountry}
        />
        <Input
          label="Aniversário"
          name="birthDate"
          type="date"
          placeholder="XX/XX/XXXX"
          required
        />
      </div>
      <Input
        required
        label="Especialização"
        name="skills"
        placeholder="design"
        defaultValue={skills}
      />
    </>
  );
};

export default PersonalInformation;
