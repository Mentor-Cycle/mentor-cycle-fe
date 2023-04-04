import Input from "@components/Input";
import SelectCities from "@components/LocationSelector/SelectCities";
import MultiSelect from "@components/MultiSelect";
import SelectCountry from "@components/LocationSelector/SelectCountry";
import SelectStates from "@components/LocationSelector/SelectStates";
import { useMultiStepFormContext } from "@hooks/useForm";
import { ActionType } from "Providers/form";
import { ChangeEvent, useState } from "react";
import { parse, isValid, isPast } from "date-fns";

const PersonalInformation = () => {
  const { dispatch, formData } = useMultiStepFormContext();
  const [date, setDate] = useState<string>(formData.birthDate || "");

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const isValidDate = validateDate(value);

    if (event.target.checkValidity() && isValidDate) {
      dispatch({
        type: ActionType.UPDATE_FORM_DATA,
        payload: { [name]: value },
      });
    }
  };

  const validateDate = (date: string) => {
    const parsedDate = parse(date, "dd/MM/yyyy", new Date());
    const isValidDate = isValid(parsedDate);
    const isDateInThePast = isPast(parsedDate);
    return isValidDate && isDateInThePast;
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
          value={date}
          onBlur={handleBlur}
          onChange={(e) => setDate((e.target as HTMLInputElement).value)}
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
