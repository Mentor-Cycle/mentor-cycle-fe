import Input from "@components/Input";
import { FormDataTypes } from "./FormSteps.types";

const PersonalInformation = ({ formData }: FormDataTypes) => {
  const { state, country, birthday, skills, city } = formData;

  return (
    <>
      <div className="flex gap-4">
        <Input
          label="Estado"
          name="state"
          placeholder="Estado - XX"
          defaultValue={state}
        />
        <Input
          label="Cidade"
          name="city"
          placeholder="Cidade do Brasil"
          defaultValue={city}
        />
      </div>
      <div className="flex gap-4">
        <Input
          label="País"
          name="country"
          placeholder="Brasil"
          defaultValue={country}
        />
        <Input
          label="Aniversário"
          name="birthday"
          placeholder="XX/XX/XXXX"
          defaultValue={birthday}
        />
      </div>
      <Input
        label="Especialização"
        name="skills"
        placeholder="design"
        defaultValue={skills}
      />
    </>
  );
};

export default PersonalInformation;
