import React, { ChangeEvent, useEffect, useState } from "react";
import { parse, isValid, isPast } from "date-fns";
import { SingleValue } from "react-select";
import Input from "@components/Input";
import MultiSelect from "@components/MultiSelect";
import SelectLocation from "@components/LocationSelector/SelectLocation";
import useForm from "@hooks/useForm";
import { ActionType } from "Providers/form";
import { useFetch } from "@hooks/useFetch";
import { Country, State, City } from "@hooks/useFetch.types";

const PersonalInformation = () => {
  const { formData, dispatch } = useForm();
  const [date, setDate] = useState<string>(formData.birthDate || "");
  const { getCountries, getStates, getCities } = useFetch();
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const fetchedCountries = await getCountries();
      setCountries(fetchedCountries);
    };

    const fetchStates = async () => {
      if (formData.country === "Brasil") {
        const fetchedStates = await getStates();
        setStates(fetchedStates);
      }
    };

    const fetchCities = async () => {
      if (formData.country === "Brasil" && formData.state) {
        const fetchedCities = await getCities(formData.state);
        setCities(fetchedCities);
      }
    };
    fetchCountries();
    fetchStates();
    fetchCities();
  }, [formData.country, formData.state, getCountries, getStates, getCities]);

  const handleLocationChange = (
    name: string,
    newValue: SingleValue<{ label: string; value: string }>
  ) => {
    dispatch({
      type: ActionType.UPDATE_FORM_DATA,
      payload: {
        ...formData,
        [name]: newValue?.label,
      },
    });
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const isValidDate = validateDate(value);

    if (isValidDate) {
      dispatch({
        type: ActionType.UPDATE_FORM_DATA,
        payload: {
          ...formData,
          birthDate: value,
        },
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
        <SelectLocation
          onSelect={(
            newValue: SingleValue<{
              label: string;
              value: string;
            }>
          ) => handleLocationChange("country", newValue)}
          label="Pais"
          requiredField={true}
          name="country"
          options={countries}
          placeholder="Selecione um Pais"
          value={{ label: formData.country, value: formData.country }}
        />
        <SelectLocation
          onSelect={(
            newValue: SingleValue<{
              label: string;
              value: string;
            }>
          ) => handleLocationChange("state", newValue)}
          label="Estado"
          name="state"
          isDisabled={formData.country !== "Brasil"}
          options={states}
          placeholder="Selecione um estado"
          value={
            formData.country === "Brasil"
              ? { label: formData.state, value: formData.state }
              : undefined
          }
        />
      </div>
      <div className="sm:flex gap-4 justify-center items-start">
        <SelectLocation
          onSelect={(
            newValue: SingleValue<{
              label: string;
              value: string;
            }>
          ) => handleLocationChange("city", newValue)}
          label="Cidade"
          name="city"
          options={cities}
          isDisabled={formData.country !== "Brasil"}
          placeholder="Selecione uma cidade"
          value={
            formData.country === "Brasil"
              ? { label: formData.city, value: formData.city }
              : undefined
          }
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
          required
          pattern="\d{2}/\d{2}/\d{4}"
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
