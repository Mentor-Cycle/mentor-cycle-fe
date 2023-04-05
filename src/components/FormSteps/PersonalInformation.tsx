import Input from "@components/Input";
import MultiSelect from "@components/MultiSelect";
import SelectLocation from "@components/LocationSelector/SelectLocation";
import { ChangeEvent, useEffect, useState } from "react";
import { parse, isValid, isPast } from "date-fns";
import useForme from "@hooks/useForm";
import { SingleValue } from "react-select";
import { ActionType } from "Providers/form";
import { useMultiStepFormContext } from "@hooks/useMultiStepForm";
import { useFetch } from "@hooks/useFetch";

const PersonalInformation = () => {
  const { formData, updateForm } = useForme();
  const { getCountries, getStates, getCities } = useFetch();
  const { dispatch } = useMultiStepFormContext();
  const [date, setDate] = useState<string>(formData.birthDate || "");
  const [countries, setCountries] = useState<any>([]);
  const [states, setStates] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);

  useEffect(() => {
    getCountries().then((fetchedCountries) => {
      const listCountries = fetchedCountries.map(({ nome }) => ({
        label: nome,
        value: nome,
      }));
      setCountries(listCountries);
    });
  }, [getCountries]);

  useEffect(() => {
    getStates().then((fetchedStates) => {
      const listStates = fetchedStates.map(({ nome, sigla }) => ({
        label: nome,
        value: nome,
        sigla,
      }));
      setStates(listStates);
    });
  }, [getStates]);

  useEffect(() => {
    if (formData.state) {
      const stateValue = states.find(
        (state: any) => state.value === formData.state
      );
      if (stateValue) {
        getCities(stateValue.sigla).then((fetchedCities) => {
          const listCities = fetchedCities.map(({ nome }) => ({
            label: nome,
            value: nome,
          }));
          setCities(listCities);
        });
      }
    }
  }, [formData.state, getCities, states]);

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const isValidDate = validateDate(value);

    if (isValidDate) {
      updateForm(event);
    }
  };

  const onLocationSelected = (
    name: string,
    newValue: SingleValue<{
      label: string;
      value: string;
    }>
  ) => {
    dispatch({
      type: ActionType.UPDATE_FORM_DATA,
      payload: {
        ...formData,
        [name]: newValue?.value,
      },
    });
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
        <SelectLocation
          onSelect={(
            newValue: SingleValue<{
              label: string;
              value: string;
            }>
          ) => onLocationSelected("country", newValue)}
          label="Pais"
          name="country"
          options={countries}
          placeholder="Selecione um Pais"
          defaultValue={{ label: "Brasil", value: "BR" }}
        />
        <SelectLocation
          onSelect={(
            newValue: SingleValue<{
              label: string;
              value: string;
            }>
          ) => onLocationSelected("state", newValue)}
          label="Estado"
          name="state"
          options={states}
          placeholder="Selecione um estado"
          defaultValue={{ label: formData.state, value: formData.state }}
        />
      </div>
      <div className="sm:flex gap-4 justify-center items-start">
        <SelectLocation
          onSelect={(
            newValue: SingleValue<{
              label: string;
              value: string;
            }>
          ) => onLocationSelected("city", newValue)}
          label="Estado"
          name="city"
          options={cities}
          placeholder="Selecione uma cidade"
          defaultValue={{ label: formData.city, value: formData.city }}
        />
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
