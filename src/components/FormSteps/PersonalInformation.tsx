import Input from "@components/Input";
import SelectCities from "@components/LocationSelector/SelectCities";
import MultiSelect from "@components/MultiSelect";
import SelectCountry from "@components/LocationSelector/SelectCountry";
import SelectStates from "@components/LocationSelector/SelectStates";
import { useMultiStepFormContext } from "@hooks/useForm";
import { ActionType } from "Providers/form";
import { ChangeEvent } from "react";
import { parse, isValid, isPast } from "date-fns";

const PersonalInformation = () => {
  const { dispatch, formData } = useMultiStepFormContext();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const input = event.target;

    const date = parse(value, "dd/MM/yyyy", new Date());
    const isValidDate = isValid(date);
    const isDateInThePast = isPast(date);

    if (input.checkValidity() && isValidDate && isDateInThePast) {
      dispatch({
        type: ActionType.UPDATE_FORM_DATA,
        payload: { [name]: date },
      });
    }
  };

  return (
    <>
      <div className="sm:flex gap-4">
        <SelectCountry label="Pais" name="country" />
        <SelectStates name="state" label="Estado" />
      </div>
      <div className="sm:flex gap-4 justify-center items-start">
        <SelectCities label="Cidade" name="city" />
        <Input
          label="Aniversário"
          name="birthDate"
          type="text"
          // defaultValue={formData.birthDate}
          onChange={handleInputChange}
          placeholder="DD/MM/AAAA"
          maxLength={10}
          pattern="\d{2}/\d{2}/\d{4}"
          required
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        />
      </div>
      <MultiSelect label="Especialização" name="skills" />
    </>
  );
};

export default PersonalInformation;
